import React from "react";
import Background from "../components/Background";
import Category from "../components/Category";

const CategoryContainer = () => {
  return (
    <section className="bg-blue-450 min-h-screen pb-20 lg:pb-0 relative overflow-visible ">
      <Background />
      <div className="mycontainer relative">
        <Category />
      </div>
    </section>
  );
};

export default CategoryContainer;
