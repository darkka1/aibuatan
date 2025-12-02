export async function callDeepSeek(prompt) {
  const apiKey = localStorage.getItem("sk-fd59d6b9c3954e9494cbcfb4e8a88806");
  if (!apiKey) throw new Error("API Key belum disimpan.");

  const request = {
    model: "deepseek-standard-1",
    input: prompt,
    max_tokens: 300,
  };

  const res = await fetch("https://api.deepseek.example/v1/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(request),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(err);
  }

  return await res.json();
}