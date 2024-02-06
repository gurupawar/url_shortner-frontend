import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-cyan-950">
      <div className="container flex justify-between items-center text-slate-300  py-5">
        <div>
          <h1>ShortME</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/signup">Sign up</a>
            </li>
            <li>
              <a href="/login">Log in</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
