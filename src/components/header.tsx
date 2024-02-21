"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Header: React.FC = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(
    typeof window !== "undefined" && localStorage.getItem("user") ? true : false
  );

  const pathname = usePathname();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
    toast.success("Logged out successfully.");
  };

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
  const [hydration, setHydration] = useState(true);

  useEffect(() => {
    setHydration(false);
  }, [isLoggedIn]);
  if (hydration) {
    return;
  }

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
                <li>
                  <span onClick={handleLogOut} className="cursor-pointer">
                    Log out
                  </span>
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
