/** Canonical company contact details — use across the site for consistency. */
export const COMPANY_CONTACT = {
  /** Shown on the site and in mailto: links. */
  email: "yashesh@shreedevelopersgroup.com",
  /** Form submissions are delivered here (Resend "to" address). */
  enquiryInbox: "yashesh102024@gmail.com",
  phoneDisplay: "+1 (770) 789-7044",
  /** E.164 for tel: and wa.me links (no spaces or punctuation). */
  phoneE164: "+17707897044",
  whatsappDigits: "17707897044",
  instagramUrl: "https://www.instagram.com/shreedevelopersgroup",
  address: "5400 Laurel Springs Pkwy STE 702, Suwanee, GA 30024, USA",
  googleMapsUrl:
    "https://www.google.com/maps/search/?api=1&query=5400+Laurel+Springs+Pkwy+STE+702,+Suwanee,+GA+30024,+USA",
} as const;

export const COMPANY_MAILTO = `mailto:${COMPANY_CONTACT.email}`;
export const COMPANY_TEL = `tel:${COMPANY_CONTACT.phoneE164}`;
export const COMPANY_WHATSAPP = `https://wa.me/${COMPANY_CONTACT.whatsappDigits}`;
