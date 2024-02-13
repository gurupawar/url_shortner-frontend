"use client";
import InputComp from "@/components/inputComp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useMyContext } from "@/context/MyContext";
import React, { useEffect } from "react";
import { BsEye } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

type RequestBody = {
  _id: string | undefined;
};

const Dashboard: React.FC = () => {
  const { token } = useMyContext();
  const [urlList, setUrlList] = React.useState<string[]>([]);
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const requestBody: RequestBody = {
    _id: token?._id,
  };
  const getData = async () => {
    if (token) {
      const response = await fetch(`${baseUrl}/api/all-url`, {
        method: "POST",
        headers: {
          authorization: token?.token || "",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();
      console.log(data);
    } else {
      console.log("No token found");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="py-5">
      <div
        style={{ maxWidth: "700px" }}
        className="container mx-auto flex min-h-60  flex-col justify-center items-center"
      >
        <h1 className="text-center text-4xl font-bold text-orange-500">
          Shorten your <span className="text-blue-500">looooong</span> URLs like
          never before!
        </h1>
        <p className="mt-4 text-center text-gray-400">
          Copy your long boring url. Paste it below. Then 💥 You got it, right?
        </p>

        <InputComp />
      </div>
      <div className="container mt-20 flex gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
          </CardHeader>
          <CardContent>
            <a href="" className="flex items-center">
              Deploy your new project
              <FaExternalLinkAlt
                className="text-orange-500 ms-2"
                style={{ fontSize: "14px" }}
              />
            </a>
          </CardContent>
          <CardFooter className=" flex items-center justify-between">
            <div className="flex items-center">
              <BsEye className="text-orange-100 opacity-65" />
              <span
                className="opacity-65 ms-2 italic"
                style={{ fontSize: "14px" }}
              >
                654
              </span>
            </div>
            <span className="opacity-10 mx-2">|</span>
            <span className="opacity-65" style={{ fontSize: "14px" }}>
              5 min ago
            </span>
            <FaRegCopy className="text-lg mx-2 text-blue-500 cursor-pointer" />
            <RiDeleteBin6Line className="text-lg text-red-600 cursor-pointer" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
