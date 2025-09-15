const apiKey = import.meta.env.VITE_NEWS_API_KEY;

const baseUrl =
  import.meta.env.MODE === "production"
    ? "https://nomoreparties.co/news/v2/everything"
    : "https://newsapi.org/v2/everything";

export function fetchNewsArticles(query) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const from = sevenDaysAgo.toISOString().split("T")[0];
  const to = new Date().toISOString().split("T")[0];

  return fetch(
    `${baseUrl}?q=${encodeURIComponent(
      query
    )}&from=${from}&to=${to}&pageSize=100&apiKey=${apiKey}`
  ).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch news");
    return res.json();
  });
}
