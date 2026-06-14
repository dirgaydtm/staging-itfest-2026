const StructuredData = () => {
  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "IT FEST 2026",
    startDate: "2026-XX-XXT09:00",  // isi nanti kalau sudah ada info dari event organizer
    endDate: "2026-XX-XXT17:00",  // isi nanti kalau sudah ada info dari event organizer
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode", // Jika online
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: "https://itfest.ub.ac.id/",
    },
    description:
      "IT FEST 2026 adalah kompetisi mahasiswa tingkat nasional yang diselenggarakan oleh KBMDSI FILKOM UB. Terdiri dari kategori Digital Media, Business Plan dan UI/UX Competition, acara ini menjadi wadah bagi mahasiswa kreatif se-Indonesia untuk berkompetisi dan berinovasi.",
    image: [""],
    organizer: {
      "@type": "Organization",
      name: "KBMDSI FILKOM Universitas Brawijaya",
      url: "https://kbmdsi.ub.ac.id/",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(eventData) }}
    />
  );
};

export default StructuredData;
