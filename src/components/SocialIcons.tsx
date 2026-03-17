"use client";

import { useId } from "react";
import Icon from "react-simple-icons";

function InstagramIcon({ className, gradientId }: { className?: string; gradientId: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#833AB4" />
          <stop offset="50%" stopColor="#FD1D1D" />
          <stop offset="100%" stopColor="#FCB045" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientId})`}
        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      />
    </svg>
  );
}

function WhatsAppIcon({ className, fill }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill={fill ?? "#25D366"} className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

interface SocialLabels {
  facebook: string;
  whatsapp: string;
  linkedin: string;
  email: string;
}

interface SocialIconsProps {
  iconClassName?: string;
  iconSize?: number;
  linkClassName?: string;
  /** Icons in einer Farbe (z. B. schwarz) statt Markenfarben */
  monochrome?: boolean;
  /** Vertikale Liste mit Trennlinien und Textlabels (z. B. im Footer) */
  variant?: "inline" | "list";
  labels?: SocialLabels;
}

const socialLinks = {
  facebook: "https://www.facebook.com/people/HE-immologis-UG/61584411683113/",
  instagram: "https://www.instagram.com/he_immologis_ug/",
  whatsapp: "https://wa.me/491776361394",
  linkedin: "https://www.linkedin.com/company/he-immologis/",
  email: "mailto:eberhard@he-immologis.de",
};

export default function SocialIcons({
  iconClassName = "h-5 w-5",
  iconSize = 20,
  linkClassName = "transition-opacity hover:opacity-80",
  monochrome = false,
  variant = "inline",
  labels,
}: SocialIconsProps) {
  const gradientId = useId();
  const fill = monochrome ? "currentColor" : undefined;
  const iconFill = monochrome ? "currentColor" : undefined;

  const listItems = [
    { key: "facebook", href: socialLinks.facebook, label: labels?.facebook ?? "Facebook", icon: "facebook" as const },
    { key: "whatsapp", href: socialLinks.whatsapp, label: labels?.whatsapp ?? "WhatsApp", icon: "whatsapp" as const },
    { key: "linkedin", href: socialLinks.linkedin, label: labels?.linkedin ?? "LinkedIn", icon: "linkedin" as const },
    { key: "email", href: socialLinks.email, label: labels?.email ?? "E-Mail", icon: "email" as const },
  ];

  if (variant === "list") {
    return (
      <nav className="text-white" aria-label="Social Media">
        <ul className="divide-y divide-slate-600">
          {listItems.map(({ key, href, label, icon }) => (
            <li key={key}>
              <a
                href={href}
                target={icon === "email" ? undefined : "_blank"}
                rel={icon === "email" ? undefined : "noopener noreferrer"}
                className="flex items-center gap-3 py-3 text-sm text-white transition-colors hover:text-slate-200"
                aria-label={label}
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center text-white">
                  {icon === "facebook" && <Icon name="facebook" size={20} fill="currentColor" />}
                  {icon === "whatsapp" && <WhatsAppIcon className="h-5 w-5" fill="currentColor" />}
                  {icon === "linkedin" && <Icon name="linkedin" size={20} fill="currentColor" />}
                  {icon === "email" && (
                    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )}
                </span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <div className={monochrome ? "text-black" : undefined}>
      <div className="flex items-center gap-4" aria-label="Social Media">
        <a
          href={socialLinks.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label="Instagram"
        >
          {monochrome ? (
            <svg viewBox="0 0 24 24" className={iconClassName} fill="currentColor" aria-hidden>
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          ) : (
            <InstagramIcon className={iconClassName} gradientId={gradientId} />
          )}
        </a>
        <a
          href={socialLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label="Facebook"
        >
          <Icon name="facebook" size={iconSize} fill={iconFill ?? "#1877F2"} />
        </a>
        <a
          href="https://wa.me/491776361394"
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label="WhatsApp"
        >
          <WhatsAppIcon className={iconClassName} fill={fill} />
        </a>
        <a
          href={socialLinks.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClassName}
          aria-label="LinkedIn"
        >
          <Icon name="linkedin" size={iconSize} fill={iconFill ?? "#0A66C2"} />
        </a>
      </div>
    </div>
  );
}
