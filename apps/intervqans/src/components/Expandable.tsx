import { useState, type ReactNode } from "react";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function Expandable({ children, label }: { children: ReactNode; label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="group relative cursor-zoom-in" onClick={() => setOpen(true)}>
        {children}
        <div className="pointer-events-none absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100">
          <Maximize2 className="h-4 w-4" />
        </div>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] w-[95vw] max-w-3xl overflow-auto border-none bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">{label ?? "Expanded view"}</DialogTitle>
          {children}
        </DialogContent>
      </Dialog>
    </>
  );
}
