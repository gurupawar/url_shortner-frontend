import React from "react";
import { SiGithub } from "react-icons/si";

const Footer: React.FC = () => {
  return (
    <div className="bg-cyan-900 mt-10">
      <div className="container py-3 flex justify-between">
        <span>
          made with ❤️ by
          <a
            className="text-cyan-400"
            target="_blank"
            href="https://github.com/gurupawar"
          >
            {" "}
            Gurushesh
          </a>
        </span>
        <a
          target="_blank"
          className="flex items-center"
          href="https://github.com/gurupawar"
        >
          <SiGithub className="me-2" /> Repo
        </a>
      </div>
    </div>
  );
};

export default Footer;
