import AboutContainer from "@/feature/landing/about/container/container";
import CategoryContainer from "@/feature/landing/category/container/container";
import EventContainer from "@/feature/landing/event-sponsor/container/EventContainer";
import FaqContainer from "@/feature/landing/faq/container/FaqContainer";
import GuideContainer from "@/feature/landing/guide/container/GuideContainer";
import HeroContainer from "@/feature/landing/hero/container/container";
import SpecialPrizeContainer from "@/feature/landing/prize/container/container";
import TimelineContainer from "@/feature/landing/timeline/container/container";
import Stars from "@/shared/components/Stars";

export default function Home() {
  return (
    <main className="relative min-h-screen scroll-smooth bg-darker-blue overflow-hidden">
      <Stars className="z-0" />
      <section id="hero">
        <HeroContainer />
      </section>
      <section id="about">
        <AboutContainer />
      </section>
      <CategoryContainer />
      <section id="timeline">
        <TimelineContainer />
      </section>
      <section id="prize">
        <SpecialPrizeContainer />
      </section>
      <section id="faq">
        <FaqContainer />
      </section>
      {/* <EventContainer /> */}
      <section id="guide">
        <GuideContainer />
      </section>
    </main>
  );
}
