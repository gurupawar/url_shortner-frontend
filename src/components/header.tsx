"use client";
import React, { useEffect } from "react";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);

      if (user) {
        setIsLoggedIn(true);
      }
    } else {
      console.log("User data not found in local storage");
    }
  }, [isLoggedIn]);

  console.log(isLoggedIn);
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
            {isLoggedIn ? (
              <>
                <li>
                  <a href="/dashboard">Dashboard</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <a href="/signup">Sign up</a>
                </li>
                <li>
                  <a href="/signin">Log in</a>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
