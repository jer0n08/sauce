import type { CSSProperties } from "react";

type RollingTextProps = {
  text: string;
  className?: string;
};

type GraphemeSegment = { segment: string };
type SegmenterLike = {
  segment: (value: string) => Iterable<GraphemeSegment>;
};

const graphemeSegmenter: SegmenterLike | null =
  typeof Intl !== "undefined" && "Segmenter" in Intl
    ? new (Intl as unknown as { Segmenter: new (locale: string, options: { granularity: "grapheme" }) => SegmenterLike }).Segmenter(
        "fr",
        { granularity: "grapheme" },
      )
    : null;

function splitGraphemes(value: string) {
  if (!graphemeSegmenter) {
    return Array.from(value);
  }

  return Array.from(graphemeSegmenter.segment(value), (segment) => segment.segment);
}

export function RollingText({ text, className = "" }: RollingTextProps) {
  const normalizedText = typeof text.normalize === "function" ? text.normalize("NFC") : text;
  const chars = splitGraphemes(normalizedText);

  return (
    <span className={`rolling-text ${className}`.trim()}>
      <span className="rolling-text-row rolling-text-row-front" aria-hidden="true">
        {chars.map((char, index) => (
          <span
            key={`front-${index}-${char}`}
            className="rolling-char"
            style={{ "--char-index": index } as CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="rolling-text-row rolling-text-row-back" aria-hidden="true">
        {chars.map((char, index) => (
          <span
            key={`back-${index}-${char}`}
            className="rolling-char"
            style={{ "--char-index": index } as CSSProperties}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </span>
      <span className="visually-hidden">{text}</span>
    </span>
  );
}
