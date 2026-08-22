const API_URL = "https://aura-inventory-prodesk-it.onrender.com";

export async function fetchInventory({ page, limit, search, category, sort }) {
  const params = new URLSearchParams({
    page,
    limit,
    search: search || "",
    category: category || "",
    sort: sort || "-lastUpdated",
  });

  const res = await fetch(`${API_URL}/api/inventory?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch inventory");
  return res.json();
}

export async function fetchAnalytics() {
  const res = await fetch(`${API_URL}/api/analytics`);
  if (!res.ok) throw new Error("Failed to fetch analytics");
  return res.json();
}