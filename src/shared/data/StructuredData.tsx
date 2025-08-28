const StructuredData = () => {
  const eventData = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: "IT FEST 2025",
    startDate: "2025-07-01T09:00", // Ganti dengan tanggal mulai acara
    endDate: "2025-08-25T17:00", // Ganti dengan tanggal selesai acara
    eventAttendanceMode: "https://schema.org/OnlineEventAttendanceMode", // Jika online
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "VirtualLocation",
      url: "https://itfest-filkom.com/",
    },
    description:
      "IT FEST 2025 adalah kompetisi mahasiswa tingkat nasional yang diselenggarakan oleh KBMDSI FILKOM UB. Terdiri dari kategori Business Plan dan UI/UX Competition, acara ini menjadi wadah bagi mahasiswa kreatif se-Indonesia untuk berkompetisi dan berinovasi.",
    image: [""],
    organizer: {
      "@type": "Organization",
      name: "KBMDSI FILKOM Universitas Brawijaya",
      url: "https://kbmdsi.filkom.ub.ac.id/",
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
