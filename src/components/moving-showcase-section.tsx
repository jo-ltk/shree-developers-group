import Image from "next/image";

const showcaseItems = [
  {
    title: "ARCHIPELAGO COASTAL LIVING",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=2200&q=80",
  },
  {
    title: "CITY MAKING BY THE WATER",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=2200&q=80",
  },
  {
    title: "URBAN PRECINCTS WITH CLARITY",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=2200&q=80",
  },
];

export function MovingShowcaseSection() {
  const repeatedItems = [...showcaseItems, ...showcaseItems];

  return (
    <section className="overflow-hidden bg-primary px-0 py-10 text-primary-foreground sm:py-12 lg:py-14">
      <div className="moving-showcase group overflow-hidden">
        <div className="moving-showcase-track flex min-w-max items-stretch gap-5 pl-5 will-change-transform sm:gap-6 sm:pl-6 lg:gap-7 lg:pl-7">
          {repeatedItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="group/slide relative h-[20rem] w-[88vw] shrink-0 overflow-hidden rounded-none bg-background sm:h-[28rem] sm:w-[82vw] lg:h-[40rem] lg:w-[78vw]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/slide:scale-[1.04]"
                sizes="88vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,0.08),rgba(8,12,20,0.16)_36%,rgba(8,12,20,0.34)_70%,rgba(8,12,20,0.52))]" />
              <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                <div className="moving-showcase-text font-sans text-[clamp(3.4rem,8.8vw,9.2rem)] font-normal uppercase leading-[0.84] tracking-[-0.055em] text-primary-foreground/96 transition-colors duration-300 group-hover:text-secondary">
                  {item.title}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
