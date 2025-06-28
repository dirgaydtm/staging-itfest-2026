import { StaticImageData } from "next/image";
import BP from "@/assets/img/guide/BP.jpg";
import UIUX from "@/assets/img/guide/UIUX.jpg";
export interface GuideBookData {
  title: string;
  subtitle: string;
  href: string;
  glowColor: string;
  image: StaticImageData;
}

export const GuideBooks: GuideBookData[] = [
  {
    title: "Guidebook BP",
    subtitle: "Your Complete Blueprint to Success!",
    href: "https://drive.google.com/file/d/1JeaQSNOMEQrLOINHXT7rWgXvJBi7RUD2/view?usp=drive_link",
    glowColor: "from-cyan-400/20 to-blue-600/30",
    image: BP,
  },
  {
    title: "Guidebook UI/UX",
    subtitle: "Revolutionize Your Design Thinking!",
    href: "https://drive.google.com/file/d/1UfFWp_uh89dlbsAnH2Cs1CG5Twp8vzQC/view?usp=drive_link",
    glowColor: "from-purple-400/20 to-pink-600/30",
    image: UIUX,
  },
];
