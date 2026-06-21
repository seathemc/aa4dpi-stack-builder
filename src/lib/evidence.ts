export type EvidenceLevel = "Strong signal" | "Emerging signal" | "Needs validation";

export function evidenceLevel(value: number): EvidenceLevel {
  if (value >= 65) return "Strong signal";
  if (value >= 55) return "Emerging signal";
  return "Needs validation";
}

export function evidenceTone(level: EvidenceLevel) {
  if (level === "Strong signal") return "bg-emerald-50 text-emerald-700";
  if (level === "Emerging signal") return "bg-sky-50 text-sky-700";
  return "bg-amber-50 text-amber-800";
}
