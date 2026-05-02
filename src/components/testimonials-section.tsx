import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "The difference was clarity. Every step, from payment schedule to handover checklist, was explained in a way that made the purchase feel calm.",
    name: "Rohan Mehta",
    role: "Homeowner",
    initials: "RM",
  },
  {
    quote:
      "We were comparing several investments, and Shree helped us understand the site, timeline, and long-term value without rushing the decision.",
    name: "Neha Shah",
    role: "Investor",
    initials: "NS",
  },
  {
    quote:
      "The planning felt practical for our family. The rooms, parking, and community spaces were thought through for everyday life, not just the brochure.",
    name: "Karan Patel",
    role: "Resident",
    initials: "KP",
  },
  {
    quote:
      "After possession, the team stayed responsive. That gave us confidence that the relationship did not end at the sale.",
    name: "Aarav Desai",
    role: "Homeowner",
    initials: "AD",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-[#E8DFD2] py-28 text-[var(--text-primary)] lg:py-36">
      <div className="mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="mb-7 flex items-center gap-4">
              <span className="h-px w-10 shrink-0 bg-[var(--color-accent)]" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-accent)]">
                Client Voices
              </p>
            </div>
            <h2
              className="max-w-[45rem] text-[2.55rem] font-light leading-[1.06] tracking-normal text-[var(--text-primary)] sm:text-[3.25rem] lg:text-[4rem]"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Trust is built in quiet moments of{" "}
              <em className="text-[var(--color-accent)]" style={{ fontStyle: "italic" }}>
                follow-through.
              </em>
            </h2>
          </div>
          <p className="max-w-[40rem] text-[0.98rem] font-light leading-[1.85] text-[var(--text-primary)]">
            A premium builder experience should feel steady, human, and easy to understand. These
            stories reflect the kind of reassurance Shree wants every buyer to feel.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-7">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="group flex h-full min-h-[21rem] flex-col justify-between rounded-[8px] border border-[rgba(183,170,152,0.35)] bg-[#FAF8F3] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[rgba(201,174,123,0.65)] sm:p-8"
            >
              <div>
                <div className="mb-7 flex items-center gap-2 text-[var(--color-accent)]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${item.name}-${index}`} className="h-4 w-4 fill-current" strokeWidth={1.8} />
                  ))}
                </div>

                <h3
                  className="mb-8 text-[1.75rem] font-light leading-[1.28] tracking-normal text-[var(--text-primary)] transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  &ldquo;{item.quote}&rdquo;
                </h3>
              </div>

              <div className="mt-auto flex items-center gap-5 border-t border-[rgba(183,170,152,0.35)] pt-6 transition-colors duration-300 group-hover:border-[rgba(201,174,123,0.55)]">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center bg-[var(--color-accent)] text-[1.05rem] font-bold uppercase text-[#3A342E]"
                  style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}
                >
                  {item.initials}
                </div>

                <div>
                  <p className="text-[0.9rem] font-semibold uppercase tracking-[0.12em] text-[var(--text-primary)]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-[0.82rem] font-light text-[var(--text-secondary)]">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
