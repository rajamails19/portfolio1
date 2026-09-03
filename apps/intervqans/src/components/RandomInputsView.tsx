import { useState } from "react";
import { NotebookPen, Sparkles, Trash2 } from "lucide-react";
import { useRandomInputs } from "@/hooks/use-random-inputs";

export function RandomInputsView() {
  const { inputs, addInput, removeInput } = useRandomInputs();
  const [draft, setDraft] = useState("");

  const handleSave = () => {
    if (!draft.trim()) return;
    addInput(draft);
    setDraft("");
  };

  return (
    <div className="theory-canvas relative min-h-dvh overflow-x-clip pb-24">
      <div aria-hidden className="theory-grid" />
      <div className="relative mx-auto w-full max-w-[1500px] px-4 pb-10 pt-20 sm:px-6 lg:px-8 lg:pt-10">
        <header className="relative overflow-hidden rounded-[2rem] border border-gold/20 glass p-7 shadow-[0_28px_90px_-48px_oklch(0.2_0.05_60/0.65)] sm:p-10">
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/25 bg-noir/60 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.25em] text-gold-ink">
              <Sparkles className="h-3.5 w-3.5" /> AiML · Scratchpad
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-gold/40 bg-gold/15 text-gold-ink shadow-sm">
                <NotebookPen className="h-7 w-7" />
              </span>
              <h1 className="font-display text-4xl font-semibold leading-none sm:text-6xl">
                <span className="gradient-text">Your Inputs</span>
              </h1>
            </div>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-foreground/72 sm:text-lg">
              Type or paste anything below and save it. Nothing is reformatted — each save is
              appended below exactly as you wrote it, in order.
            </p>
          </div>
        </header>

        <section className="glass mt-5 rounded-[2rem] border border-gold/20 p-5 sm:p-7">
          <label
            htmlFor="random-input-textarea"
            className="text-xs font-bold uppercase tracking-[0.2em] text-gold-ink"
          >
            Write anything
          </label>
          <textarea
            id="random-input-textarea"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={8}
            placeholder="Type or paste whatever you want to keep..."
            className="mt-3 w-full resize-y rounded-2xl border border-gold/20 bg-noir/60 px-4 py-3 text-base text-foreground placeholder:text-foreground/40 focus:border-gold/50 focus:outline-none sm:text-sm"
          />
          <div className="mt-3 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {draft.trim().length > 0 ? `${draft.length} characters` : "Nothing typed yet"}
            </p>
            <button
              type="button"
              onClick={handleSave}
              disabled={!draft.trim()}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-gold to-ember px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-glow transition disabled:cursor-not-allowed disabled:opacity-40"
            >
              Save
            </button>
          </div>
        </section>

        <main className="mt-5">
          <SavedInputsTable inputs={inputs} onRemove={removeInput} />
        </main>
      </div>
    </div>
  );
}

function SavedInputsTable({
  inputs,
  onRemove,
}: {
  inputs: { id: string; text: string; createdAt: string }[];
  onRemove: (id: string) => void;
}) {
  if (inputs.length === 0) {
    return (
      <div className="glass rounded-[2rem] border border-gold/20 px-5 py-14 text-center sm:px-8">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10 text-gold-ink">
          <NotebookPen className="h-6 w-6" />
        </span>
        <h2 className="mt-5 font-display text-2xl font-semibold">
          Your saved inputs will collect here
        </h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-foreground/65">
          Write something above and hit Save — each entry is appended as a new row, exactly as
          typed.
        </p>
      </div>
    );
  }

  return (
    <section className="overflow-hidden rounded-[2rem] border border-gold/20 bg-noir/55 shadow-[0_24px_70px_-45px_var(--ember)]">
      <header className="flex items-center justify-between gap-4 border-b border-gold/15 px-5 py-5 sm:px-7">
        <div className="min-w-0">
          <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-gold-ink">
            <Sparkles className="h-3.5 w-3.5" /> AiML · Random Inputs
          </p>
          <h2 className="mt-1 font-display text-2xl font-semibold">Saved Entries</h2>
        </div>
        <span className="shrink-0 rounded-full border border-gold/35 bg-gold/15 px-3 py-1.5 text-xs font-bold text-gold-ink">
          {inputs.length} {inputs.length === 1 ? "entry" : "entries"}
        </span>
      </header>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] table-fixed text-left text-sm">
          <thead className="bg-[oklch(0.16_0.02_20)] text-[10px] uppercase tracking-[0.18em] text-gold-ink/80">
            <tr>
              <th className="w-14 px-4 py-3 text-center">#</th>
              <th className="px-4 py-3">Your Input</th>
              <th className="w-40 px-4 py-3">Saved</th>
              <th className="w-16 px-4 py-3 text-center">Remove</th>
            </tr>
          </thead>
          <tbody>
            {inputs.map((entry, index) => (
              <tr key={entry.id} className="border-t border-gold/10 align-top odd:bg-white/[0.025]">
                <td className="px-4 py-4 text-center font-display text-lg font-semibold text-gold-ink">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="px-4 py-4">
                  <p className="whitespace-pre-wrap break-words leading-relaxed text-foreground/85">
                    {entry.text}
                  </p>
                </td>
                <td className="px-4 py-4 text-xs text-muted-foreground">
                  {new Date(entry.createdAt).toLocaleString()}
                </td>
                <td className="px-4 py-4 text-center">
                  <button
                    type="button"
                    aria-label={`Remove entry ${index + 1}`}
                    title="Remove entry"
                    onClick={() => onRemove(entry.id)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-ember/25 bg-ember/10 text-ember transition hover:border-ember/55 hover:bg-ember/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember/70"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
