function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value || 0);
}

function KpiCards({ analytics }) {
  if (!analytics) return null;

  return (
    <div className="kpi-grid">
      <div className="kpi-card">
        <div className="label">Total SKUs</div>
        <div className="value">{analytics.totalSKUs.toLocaleString()}</div>
      </div>
      <div className="kpi-card">
        <div className="label">Total Inventory Value</div>
        <div className="value">{formatMoney(analytics.totalValue)}</div>
      </div>
      <div className="kpi-card">
        <div className="label">Out of Stock</div>
        <div className="value">{analytics.outOfStock.toLocaleString()}</div>
      </div>
      <div className="kpi-card">
        <div className="label">Categories</div>
        <div className="value">{analytics.categoryBreakdown.length}</div>
      </div>
    </div>
  );
}

export default KpiCards;
