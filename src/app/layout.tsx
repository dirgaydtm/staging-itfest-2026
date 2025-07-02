import type { Metadata } from "next";
import "@/styles/globals.css";
import { changa, neighbor, robotech } from "@/shared/utils/font";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "IT FEST 2025 ",
  description:
    "IT FEST 2025 adalah kompetisi mahasiswa tingkat nasional yang diselenggarakan oleh HIMA KBMDSI UB. Terdiri dari kategori Business Plan dan UI/UX Competition, acara ini menjadi wadah bagi mahasiswa kreatif se-Indonesia untuk berkompetisi dan berinovasi.",
  keywords:
    "IT FEST 2025, KBMDSI UB, lomba business plan nasional, kompetisi UI UX nasional, lomba mahasiswa Indonesia, FILKOM UB,  KBMDSI, teknologi informasi, lomba UIUX, kompetisi nasional mahasiswa, Fakultas Ilmu Komputer Universitas Brawijaya",
  openGraph: {
    title: "IT FEST 2025 | Kompetisi Mahasiswa Nasional oleh KBMDSI FILKOM UB",
    description:
      "IT FEST 2025 merupakan ajang tahunan bergengsi berskala nasional dengan dua kategori utama: Business Plan dan UI/UX Competition. Diselenggarakan oleh KBMDSI FILKOM UB.",
    type: "website",
    locale: "id_ID",
    siteName: "IT FEST 2025",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT FEST 2025 | Kompetisi Mahasiswa Nasional oleh KBMDSI FILKOM UB",
    description:
      "Ayo ikuti IT FEST 2025! Kompetisi mahasiswa tingkat nasional dengan kategori Business Plan dan UI/UX. Tunjukkan kreativitasmu!",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className={` ${neighbor.variable} ${robotech.variable} ${changa.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
