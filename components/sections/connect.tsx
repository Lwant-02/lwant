import { Github, Linkedin } from "lucide-react";
import { Frame } from "@/components/sections/parts";
import { socials } from "@/data/about";

const ICONS = { GitHub: Github, LinkedIn: Linkedin } as const;

export function Connect() {
  return (
    <Frame id="connect">
      <ul className="flex flex-col gap-5">
        {socials.map((s, i) => {
          const Icon = ICONS[s.name as keyof typeof ICONS];
          return (
            <li key={s.name}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`sticker flex items-center gap-4 rounded-3xl bg-white px-5 py-4 text-ink transition-transform hover:-translate-y-1 ${i % 2 ? "rotate-1" : "-rotate-1"}`}
              >
                <Icon className="size-8 flex-none" strokeWidth={2.4} aria-hidden="true" />
                <span className="flex flex-col">
                  <span className="font-display text-[24px] leading-tight">{s.name}</span>
                  <span className="text-[14px] font-extrabold text-ink-2">{s.handle}</span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </Frame>
  );
}
