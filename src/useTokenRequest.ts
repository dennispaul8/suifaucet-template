 const BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const requestTokens = async (walletAddress: string) => {
  try {

    if (!BASE_URL) {
      throw new Error("API base URL not set in environment variables");
    }
console.log(BASE_URL)
    const response = await fetch(`${BASE_URL}/request-tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ walletAddress }),
    });

    const contentType = response.headers.get("Content-Type");

    let data;
    if (contentType?.includes("application/json")) {
      data = await response.json();
    } else {
      throw new Error("Invalid JSON response from server");
    }

    if (!response.ok) {
      throw { response: data };
    }

    return data;
  } catch (error) {
    console.error("Token request error:", error);
    throw error;
  }
};
