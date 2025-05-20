export const apiRequest = async (endpoint, data = null, headers = {}) => {
  const token = localStorage.getItem("token");
console.log(token, "from api");

  const options = {
    method: endpoint.method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (data && endpoint.method !== "GET") {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(endpoint.url, options);

    const contentType = response.headers.get("content-type");

    // If response is not JSON, get text (maybe an HTML error page)
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response;
      throw new Error(`Server returned non-JSON response: ${text}`);
    }

    const json = await response.json();

    if (!response.ok) {
      throw new Error(json.message || "Request failed");
    }

    return json;
  } catch (err) {
    console.error("API Request Error:", err);
    throw err;
  }
};
