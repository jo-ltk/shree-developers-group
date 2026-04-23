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
          <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-[#C6A96B]">
            What Our Clients Say
          </p>
          <h2 className="mt-4 font-cormorant text-[3.5rem] leading-[1.05] text-[#112025] sm:text-[4.4rem] lg:text-[5.4rem]">
            Trusted by Many, Loved by All
          </h2>
          <p className="mt-5 max-w-[30rem] font-outfit font-light text-[1.1rem] leading-relaxed text-[#787b78]">
            Our clients&apos; success stories reflect our commitment to excellence. See how we&apos;ve
            helped them find their dream homes, sustainable investments, and perfect getaways.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 xl:gap-7">
          {testimonials.map((item) => (
            <article
              key={item.name}
              className="border border-[#C6A96B]/15 bg-[#F5F3EF] p-8 transition-all duration-500 hover:border-[#C6A96B]/40 hover:shadow-[0_8px_40px_rgba(198,169,107,0.08)] hover:-translate-y-1 flex flex-col justify-between group cursor-pointer h-full min-h-[22rem]"
            >
              <div>
                <div className="flex items-center gap-2 text-[#C6A96B] mb-6">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={`${item.name}-${index}`} className="h-5 w-5 fill-current" strokeWidth={1.8} />
                  ))}
                </div>

                <h3 className="font-cormorant text-[1.8rem] sm:text-[2rem] leading-[1.3] text-[#112025] mb-8">
                  &ldquo;{item.quote}&rdquo;
                </h3>
              </div>

              <div className="mt-auto flex items-center gap-4 pt-6 border-t border-[#C6A96B]/15">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#C6A96B] text-[0.95rem] font-semibold text-[#F5F3EF]">
                  {item.initials}
                </div>

                <div>
                  <p className="font-outfit font-medium text-[1.1rem] tracking-wide text-[#112025]">{item.name}</p>
                  <p className="font-outfit font-light text-[0.95rem] text-[#787b78]">{item.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
