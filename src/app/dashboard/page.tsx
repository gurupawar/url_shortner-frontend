import InputComp from "@/components/inputComp";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { BsEye } from "react-icons/bs";

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
      <div className="container mt-5 flex gap-3">
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
          </CardHeader>
          <CardContent>
            <a href="">Deploy your new project.</a>
          </CardContent>
          <CardFooter>
            <BsEye />
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Create project</CardTitle>
          </CardHeader>
          <CardContent>
            <a href="">Deploy your new project.</a>
          </CardContent>
          <CardFooter>
            <BsEye />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
