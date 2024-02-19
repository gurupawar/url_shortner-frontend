"use client";

import React, { createContext, useContext, useState } from "react";

type Token = {
  _id: string;
  email: string;
  token: string;
};

interface MyContextType {
  shortenedUrl: string;
  token: Token | null;
  setShortenedUrl: (newValue: string) => void;
  setToken: (newValue: Token) => void;
  localValueSetter: (data: any) => void;
  isCreated: boolean;
  setIsCreated: (newValue: boolean) => void;
}

const MyContext = createContext<MyContextType | undefined>(undefined);

export const useMyContext = () => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};

export const MyContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const [value, setValue] = useState<string>("");
  const [shortenedUrl, setShortenedUrl] = React.useState<string>("");
  const [token, setToken] = React.useState<Token | null>(null);
  const [isCreated, setIsCreated] = React.useState<boolean>(false);

  const localValueSetter = (data: any) => {
    localStorage.setItem("user", JSON.stringify(data));
  };

  return (
    <MyContext.Provider
      value={{
        localValueSetter,
        shortenedUrl,
        setShortenedUrl,
        setToken,
        token,
        isCreated,
        setIsCreated,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
