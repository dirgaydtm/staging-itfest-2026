import { StaticImageData } from "next/image";
import cover_uiux from "@/assets/img/guidebooks/cover_uiux.png";
import cover_bp from "@/assets/img/guidebooks/cover_bp.png";
import cover_dml from "@/assets/img/guidebooks/cover_dml.png";

export interface GuideBookData {
  title: string;
  subtitle: string;
  href: string;
  glowColor: string;
  image: StaticImageData;
}

export const GuideBooks: GuideBookData[] = [
  {
    title: "Guidebook UI/UX",
    subtitle: "Revolutionize Your Design Thinking!",
    href: "https://drive.google.com/file/d/19raMgOZZ5oW9vS3efeEBJbn08Z-00xFl/view?usp=drive_link",
    glowColor: "from-purple-400/20 to-pink-600/30",
    image: cover_uiux,
  },
  {
    title: "Guidebook BP",
    subtitle: "Your Complete Blueprint to Success!",
    href: "https://drive.google.com/file/d/10ZoiqBb3L0IDxuCHn1zf2PywxVfS5zDf/view?usp=drive_link",
    glowColor: "from-cyan-400/20 to-blue-600/30",
    image: cover_bp,
  },
  {
    title: "Guidebook DML",
    subtitle: "Master the Art of Data Mining!",
    href: "https://drive.google.com/file/d/1your-dml-link-here/view?usp=drive_link",
    glowColor: "from-green-400/20 to-emerald-600/30",
    image: cover_dml,
  },
];
