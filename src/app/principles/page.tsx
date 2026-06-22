import { Eye, LockKeyhole, RefreshCw, Scale, ShieldCheck, Users } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const principles = [
  {
    title: "Start with the public service",
    body: "Do not begin with a platform. Begin with a real service journey and the people who need it.",
    icon: Users,
  },
  {
    title: "Reuse before rebuilding",
    body: "Map existing systems and open tools first. Build new components only when there is a clear gap.",
    icon: RefreshCw,
  },
  {
    title: "Design for inclusion",
    body: "Digital services must account for offline users, low-connectivity areas, language, disability, cost, and exclusion risk.",
    icon: Eye,
  },
  {
    title: "Protect rights and data",
    body: "Consent, purpose limitation, access control, audit logs, and redress are part of the infrastructure.",
    icon: LockKeyhole,
  },
  {
    title: "Keep agencies accountable",
    body: "Interoperability should clarify ownership, not blur it. Each institution needs a clear role and responsibility.",
    icon: Scale,
  },
  {
    title: "Make trust measurable",
    body: "Track service outcomes, failures, corrections, grievances, and evidence gaps, not only system deployment.",
    icon: ShieldCheck,
  },
];

export default function PrinciplesPage() {
  return (
    <PageShell
      eyebrow="Principles"
      title="Good DPI is public infrastructure, not just digitization"
      summary="The goal is not to connect every database. The goal is to make public services work better while protecting people, institutions, and public trust."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {principles.map((principle) => (
          <Card key={principle.title} className="rounded-lg">
            <CardHeader>
              <div className="flex size-9 items-center justify-center rounded-md bg-secondary text-primary">
                <principle.icon className="size-4" />
              </div>
              <CardTitle>{principle.title}</CardTitle>
              <CardDescription className="leading-6">
                {principle.body}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}
