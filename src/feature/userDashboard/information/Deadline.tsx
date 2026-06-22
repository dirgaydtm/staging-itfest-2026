"use client";

type CountdownValue = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

type Props = {
  title?: string;
  countdown: CountdownValue;
};

const Deadline = ({ title = "Submission Deadline", countdown }: Props) => {
  return (
    <section className="h-full rounded-2xl sm:rounded-3xl bg-white/[0.06] backdrop-blur-lg border border-white/15 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10 text-center font-leaguespartan text-light-blue">
      <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-3 sm:mb-5 md:mb-6">
        {title}
      </h2>
      <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-light-active-green">
        {countdown.days}: {countdown.hours}: {countdown.minutes}: {countdown.seconds}
      </p>
    </section>
  );
};

export default Deadline;