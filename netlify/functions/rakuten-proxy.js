exports.handler = async (event) => {
  const params = new URLSearchParams(event.queryStringParameters).toString();
  const url = "https://openapi.rakuten.co.jp/engine/api/Travel/VacantHotelSearch/20170426?" + params;

  const res = await fetch(url, {
    headers: {
      "Referer": "https://comforting-brioche-a3259e.netlify.app/",
      "Origin": "https://comforting-brioche-a3259e.netlify.app",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    }
  });

  const text = await res.text();

  return {
    statusCode: res.status,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: text
  };
};
