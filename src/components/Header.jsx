import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-blue-600 text-white shadow-md">
      {/* <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-bold">MyWebsite</Link>
        <nav className="flex gap-6">
          <Link to="/home" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/services" className="nav-link">Services</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
          <Link to="/calendar" className="nav-link">Calendar</Link>
        </nav>
      </div> */}
    </header>
  );
}

export default Header;
