import React from "react";
import { Link } from 'react-router-dom';

const menuItems = [
  { to: '/', label: 'Home', className: 'active' },
  { to: '/formulario', label: 'Formulario' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/team', label: 'Team' },
  { to: '/blog', label: 'Blog' },
  {
    to: '#',
    label: (
      <>
        <span>Drop Down</span>
        <i className="bi bi-chevron-down"></i>
      </>
    ),
    subMenu: [
      { to: '#', label: 'Drop Down 1' },
      {
        to: '#',
        label: (
          <>
            <span>Deep Drop Down</span>
            <i className="bi bi-chevron-right"></i>
          </>
        ),
        subMenu: [
          { to: '#', label: 'Deep Drop Down 1' },
          { to: '#', label: 'Deep Drop Down 2' },
          { to: '#', label: 'Deep Drop Down 3' },
          { to: '#', label: 'Deep Drop Down 4' },
          { to: '#', label: 'Deep Drop Down 5' },
        ],
      },
      { to: '#', label: 'Drop Down 2' },
      { to: '#', label: 'Drop Down 3' },
      { to: '#', label: 'Drop Down 4' },
    ],
  },
  { to: '/contact', label: 'Contact Us' },
];

function Navbar() {
  return (
    <nav id="navbar" className="navbar">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className={item.className}>
            <Link to={item.to}>{item.label}</Link>
            {item.subMenu && (
              <ul>
                {item.subMenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <Link to={subItem.to}>{subItem.label}</Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <i className="bi bi-list mobile-nav-toggle"></i>
    </nav>
  );
}

export default Navbar;
