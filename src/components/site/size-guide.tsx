import { X } from "lucide-react";

const ROWS = [
  { size: "XS", bust: "80–84", waist: "62–66", hip: "88–92", uk: "6" },
  { size: "S", bust: "85–89", waist: "67–71", hip: "93–97", uk: "8–10" },
  { size: "M", bust: "90–94", waist: "72–76", hip: "98–102", uk: "12" },
  { size: "L", bust: "95–100", waist: "77–82", hip: "103–108", uk: "14" },
  { size: "XL", bust: "101–106", waist: "83–88", hip: "109–114", uk: "16" },
  { size: "XXL", bust: "107–112", waist: "89–95", hip: "115–120", uk: "18" },
];

export function SizeGuide({
  open,
  onClose,
  fit,
}: {
  open: boolean;
  onClose: () => void;
  fit?: string;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <div className="bg-ink/50 absolute inset-0" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
        className="bg-background reveal relative max-h-[88vh] w-full max-w-2xl overflow-y-auto p-7 sm:p-10"
      >
        <button
          aria-label="Close size guide"
          onClick={onClose}
          className="absolute top-5 right-5"
        >
          <X className="size-5" strokeWidth={1.2} />
        </button>

        <p className="eyebrow text-muted-foreground">What&apos;s my size?</p>
        <h2 className="font-display mt-3 text-3xl">Size &amp; Fit Guide</h2>
        <div className="hairline-gold mt-5" />

        <table className="mt-8 w-full text-left text-sm">
          <thead>
            <tr className="eyebrow text-muted-foreground border-b">
              <th className="py-3 font-normal">Size</th>
              <th className="py-3 font-normal">UK</th>
              <th className="py-3 font-normal">Bust (cm)</th>
              <th className="py-3 font-normal">Waist (cm)</th>
              <th className="py-3 font-normal">Hip (cm)</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.size} className="border-b last:border-0">
                <td className="py-3 tracking-[0.14em]">{row.size}</td>
                <td className="py-3">{row.uk}</td>
                <td className="py-3">{row.bust}</td>
                <td className="py-3">{row.waist}</td>
                <td className="py-3">{row.hip}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-9 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="eyebrow">How to measure</h3>
            <ul className="text-muted-foreground mt-3 space-y-2 text-sm leading-relaxed">
              <li>Bust — around the fullest part, tape level.</li>
              <li>Waist — the narrowest point of your torso.</li>
              <li>Hip — around the fullest part of your hips.</li>
              <li>Keep the tape snug, never tight.</li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow">Fit notes</h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              {fit ??
                "Between sizes? Choose the larger for comfort, the smaller for a closer line."}{" "}
              Still unsure? Message us on WhatsApp and our team will help you
              choose.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
