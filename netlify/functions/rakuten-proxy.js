exports.handler = async (event) => {
  const params = new URLSearchParams(event.queryStringParameters).toString();
  const url = "https://openapi.rakuten.co.jp/engine/api/Travel/VacantHotelSearch/20170426?" + params;

  const res = await fetch(url, {
    headers: {
      "Referer": "https://comforting-brioche-a3259e.netlify.app",
      "User-Agent": "Mozilla/5.0"
    }
  });

  const data = await res.json();

  return {
    statusCode: 200,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify(data)
  };
};
