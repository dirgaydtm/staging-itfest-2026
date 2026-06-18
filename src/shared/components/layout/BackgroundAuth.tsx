import Image from "next/image";
import BintangLeft from "@/assets/img/auth/bintangLeft.png";
import BintangRight from "@/assets/img/auth/bintangRight.png";
import UnionLeft from "@/assets/img/auth/unionLeft.png";
import UnionRight from "@/assets/img/auth/unionRight.png";

const BackgroundAuth = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-black rounded-full blur-[100px] md:blur-[150px] opacity-60"></div>

      <Image 
        src={BintangLeft} 
        alt="Hiasan Kiri" 
        className="absolute left-0 opacity-80"
      />
      <Image 
        src={BintangRight} 
        alt="Hiasan Kanan" 
        className="absolute right-0 opacity-80"
      />
      <Image 
        src={UnionLeft} 
        alt="Union Kiri" 
        className="absolute left-0 bottom-20"
      />
      <Image 
        src={UnionRight} 
        alt="Union Kanan" 
        className="absolute right-0 top-24"
      />

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-[800px] md:w-[1600px] h-[200px] md:h-[150px] bg-normal-hover-blue rounded-[100%] blur-[100px] md:blur-[120px]"></div>
      
    </div>
  );
};

export default BackgroundAuth;