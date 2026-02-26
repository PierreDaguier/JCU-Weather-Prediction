import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'Weather Prediction' },
  { path: '/documentation', label: 'Documentation' }
];

function Navbar() {
  const location = useLocation();

  return (
    <nav className="primary-nav" aria-label="Main navigation">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-pill ${isActive ? 'is-active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export default Navbar;
