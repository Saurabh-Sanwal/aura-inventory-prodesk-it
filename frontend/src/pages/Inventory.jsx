import { useState, useEffect } from "react";
import ProductTable from "../components/ProductTable.jsx";
import { fetchInventory } from "../api.js";

const CATEGORIES = ["Electronics", "Apparel", "Home & Kitchen", "Furniture", "Sports & Fitness", "Toys", "Groceries"];

function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("-lastUpdated");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    setPage(1);
  }, [category, sort]);

  useEffect(() => {
    setLoading(true);
    fetchInventory({ page, limit: 50, search: debouncedSearch, category, sort })
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [page, debouncedSearch, category, sort]);

  return (
    <div className="container">
      <div className="hero" style={{ padding: "40px 0 10px" }}>
        <h1 style={{ fontSize: "36px" }}>PRODUCTS</h1>
      </div>

      <ProductTable
        products={products}
        loading={loading}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        categories={CATEGORIES}
        sort={sort}
        setSort={setSort}
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}

export default Inventory;