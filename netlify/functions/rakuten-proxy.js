exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin":  "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: ""
    };
  }
  try {
    const qs = event.queryStringParameters || {};
    const required = ["applicationId","accessKey","checkinDate","checkoutDate","hotelNo"];
    for (const k of required) {
      if (!qs[k]) return {
        statusCode: 400,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ error: "missing_param", message: k + " is required" })
      };
    }
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(qs)) {
      if (k !== "callback") params.set(k, v);
    }
    params.set("format", "json");
    params.set("formatVersion", "2");
    const apiUrl = "https://openapi.rakuten.co.jp/engine/api/Travel/VacantHotelSearch/20170426?" + params.toString();
    const resp = await fetch(apiUrl, {
      method: "GET",
      headers: {
      "Referer": "https://comforting-brioche-a3259e.netlify.app/",
      "Origin": "https://comforting-brioche-a3259e.netlify.app",
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    }
  })
    const text = await resp.text();
    return {
      statusCode: resp.status,
      headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
      body: text
    };
  } catch (err) {
    return {
      statusCode: 500,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ error: "proxy_error", message: err.message })
    };
  }
};
