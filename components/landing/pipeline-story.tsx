import { Building2, CircleDollarSign, Trophy } from "lucide-react";
import { SectionHeading } from "./section-heading";

// Illustrative board data for the pipeline visual.
const stages = [
  { name: "Lead", caption: "A new name lands in your CRM.", deals: [["Globex", "$4,200"], ["Initech", "$2,800"]] },
  { name: "Qualified", caption: "The fit is real. Owner assigned.", deals: [["Northwind", "$9,600"]] },
  { name: "Proposal", caption: "Proposal sent, follow-up on the calendar.", deals: [["Umbrella", "$7,300"], ["Hooli", "$3,900"]] },
  { name: "Won", caption: "Closed, and the whole team sees it instantly.", deals: [["Stark Ltd", "$5,100"]] },
];

export function PipelineStory() {
  return (
    <section
      id="pipeline"
      data-pipeline
      className="relative flex min-h-screen items-center overflow-hidden border-y border-line bg-surface py-24 lg:py-0"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <div>
          <SectionHeading
            align="left"
            index="03"
            eyebrow="Customers and pipeline"
            title={
              <>
                Every deal, from first hello{" "}
                <span className="text-gradient-brand">to won.</span>
              </>
            }
            description="Leads, contacts, companies and deals live together. Move a deal forward and everyone on the team sees it the moment it happens."
          />
          <ol className="mt-10 space-y-1" aria-label="Deal stages">
            {stages.map((stage, i) => (
              <li
                key={stage.name}
                data-stage-item
                data-active={i === 0 ? "true" : "false"}
                className="relative flex gap-4 rounded-xl px-3 py-3 text-subtle transition-colors duration-300"
              >
                <span className="stage-dot mt-1.5 size-2.5 shrink-0 rounded-full bg-line transition-all duration-300" />
                <span>
                  <span className="flex items-center gap-2 font-medium">
                    <span className="font-mono text-[11px] text-subtle">0{i + 1}</span> {stage.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-muted">{stage.caption}</span>
                </span>
                <span className="stage-bar absolute inset-x-3 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-brand to-transparent transition-transform duration-500" />
              </li>
            ))}
          </ol>
        </div>

        <div className="-mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 lg:overflow-visible">
          <div className="relative grid min-w-[620px] grid-cols-4 gap-3 rounded-2xl border border-card bg-page p-3 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)]">
            {stages.map((stage, i) => (
              <div key={stage.name} data-stage-col className="rounded-xl bg-surface-2/70 p-2.5 dark:bg-white/[0.03]">
                <div className="mb-3 flex items-center justify-between px-1">
                  <span className="flex items-center gap-1.5 text-[12px] font-medium text-ink">
                    <span
                      className={`size-2 rounded-full ${
                        ["bg-slate-400", "bg-sky-500", "bg-violet-500", "bg-emerald-500"][i]
                      }`}
                    />
                    {stage.name}
                  </span>
                  <span className="font-mono text-[10.5px] text-subtle">{stage.deals.length + (i === 0 ? 1 : 0)}</span>
                </div>

                {/* slot for the travelling deal */}
                <div className="relative mb-2 h-[86px]">
                  {i === 0 ? (
                    <div data-deal className="relative z-10 h-full">
                      <div className="flex h-full flex-col justify-between rounded-lg border border-brand/50 bg-surface p-3 shadow-xl shadow-brand/15 ring-4 ring-brand/10">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1.5 text-[12.5px] font-semibold text-ink">
                            <Building2 className="size-3.5 text-brand-ink" /> Acme Corp
                          </span>
                          <span className="grid size-5 place-items-center rounded-full bg-amber-200 text-[8.5px] font-semibold text-navy">AK</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-1 font-mono text-[12px] text-ink">
                            <CircleDollarSign className="size-3.5 text-subtle" /> $12,400
                          </span>
                          <span
                            data-deal-won
                            className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10.5px] font-medium text-emerald-600 opacity-0 dark:text-emerald-300"
                          >
                            <Trophy className="size-3" /> Won
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="h-full rounded-lg border border-dashed border-line" />
                  )}
                </div>

                <div className="space-y-2">
                  {stage.deals.map(([company, value]) => (
                    <div key={company} className="rounded-lg border border-card bg-surface p-3 shadow-sm">
                      <div className="text-[12px] font-medium text-ink">{company}</div>
                      <div className="mt-1 font-mono text-[11px] text-subtle">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 text-center font-mono text-[10.5px] uppercase tracking-[0.16em] text-subtle lg:hidden">
            Swipe to see every stage
          </p>
        </div>
      </div>
    </section>
  );
}
