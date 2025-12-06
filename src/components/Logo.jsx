import React from "react";
import { SiSemanticscholar } from "react-icons/si";

const Logo = () => {
  return (
    <div>
      <div  className="">
        <SiSemanticscholar className="text-4xl text-orange-700 ml-50 mb-[-16px]"/>
        <a className="text-3xl font-extrabold text-primary text-eye flex items-center ml-5">
          Scholar<span className="text-secondary">Stream</span>
        </a>
      </div>
    </div>
  );
};

export default Logo;
