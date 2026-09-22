"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
const links = [
  ["Products", "/products"],
  ["How it works", "/how-it-works"],
  ["Privacy", "/privacy"],
  ["Docs", "/docs"],
  ["Pricing", "/pricing"],
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link className="wordmark" href="/" onClick={() => setOpen(false)}>
          Lab Agent Works<span className="brand-period">.</span>
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-nav"
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
        >
          {links.map(([name, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={
                path === href ||
                (href === "/products" && path.startsWith("/products/"))
                  ? "page"
                  : undefined
              }
              onClick={() => setOpen(false)}
            >
              {name}
            </Link>
          ))}
          <Link
            className="button button-small"
            href="/download"
            onClick={() => setOpen(false)}
          >
            Download <span aria-hidden="true">↗</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
