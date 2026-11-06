const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const addMedicines = async (data) => {

  try {
    const res = await fetch(`${baseURL}/api/medicines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Server Retuned Status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.Error("error: ", error);
  }
};

export const addToCartPost = async (data) => {

  try {
    const res = await fetch(`${baseURL}/api/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Server Retuned Status ${res.status}`);
    }
    return await res.json();
  } catch (error) {
    console.error("error: ", error);
  }
};
