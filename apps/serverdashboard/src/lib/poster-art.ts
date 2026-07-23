import appleNotes from "@/assets/poster-apple-notes.jpg";
import forma from "@/assets/poster-forma.jpg";
import dashboard from "@/assets/poster-dashboard.jpg";
import telugu from "@/assets/poster-telugu.jpg";
import tanstack from "@/assets/poster-tanstack.jpg";
import quiz from "@/assets/poster-quiz.jpg";
import design from "@/assets/poster-design.jpg";
import vercel from "@/assets/host-vercel.jpg";
import cloudflare from "@/assets/host-cloudflare.jpg";
import domains from "@/assets/host-domains.jpg";
import prototypeArt from "@/assets/host-lovable.jpg";

export const APP_ART: Record<string, string> = {
  "apple-notes-clone": appleNotes,
  "forma-fitness": forma,
  "local-dashboard": dashboard,
  "telugu-trace-kids": telugu,
  "tanstack_start_ts": tanstack,
  "quiz-kids-app": quiz,
  "design-portfolio": design,
};

export const HOST_ART: Record<string, string> = {
  vercel,
  cloudflare,
  namecheap: domains,
  prototype: prototypeArt,
  netlify: cloudflare,
};

// Deterministic fallback art for any unmapped app id — cycles cinematic posters.
const FALLBACK_POOL = [appleNotes, forma, dashboard, telugu, tanstack, quiz, design];
export function artFor(id: string): string {
  if (APP_ART[id]) return APP_ART[id];
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) | 0;
  return FALLBACK_POOL[Math.abs(h) % FALLBACK_POOL.length];
}
