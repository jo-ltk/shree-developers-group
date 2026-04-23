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
    <section className="bg-[var(--color-primary)] py-20 lg:py-28 text-[var(--text-light)]">
      <div className="mx-auto max-w-[120rem] px-5 sm:px-7 lg:px-20">
        <div>
          <div className="flex items-center gap-4 mb-7">
            <span className="h-[1.5px] w-9 bg-[var(--color-accent)] flex-shrink-0" />
            <p className="text-[10px] font-semibold tracking-[0.2em] text-[var(--color-accent)] uppercase">What Our Clients Say</p>
          </div>
          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "clamp(2rem, 3.5vw, 3.25rem)" }}
              className="text-[var(--text-light)] leading-[1.1] tracking-[-0.01em] max-w-[48rem]">
            Trusted by Many, Loved by <em style={{ fontStyle: "italic" }} className="text-[var(--color-accent)]">All.</em>
          </h2>
          <div className="my-8 h-[1px] w-12 bg-[var(--color-accent)]/30" />
          <p className="text-[0.82rem] font-light leading-[1.75] text-[var(--text-light)]/60 max-w-[36rem]">
            Our clients&apos; success stories reflect our commitment to excellence. See how we&apos;ve
            helped them find their dream homes, sustainable investments, and perfect getaways.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-7">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="border border-[var(--color-secondary)]/10 bg-[var(--color-secondary)]/[0.03] p-8 hover:border-[var(--color-accent)]/40 hover:bg-[var(--color-secondary)]/[0.05] transition-all duration-300 flex flex-col justify-between group cursor-pointer h-full min-h-[22rem]"
            >
              <div>
                <div className="flex items-center gap-2 text-[var(--color-accent)] mb-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${item.name}-${index}`} className="h-5 w-5 fill-current" strokeWidth={1.8} />
                  ))}
                </div>

                <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontWeight: 300, fontSize: "1.8rem" }}
                    className="leading-[1.3] text-[var(--text-light)] mb-8 group-hover:text-[var(--color-accent)] transition-colors duration-300">
                  &ldquo;{item.quote}&rdquo;
                </h3>
              </div>

              <div className="mt-auto flex items-center gap-5 pt-6 border-t border-[var(--color-secondary)]/10 group-hover:border-[var(--color-accent)]/30 transition-colors duration-300">
                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center bg-[var(--color-accent)] text-[1.1rem] font-bold text-[var(--text-primary)] uppercase" 
                     style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))" }}>
                  {item.initials}
                </div>

                <div>
                  <p className="text-[0.95rem] font-semibold tracking-wider text-[var(--text-light)] uppercase">{item.name}</p>
                  <p className="text-[0.82rem] font-light text-[var(--text-light)]/50 mt-1">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
