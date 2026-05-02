import Image from "next/image";

const showcaseItems = [
  {
    title: "WARM RESIDENTIAL ARRIVALS",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=82",
  },
  {
    title: "SPACES PLANNED FOR FAMILY LIFE",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2200&q=82",
  },
  {
    title: "DETAILS THAT AGE WITH GRACE",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=2200&q=82",
  },
];

export function MovingShowcaseSection() {
  const repeatedItems = [...showcaseItems, ...showcaseItems];

  return (
    <section className="overflow-hidden bg-[#F2EADF] px-0 py-12 text-[var(--text-primary)] sm:py-14 lg:py-16">
      <div className="moving-showcase group overflow-hidden">
        <div className="moving-showcase-track flex min-w-max items-stretch gap-5 pl-5 will-change-transform sm:gap-6 sm:pl-6 lg:gap-7 lg:pl-7">
          {repeatedItems.map((item, index) => (
            <article
              key={`${item.title}-${index}`}
              className="group/slide relative h-[20rem] w-[88vw] shrink-0 overflow-hidden rounded-[8px] border border-[rgba(183,170,152,0.35)] bg-[#FAF8F3] sm:h-[28rem] sm:w-[82vw] lg:h-[40rem] lg:w-[78vw]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/slide:scale-[1.04]"
                sizes="88vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(250,248,243,0)_0%,rgba(250,248,243,0.1)_36%,rgba(250,248,243,0.76)_74%,#FAF8F3_100%)]" />
              <div className="absolute inset-x-0 bottom-0 px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8">
                <div className="moving-showcase-text max-w-[13ch] font-sans text-[2.6rem] font-medium uppercase leading-[0.96] tracking-normal text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-[4.5rem] lg:text-[7rem]">
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
