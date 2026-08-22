import { useState, useEffect } from "react";
import KpiCards from "../components/KpiCards.jsx";
import Charts from "../components/Charts.jsx";
import { fetchAnalytics } from "../api.js";

function Dashboard() {
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAnalytics()
      .then(setAnalytics)
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <div className="hero container">
        <h1>INVENTORY</h1>
        <p>
          A fast, searchable view into 50,000 products. Track stock levels, spot restock
          priorities, and keep the warehouse moving without the spreadsheet slowdown.
        </p>
      </div>

      <div className="container">
        <KpiCards analytics={analytics} />
        <Charts analytics={analytics} />
      </div>
    </div>
  );
}

export default Dashboard;