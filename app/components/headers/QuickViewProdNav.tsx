import { Link } from "@remix-run/react";

export default function QuickViewProdNav() {
  return (
    <nav className="bg-slate-500 py-2 px-2 rounded-lg">
      <div className="flex justify-evenly items-center">
        <div className="py-1">
          <Link to="/">Origin</Link>
        </div>
        <div className="py-1">
          <Link to="/products">Worker</Link>
        </div>
      </div>
    </nav>
  );
}
