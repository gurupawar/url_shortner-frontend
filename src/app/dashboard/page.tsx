import InputComp from "@/components/inputComp";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { BsEye } from "react-icons/bs";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const Dashboard: React.FC = () => {
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
            <span className="opacity-10 italic mx-2">|</span>
            <span className="opacity-65">5 min ago</span>
            <FaRegCopy className="text-lg mx-2 text-blue-500 cursor-pointer" />
            <RiDeleteBin6Line className="text-lg text-red-600 cursor-pointer" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
