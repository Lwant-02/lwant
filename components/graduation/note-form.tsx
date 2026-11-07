"use client";

import { MapPin } from "lucide-react";
import { useActionState, useState } from "react";
import { postNote, type Posted } from "@/app/graduation/actions";
import { NAME_MAX, NOTE_MAX, length } from "@/lib/graduation";
import { cn } from "@/lib/utils";

const FIELD =
  "w-full rounded-xl border-[2.5px] border-ink bg-white px-3 py-2.5 font-body text-[16px] font-bold text-ink outline-none placeholder:text-chalk-3 focus-visible:shadow-[0_0_0_3px_var(--color-sun)] focus-visible:outline-none";
const LABEL = "text-[12.5px] font-black tracking-[0.12em] text-ink-2 uppercase";

/**
 * The Wishes form (PBI-011): a name and a note, sent to `postNote`, which keeps them and nothing else. `opened` is when
 * the server rendered it, for the check that a person, not a script, is posting; `website` is a field only a bot fills.
 */
export function NoteForm({ opened }: { opened: number }) {
  const [state, send, pending] = useActionState<Posted, FormData>(postNote, null);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  // a note that went up clears the form, once
  const [cleared, setCleared] = useState<number | null>(null);
  if (state?.ok && state.at !== cleared) {
    setCleared(state.at);
    setName("");
    setBody("");
  }
  return (
    <form action={send} className="sticker relative flex -rotate-[0.8deg] flex-col gap-3.5 rounded-3xl bg-about-tint p-5 text-ink select-text sm:p-6">
      <h3 className="font-display text-[22px]">Leave a note</h3>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="wish-name" className={LABEL}>
          Your name
        </label>
        <input
          id="wish-name"
          name="name"
          data-autofocus
          required
          maxLength={NAME_MAX}
          autoComplete="name"
          placeholder="How you’d like to sign it"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={FIELD}
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <label htmlFor="wish-body" className={LABEL}>
            Your note
          </label>
          <span className="text-[12.5px] font-black text-ink-3">
            {length(body)} / {NOTE_MAX}
          </span>
        </div>
        <textarea
          id="wish-body"
          name="body"
          required
          rows={4}
          maxLength={NOTE_MAX}
          placeholder="Congrats, a memory, a wish…"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={cn(FIELD, "resize-none leading-normal")}
        />
      </div>
      {/* for bots only: hidden from people and from screen readers, never tabbed to */}
      <div aria-hidden="true" className="absolute -left-[10000px] size-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>
      <input type="hidden" name="opened" value={opened} />
      <button
        type="submit"
        disabled={pending}
        className="keycap mt-1.5 inline-flex h-[52px] cursor-pointer items-center justify-center gap-2.5 rounded-[15px] bg-sun font-display text-[18px] text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
      >
        <MapPin className="size-[18px]" strokeWidth={2.8} aria-hidden="true" />
        {pending ? "Sticking it on…" : "Stick it on the board"}
      </button>
      <p role="status" aria-live="polite" className="empty:hidden">
        {state && (
          <span className={cn("block rounded-xl border-2 border-ink px-3 py-2 text-[14px] font-extrabold", state.ok ? "bg-projects-tint" : "bg-achievements-tint")}>
            {state.message}
          </span>
        )}
      </p>
      <p className="text-[12.5px] leading-normal font-bold text-ink-3">
        Your name and note show here for everyone. No email, no sign-in, nothing else kept.
      </p>
    </form>
  );
}
