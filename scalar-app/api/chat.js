export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).end();

  const { system, message } = req.body;

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-70b-8192",
        messages: [
          { role: "system", content: system },
          { role: "user", content: message },
        ],
        max_tokens: 4000,
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message });
    }

    res.status(200).json({ text: data.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: "Internal server error: " + err.message });
  }
}
