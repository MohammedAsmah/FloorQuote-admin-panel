import { Card } from "@/components/ui/Card";

export default async function SandboxPage() {
  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-semibold">Calculator Sandbox</h1>
      <Card className="p-6">
        <p className="text-sm text-slate-500">Admin-only simulator coming soon — select inputs to compute an estimate.</p>
      </Card>
    </section>
  );
}
