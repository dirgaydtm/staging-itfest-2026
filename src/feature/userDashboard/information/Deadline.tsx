"use client";

import { useCountdown } from "../hooks/useCountdown";

type Props = {
  title?: string;
  deadline: string;
};

const Deadline = ({ title = "Submission Deadline", deadline }: Props) => {
  const t = useCountdown(deadline);

  return (
    <section className="h-full rounded-3xl bg-white/[0.06] backdrop-blur-lg border border-white/15 px-6 py-10 text-center font-leaguespartan text-light-blue">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">{title}</h2>
      <p className="text-4xl md:text-5xl font-bold tracking-wider text-light-blue/60">
        {t.days}: {t.hours}: {t.minutes}: {t.seconds}
      </p>
    </section>
  );
};

export default Deadline;
