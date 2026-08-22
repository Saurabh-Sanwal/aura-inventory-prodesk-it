import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar container">
      <div className="logo">Aura</div>
      <div className="links">
        <Link to="/">Dashboard</Link>
        <Link to="/inventory">Inventory</Link>
      </div>
    </div>
  );
}

export default Navbar;