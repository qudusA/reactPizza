const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  //   fetch will not throw error on 400 i.e "when url is wrong we" this needs to be taken care of.
  if (!res.ok) throw new Error("failed getting menu");

  const { data } = await res.json();
  return data;
}

export async function getOrderById(id) {
  const res = await fetch(`${API_URL}/order/${id}`);
  if (!res.ok) throw new Error(`failed to fecth order with id ${id}`);
  const { data } = await res.json();
  return data;
}

export async function createOrder(orderBody) {
  const res = await fetch(`${API_URL}/order`, {
    method: "POST",
    body: JSON.stringify(orderBody),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) throw new Error("failed to palce order");
  const { data } = await res.json();
  return data;
}

// todo delete this data

// L4HSPV, 6VUHBR
