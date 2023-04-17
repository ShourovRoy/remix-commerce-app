import { NavLink } from "@remix-run/react";

export default function DefaultHeader() {
  return (
    <div>
      <header className="py-4 bg-yellow-50 shadow-sm">
        <div className="container flex justify-between space-x-2 items-center">
          {/* left side */}
          <NavLink prefetch="render" to="/">
            <img src="/assets/svgs/remix.svg" alt="Discover Remix" />
          </NavLink>
          {/* right side */}
          <ul className="flex space-x-4">
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pendingNavLinkBtn"
                  : isActive
                  ? "activeNavLinkBtn"
                  : "navLinkBtn"
              }
              to="/"
              rel="prefetch"
              prefetch="render"
            >
              Home
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pendingNavLinkBtn"
                  : isActive
                  ? "activeNavLinkBtn"
                  : "navLinkBtn"
              }
              to="/about"
              rel="prefetch"
              prefetch="render"
            >
              About
            </NavLink>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending
                  ? "pendingNavLinkBtn"
                  : isActive
                  ? "activeNavLinkBtn"
                  : "navLinkBtn"
              }
              to="/products"
              rel="prefetch"
              prefetch="render"
            >
              Products
            </NavLink>
          </ul>
        </div>
      </header>
    </div>
  );
}
