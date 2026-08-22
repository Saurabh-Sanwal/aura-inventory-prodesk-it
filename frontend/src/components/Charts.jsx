function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function Charts({ analytics }) {
  if (!analytics) return null;

  const maxLowStock = Math.max(...analytics.lowStock.map((p) => p.stockQuantity), 1);
  const totalCategoryValue = analytics.categoryBreakdown.reduce((sum, c) => sum + c.totalValue, 0) || 1;

  return (
    <div className="charts-grid">
      <div className="chart-box">
        <h3>Restock priority (lowest stock)</h3>
        {analytics.lowStock.map((p) => (
          <div className="bar-row" key={p._id}>
            <span className="bar-label">{p.productName}</span>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{ width: `${(p.stockQuantity / maxLowStock) * 100}%` }}
              ></div>
            </div>
            <span className="bar-value">{p.stockQuantity}</span>
          </div>
        ))}
      </div>

      <div className="chart-box">
        <h3>Inventory value by category</h3>
        {analytics.categoryBreakdown.map((c) => (
          <div className="category-row" key={c.category}>
            <span>{c.category}</span>
            <span className="cat-value">
              {formatMoney(c.totalValue)} ({Math.round((c.totalValue / totalCategoryValue) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Charts;
