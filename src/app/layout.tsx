import type { Metadata } from "next";
import "@/styles/globals.css";
import { leaguespartan, comucan, anton } from "@/shared/utils/font";
import { Analytics } from "@vercel/analytics/next";
import StructuredData from "@/shared/data/StructuredData";
import LenisProvider from "@/shared/providers/LenisProvider";
import SplashScreen from "@/shared/components/SplashScreen";

const siteUrl = "https://itfest-filkom.com/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title:
    "IT FEST 2026 | Lomba Digital Media, Business Plan, & UI/UX Nasional FILKOM UB",

  description:
    "Daftarkan dirimu di IT FEST 2026! Kompetisi mahasiswa nasional oleh HIMA KBMDSI FILKOM UB dengan kategori Digital Media, Business Plan, dan UI/UX Competition. Tunjukkan inovasimu dan menangkan hadiahnya!",

  keywords:
    "IT FEST 2026, KBMDSI FILKOM UB, lomba digital media nasional, lomba business plan nasional, kompetisi UI UX nasional, lomba mahasiswa Indonesia, FILKOM UB, KBMDSI, teknologi informasi, lomba UIUX, kompetisi nasional mahasiswa, Fakultas Ilmu Komputer Universitas Brawijaya, info lomba 2026, kompetisi bisnis plan, UI/UX design competition, event mahasiswa nasional, lomba inovasi teknologi, kompetisi startup, lomba desain antarmuka, business competition Indonesia, lomba IT nasional, kompetisi desain pengalaman pengguna, lomba wirausaha mahasiswa, event teknologi 2026, kompetisi inovasi digital",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "IT FEST 2026 | Kompetisi Mahasiswa Nasional oleh KBMDSI FILKOM UB",
    description:
      "Ajang tahunan bergengsi berskala nasional dengan tiga kategori utama: Digital Media, Business Plan, dan UI/UX Competition. Diselenggarakan oleh KBMDSI FILKOM UB.",
    url: siteUrl,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Poster Resmi IT FEST 2026",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="id">
      <head>
        <StructuredData />
      </head>
      <body
        suppressHydrationWarning
        className={`${comucan.variable} ${leaguespartan.variable} ${anton.variable} antialiased`}
      >
        <LenisProvider>
          <SplashScreen />
          {children}
        </LenisProvider>
        <Analytics />
      </body>
    </html>
  );
}
