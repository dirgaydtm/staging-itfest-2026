import React from "react";
import Button from "./Button";
import Link from "next/link";

const Category = () => {
  return (
    <section className="w-full h-[100vh] inset-0 text-white font-robotech flex flex-col items-center lg:gap-28">
      <h1 className="font-neighbor 2xl:text-6xl lg:text-5xl text-3xl text-center mt-10">
        CHOOSE YOUR CHALLENGE
      </h1>
      <div>
        <Link href={"/onboarding"}>
          <Button />
        </Link>
      </div>
    </section>
  );
};

export default Category;
