import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, budgetContext } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context-aware system prompt
    let systemPrompt = `You are BudgetBot, a friendly and knowledgeable financial assistant for a personal budget tracking app. Your expertise includes:

1. **Budget Advice**: Help users create, manage, and optimize their budgets
2. **Spending Analysis**: Provide insights on spending patterns and suggest improvements
3. **Savings Tips**: Share practical money-saving strategies
4. **Financial Literacy**: Explain financial concepts in simple terms
5. **Goal Setting**: Help users set and achieve financial goals

Guidelines:
- Be concise but helpful (aim for 2-3 paragraphs max unless asked for detail)
- Use encouraging, positive language
- Provide actionable advice when possible
- If discussing specific numbers, use USD formatting
- If the user shares their budget data, reference it in your advice
- Use emojis sparingly to keep responses friendly 💰`;

    // Add user's budget context if provided
    if (budgetContext) {
      systemPrompt += `\n\n**User's Current Financial Snapshot:**
- Total Budgeted: $${budgetContext.totalBudgeted?.toFixed(2) || '0.00'}
- Total Spent: $${budgetContext.totalSpent?.toFixed(2) || '0.00'}
- Remaining: $${budgetContext.remaining?.toFixed(2) || '0.00'}
- Number of Budgets: ${budgetContext.budgetCount || 0}
- Number of Expenses: ${budgetContext.expenseCount || 0}
${budgetContext.budgets?.length ? `\nBudget Categories: ${budgetContext.budgets.map((b: { name: string; amount: number; spent: number }) => `${b.name} ($${b.amount} budgeted, $${b.spent} spent)`).join(', ')}` : ''}

Use this information to provide personalized advice when relevant.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
