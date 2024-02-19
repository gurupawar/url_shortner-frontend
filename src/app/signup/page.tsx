"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const SignUp: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirmPassword, setconfirmPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    // Regular expression for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setError("Invalid email address");
    } else if (password !== confirmPassword) {
      setError("Confirm password does not match!");
    } else {
      setError("");
      if (password.length < 6) {
        setError("Password should be at least 6 characters long");
        return;
      }
      console.log("hello");
      try {
        const response = await fetch(
          "https://short-me.onrender.com/auth/signin",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        // Access the response body
        const responseData = await response.json();
        console.log(responseData);

        if (!responseData.user) {
          console.log(responseData.message);
          setError(responseData.error);
        } else if (responseData.user) {
          console.log(responseData);
          // localValueSetter(responseData.user);
          // localStorage.setItem("user", JSON.stringify(responseData.user));
          // router.push("/dashboard");
        }
      } catch (error) {
        console.error("Error posting data:", error);
      }
    }
  };

  return (
    <div className="container mx-auto py-5 max-w-lg">
      <h1 className="text-left text-3xl font-bold text-orange-500">
        Join ShortME, <span className="text-blue-500">Save Time</span> Today
      </h1>
      <p className="text-left mt-2">Dont think about it. do it!</p>
      <form
        onSubmit={handleSubmit}
        className="mt-10  rounded-sm bg-gray-500 bg-opacity-30 shadow-sm p-5"
      >
        <div>
          <span className="text-sm">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 block w-full bg-gray-300 bg-opacity-30 border rounded-sm px-3 border-gray-500  text-white text-opacity-100 py-2 focus:outline-none"
            type="email"
            placeholder="Enter email"
          />
        </div>
        <div className="flex gap-0 md:gap-2 flex-col md:flex-row">
          <div className="my-3">
            <span className="text-sm">Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-full bg-gray-300 bg-opacity-30 border rounded-sm px-3 border-gray-500  text-white text-opacity-100 py-2 focus:outline-none"
              placeholder="Enter password"
            />
          </div>
          <div className="mt-0 mb-3 md:mt-3">
            <span className="text-sm">Confirm Password</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setconfirmPassword(e.target.value)}
              className="mt-2 block w-full bg-gray-300 bg-opacity-30 border rounded-sm px-3 border-gray-500  text-white text-opacity-100 py-2 focus:outline-none"
              placeholder="Confirm password"
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          disabled={!email || !password || !confirmPassword}
          className="block w-full my-5 rounded-sm text-white bg-blue-500 hover:bg-blue-600"
        >
          Sign In
        </Button>

        <p className="text-sm text-center flex justify-between">
          <div>
            <span className="op"> Already have acc? </span>
            <a href="/signin" className="text-blue-500 font-semibold">
              Log In
            </a>
          </div>
          <span className="text-sm font-semibold text-blue-500 text-right ">
            Forgot password?
          </span>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
