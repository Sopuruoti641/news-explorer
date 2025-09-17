// const apiKey = "28d60a76841b40e39864ccfa7129de78";

// const baseUrl =
//   import.meta.env.MODE === "production"
//     ? "https://nomoreparties.co/news/v2/everything"
//     : "https://newsapi.org/v2/everything";

// export function fetchNewsArticles(query) {
//   const sevenDaysAgo = new Date();
//   sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

//   const from = sevenDaysAgo.toISOString().split("T")[0];
//   const to = new Date().toISOString().split("T")[0];

//   return fetch(
//     `${baseUrl}?q=${encodeURIComponent(
//       query
//     )}&from=${from}&to=${to}&pageSize=100&apiKey=${apiKey}`
//   ).then((res) => {
//     if (!res.ok) throw new Error("Failed to fetch news");
//     return res.json();
//   });
// }

const apiKey = "28d60a76841b40e39864ccfa7129de78";
const baseUrl = "https://nomoreparties.co/news/v2/everything";

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
