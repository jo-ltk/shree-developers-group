export type ContactFormPayload = {
  name: string;
  phone: string;
  email: string;
  callbackTime?: string;
  callbackMethod?: string;
  projectTitle?: string;
  source?: string;
};

export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<{ ok: true }> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as {
    error?: string;
  };

  if (!res.ok) {
    throw new Error(data.error ?? "Unable to submit your enquiry. Please try again.");
  }

  return { ok: true };
}
