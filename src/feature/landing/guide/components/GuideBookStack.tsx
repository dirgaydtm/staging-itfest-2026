"use client";

import React from "react";
import SocialCards, { CardItem } from "@/feature/landing/guide/components/card-fan-carousel";
import { GuideBooks } from "@/feature/landing/guide/data/GuideBookData";

// Convert GuideBookData to CardItem format
const guideBooks: CardItem[] = GuideBooks.map((book) => ({
  imgUrl: book.image.src, // StaticImageData has .src property
  alt: book.title,
  linkUrl: book.href,
}));

const GuideBookStack = () => {
  return (
    <div className="w-full relative flex justify-center items-center py-10 lg:py-20 min-h-100 md:min-h-125">
      <SocialCards cards={guideBooks} />
    </div>
  );
};

export default GuideBookStack;
