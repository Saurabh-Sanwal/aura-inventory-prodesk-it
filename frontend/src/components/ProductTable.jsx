function exportToCSV(products) {
  if (!products.length) return;

  const headers = ["Product Name", "SKU", "Category", "Price", "Stock"];
  const rows = products.map((p) => [p.productName, p.sku, p.category, p.price, p.stockQuantity]);

  const csvContent = [headers, ...rows]
    .map((row) => row.map((val) => `"${val}"`).join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "inventory_export.csv";
  link.click();
  URL.revokeObjectURL(url);
}

function ProductTable({
  products,
  loading,
  search,
  setSearch,
  category,
  setCategory,
  categories,
  sort,
  setSort,
  page,
  totalPages,
  setPage,
}) {
  function toggleSort(field) {
    if (sort === field) {
      setSort(`-${field}`);
    } else if (sort === `-${field}`) {
      setSort(field);
    } else {
      setSort(field);
    }
  }

  return (
    <div id="inventory">
      <div className="controls">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <button onClick={() => exportToCSV(products)}>Export CSV</button>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th onClick={() => toggleSort("price")}>Price</th>
              <th onClick={() => toggleSort("stockQuantity")}>Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className={p.stockQuantity === 0 ? "out-of-stock" : ""}>
                <td>{p.productName}</td>
                <td>{p.sku}</td>
                <td>{p.category}</td>
                <td>${p.price.toFixed(2)}</td>
                <td>{p.stockQuantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && <div className="status-text">Loading...</div>}
      {!loading && products.length === 0 && (
        <div className="status-text">No products found.</div>
      )}

      <div className="pagination">
        <button disabled={page <= 1} onClick={() => setPage(page - 1)}>
          Previous
        </button>
        <span>
          Page {page} of {totalPages || 1}
        </span>
        <button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ProductTable;
