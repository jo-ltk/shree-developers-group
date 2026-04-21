import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Buying with Shree Developers Group felt far more guided than transactional. The team kept every detail clear, and the whole process felt calm from start to finish.",
    name: "Nathan Harper",
    role: "Software Developer",
    initials: "NH",
  },
  {
    quote:
      "I was looking for a long-term investment, and they helped me evaluate every option with patience and honesty. It made the decision feel solid and informed.",
    name: "Logan Price",
    role: "Environmental Consultant",
    initials: "LP",
  },
  {
    quote:
      "They understood exactly what I wanted in a home and narrowed the search beautifully. It never felt overwhelming, and the outcome was better than I expected.",
    name: "Aria Sullivan",
    role: "Digital Nomad",
    initials: "AS",
  },
  {
    quote:
      "As a first-time buyer, I had a lot of questions. Their advice was practical, transparent, and reassuring the whole way through.",
    name: "Grace Powell",
    role: "Financial Consultant",
    initials: "GP",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="bg-muted px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
    >
      <div className="mx-auto max-w-[112rem]">
        <div className="max-w-[58rem]">
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-foreground/70">
            What Our Clients Say
          </p>
          <h2 className="mt-4 font-sans text-[3rem] font-normal leading-[0.92] tracking-[-0.06em] text-foreground sm:text-[4.4rem] lg:text-[5.4rem]">
            Trusted by Many, Loved by All
          </h2>
          <p className="mt-5 max-w-[30rem] text-[1rem] leading-8 text-foreground/78">
            Our clients&apos; success stories reflect our commitment to excellence. See how we&apos;ve
            helped them find their dream homes, sustainable investments, and perfect getaways.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-7">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="flex min-h-[22rem] flex-col justify-between rounded-none border border-foreground/10 bg-background p-7 shadow-[0_4px_12px_rgba(0,0,0,0.05)] transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.1)] sm:p-8"
            >
              <div>
                <div className="flex items-center gap-2 text-foreground">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${item.name}-${index}`} className="h-5 w-5 fill-current" strokeWidth={1.8} />
                  ))}
                </div>

                <p className="mt-6 max-w-[29rem] text-[1.18rem] leading-9 tracking-[-0.025em] text-foreground/84 sm:text-[1.28rem] sm:leading-10">
                  {item.quote}
                </p>
              </div>

              <div className="mt-8 flex items-center gap-4 border-t border-foreground/8 pt-6">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-[1rem] font-semibold text-primary"
                >
                  {item.initials}
                </div>

                <div>
                  <p className="text-[1.3rem] font-semibold tracking-[-0.03em] text-foreground">{item.name}</p>
                  <p className="text-[1rem] leading-7 text-muted-foreground">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
