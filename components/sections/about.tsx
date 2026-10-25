import Image from "next/image";
import { Frame } from "@/components/sections/parts";
import { about } from "@/data/about";

export function About() {
  return (
    <Frame id="about">
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <Image
          src={about.photo}
          alt={`${about.name}, ${about.nickname}`}
          width={440}
          height={548}
          sizes="440px"
          className="aspect-[4/5] w-[200px] flex-none -rotate-3 rounded-3xl border-8 border-white object-cover outline-3 outline-ink lg:w-[220px]"
        />
        <div className="flex min-w-0 flex-col gap-4">
          <p className="font-display text-[34px] leading-tight">
            {about.name} <span className="text-ink-3">({about.nickname})</span>
          </p>
          <p className="-mt-2 text-[17px] font-black">
            {about.role}, {about.location}
          </p>
          <p className="max-w-[60ch] text-[16px] leading-relaxed font-semibold text-ink-2">{about.summary}</p>
          <h3 className="mt-2 font-display text-[24px]">Beyond the code</h3>
          <p className="-mt-2 max-w-[60ch] text-[16px] leading-relaxed font-semibold text-ink-2">{about.beyond}</p>
          <ul aria-label="Things I enjoy" className="mt-1 flex flex-wrap gap-3">
            {about.interests.map((x, i) => (
              <li
                key={x}
                className={`rounded-xl border-[2.5px] border-ink bg-white px-3 py-1 font-display text-[16px] shadow-[3px_3px_0_var(--color-ink)] ${i % 2 ? "rotate-2" : "-rotate-2"}`}
              >
                {x}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Frame>
  );
}
