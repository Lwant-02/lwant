import { Mortarboard } from "@/components/graduation/parts";

/**
 * What a visit to /graduation shows while the server reads the notes (PBI-011): the night, and a mortarboard. Next also
 * prefetches it, so the portfolio's link answers on the instant.
 */
export default function Loading() {
  return (
    <div className="fixed inset-0 grid place-items-center bg-night" role="status" aria-label="Loading the graduation board">
      <div className="flex flex-col items-center gap-5">
        <Mortarboard edge className="size-20 white-edge motion-safe:animate-bob" />
        <p className="ltd text-[40px] leading-none sm:text-[52px]">I’m graduating!</p>
      </div>
    </div>
  );
}
