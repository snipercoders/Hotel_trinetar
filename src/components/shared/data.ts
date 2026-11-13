import { site } from "@/data/site";

export function whatsappHref(message?: string) {
  return `https://wa.me/${site.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
}

export function phoneHref() {
  return `tel:${site.phone.replace(/[^+\d]/g, "")}`;
}
