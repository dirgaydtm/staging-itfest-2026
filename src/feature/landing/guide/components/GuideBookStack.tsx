"use client";

import React from "react";
import SocialCards, { CardItem } from "@/feature/landing/guide/components/card-fan-carousel";

// Dummy data untuk 3 Guidebook
const guideBooks: CardItem[] = [
  {
    imgUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=600&auto=format&fit=crop",
    alt: "Guidebook 1",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    alt: "Guidebook 2",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
    alt: "Guidebook 3",
  },
];

const GuideBookStack = () => {
  return (
    <div className="w-full relative flex justify-center items-center py-10 lg:py-20 min-h-100 md:min-h-125">
      <SocialCards cards={guideBooks} />
    </div>
  );
};

export default GuideBookStack;
