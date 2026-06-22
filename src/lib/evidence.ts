export type EvidenceLevel = "Strong signal" | "Emerging signal" | "Needs validation";

export function evidenceLevel(value: number): EvidenceLevel {
  if (value >= 65) return "Strong signal";
  if (value >= 55) return "Emerging signal";
  return "Needs validation";
}

export function evidenceTone(level: EvidenceLevel) {
  if (level === "Strong signal") {
    return "border-emerald-200 bg-emerald-50 text-emerald-800";
  }
  if (level === "Emerging signal") {
    return "border-sky-200 bg-sky-50 text-sky-800";
  }
  return "border-amber-200 bg-amber-50 text-amber-900";
}
