"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(
    localStorage.getItem("user") ? true : false
  );

  const pathname = usePathname();

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);

      if (user) {
        setIsLoggedIn(true);
      }
    } else {
      console.log("User is not logged in");
    }
  }, [pathname]);

  return (
    <header className="bg-cyan-950">
      <div className="container flex justify-between items-center text-slate-300  py-5">
        <div>
          <h1>ShortME</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/">Home</Link>
            </li>
            {isLoggedIn ? (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/signup">Sign up</Link>
                </li>
                <li>
                  <Link href="/signin">Log in</Link>
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
