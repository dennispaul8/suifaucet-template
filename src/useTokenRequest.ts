export const requestTokens = async (walletAddress: string) => {
  try {
    const response = await fetch('/api/request-tokens', {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ walletAddress }),
});

    const data = await response.json();

  if (!response.ok) {
      throw { response: data };
    }


    return data;
  } catch (error) {
    console.error('Token request error:', error);
    throw error;
  }
};
