import { useRouterState } from "@tanstack/react-router";
import type { User } from "@supabase/supabase-js";
import {
  BarChart3,
  Check,
  ChevronDown,
  Clock3,
  LogIn,
  LogOut,
  Mail,
  ShieldCheck,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";
import {
  createContext,
  type FormEvent,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { trackEvent } from "@/lib/analytics";
import {
  getSupabaseClient,
  isAuthRedirectConfigured,
  isSupabaseConfigured,
} from "@/lib/supabase";

const FIRST_PROMPT_DELAY = 5 * 60 * 1000;
const REMINDER_DELAY = 60 * 1000;
const NEXT_PROMPT_KEY = "mathdreams.next-signin-prompt";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function friendlyAuthError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("invalid login credentials")) return "Email or password is incorrect.";
  if (normalized.includes("email not confirmed"))
    return "Please confirm your email before signing in.";
  if (normalized.includes("already registered") || normalized.includes("already been registered"))
    return "An account already exists for this email. Try signing in instead.";
  if (normalized.includes("valid email")) return "Enter a valid email address.";
  if (normalized.includes("password") && normalized.includes("characters"))
    return "Password must be at least 8 characters.";
  if (normalized.includes("rate limit")) return "Too many attempts. Please wait a minute and try again.";
  return message;
}

type AccessContextValue = {
  user: User | null;
  loading: boolean;
  openSignIn: () => void;
  signOut: () => Promise<void>;
};

const AccessContext = createContext<AccessContextValue | null>(null);

export function useVisitorAccess() {
  const value = useContext(AccessContext);
  if (!value) throw new Error("useVisitorAccess must be used inside VisitorAccessProvider");
  return value;
}

export function VisitorAccessProvider({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (state) => state.location.pathname });
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [prompted, setPrompted] = useState(false);
  const promptTimer = useRef<number | null>(null);
  const activeStartedAt = useRef<number | null>(null);
  const activeSeconds = useRef(0);

  const schedulePrompt = useCallback((delay: number) => {
    window.sessionStorage.setItem(NEXT_PROMPT_KEY, String(Date.now() + delay));
    if (promptTimer.current) window.clearTimeout(promptTimer.current);
    promptTimer.current = window.setTimeout(() => {
      setPrompted(true);
      setModalOpen(true);
      void trackEvent("sign_in_prompt_shown", { metadata: { trigger: "timer" } });
    }, delay);
  }, []);

  useEffect(() => {
    const client = getSupabaseClient();
    if (!client) {
      setLoading(false);
      return;
    }

    void client.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const { data } = client.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (session?.user) {
        setModalOpen(false);
        window.sessionStorage.removeItem(NEXT_PROMPT_KEY);
        if (event === "SIGNED_IN") {
          void trackEvent("sign_in_completed", {
            metadata: { provider: session.user.app_metadata.provider ?? "email" },
          });
        }
      }
    });

    return () => data.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (loading || user) return;
    const saved = Number(window.sessionStorage.getItem(NEXT_PROMPT_KEY));
    const delay = saved > Date.now() ? saved - Date.now() : FIRST_PROMPT_DELAY;
    schedulePrompt(delay);

    if (import.meta.env.DEV && new URLSearchParams(window.location.search).has("previewSignIn")) {
      setPrompted(true);
      setModalOpen(true);
    }

    return () => {
      if (promptTimer.current) window.clearTimeout(promptTimer.current);
    };
  }, [loading, schedulePrompt, user]);

  useEffect(() => {
    void trackEvent("page_view", { path });
  }, [path]);

  useEffect(() => {
    const flushActiveTime = (resume = false) => {
      if (activeStartedAt.current !== null) {
        activeSeconds.current += Math.round((Date.now() - activeStartedAt.current) / 1000);
        activeStartedAt.current = null;
      }
      if (activeSeconds.current > 0) {
        const seconds = activeSeconds.current;
        activeSeconds.current = 0;
        void trackEvent("active_time", { durationSeconds: seconds });
      }
      if (resume && document.visibilityState === "visible") {
        activeStartedAt.current = Date.now();
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "visible") activeStartedAt.current = Date.now();
      else flushActiveTime();
    };

    activeStartedAt.current = document.visibilityState === "visible" ? Date.now() : null;
    const interval = window.setInterval(() => flushActiveTime(true), 30_000);
    const onPageHide = () => flushActiveTime();

    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("pagehide", onPageHide);

    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("pagehide", onPageHide);
      flushActiveTime();
    };
  }, []);

  const openSignIn = useCallback(() => {
    setPrompted(false);
    setModalOpen(true);
    void trackEvent("sign_in_opened", { metadata: { trigger: "header" } });
  }, []);

  const dismiss = useCallback(() => {
    setModalOpen(false);
    void trackEvent("sign_in_prompt_dismissed", { metadata: { prompted } });
    if (!user && prompted) schedulePrompt(REMINDER_DELAY);
  }, [prompted, schedulePrompt, user]);

  const signOut = useCallback(async () => {
    await getSupabaseClient()?.auth.signOut();
    setUser(null);
    schedulePrompt(FIRST_PROMPT_DELAY);
    void trackEvent("signed_out");
  }, [schedulePrompt]);

  const value = useMemo(
    () => ({ user, loading, openSignIn, signOut }),
    [loading, openSignIn, signOut, user],
  );

  return (
    <AccessContext.Provider value={value}>
      {children}
      <SignInModal open={modalOpen} prompted={prompted} onDismiss={dismiss} />
    </AccessContext.Provider>
  );
}

export function AccountButton() {
  const { user, loading, openSignIn, signOut } = useVisitorAccess();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const close = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [menuOpen]);

  if (!user) {
    return (
      <button
        type="button"
        onClick={openSignIn}
        disabled={loading}
        className="ml-1 inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02] disabled:opacity-60 sm:px-4"
      >
        <LogIn className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Sign in</span>
        <span className="sr-only sm:hidden">Sign in</span>
      </button>
    );
  }

  const label = user.user_metadata.full_name || user.email || "My account";
  const initial = label.slice(0, 1).toUpperCase();

  return (
    <div ref={menuRef} className="relative ml-1 shrink-0">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        className="flex h-10 items-center gap-1.5 rounded-full bg-primary p-1 pr-2 text-primary-foreground shadow-glow"
        aria-expanded={menuOpen}
        aria-haspopup="menu"
      >
        <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-white/25 text-sm font-bold">
          {user.user_metadata.avatar_url ? (
            <img src={user.user_metadata.avatar_url} alt="" className="h-full w-full object-cover" />
          ) : (
            initial
          )}
        </span>
        <ChevronDown className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Open account menu</span>
      </button>
      {menuOpen && (
        <div
          role="menu"
          className="glass absolute right-0 top-12 z-50 w-64 rounded-2xl p-2 shadow-soft"
        >
          <div className="min-w-0 px-3 py-2">
            <p className="truncate text-sm font-semibold">{label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Full access · activity connected</p>
          </div>
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              setMenuOpen(false);
              void signOut();
            }}
            className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-destructive transition hover:bg-white/50"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
          </button>
        </div>
      )}
    </div>
  );
}

function SignInModal({
  open,
  prompted,
  onDismiss,
}: {
  open: boolean;
  prompted: boolean;
  onDismiss: () => void;
}) {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    document.body.style.overflow = "hidden";
    const focusFrame = window.requestAnimationFrame(() => emailRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onDismiss();
        return;
      }

      if (event.key !== "Tab") return;
      const focusable = Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.getClientRects().length > 0);
      if (focusable.length === 0) {
        event.preventDefault();
        dialogRef.current?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus();
    };
  }, [onDismiss, open]);

  if (!open) return null;

  async function signInWithGoogle() {
    if (!isAuthRedirectConfigured) {
      return setError("Google sign-in is paused until MathDreams return URLs are verified.");
    }
    const client = getSupabaseClient();
    if (!client) return setError("Sign-in needs Supabase environment variables before it can go live.");
    setBusy(true);
    setError("");
    const { error: oauthError } = await client.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.href.split("?")[0] },
    });
    if (oauthError) {
      setError(oauthError.message);
      setBusy(false);
    }
  }

  async function submitEmail(event: FormEvent) {
    event.preventDefault();
    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(cleanEmail)) {
      setError("Enter a valid email address, like parent@example.com.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (mode === "signup" && !isAuthRedirectConfigured) {
      setError("Account creation is paused until MathDreams return URLs are verified.");
      return;
    }
    const client = getSupabaseClient();
    if (!client) return setError("Sign-in needs Supabase environment variables before it can go live.");
    setBusy(true);
    setError("");
    setMessage("");

    const result =
      mode === "signin"
        ? await client.auth.signInWithPassword({ email: cleanEmail, password })
        : await client.auth.signUp({
            email: cleanEmail,
            password,
            options: { emailRedirectTo: window.location.href.split("?")[0] },
          });

    if (result.error) setError(friendlyAuthError(result.error.message));
    else if (mode === "signup" && !result.data.session)
      setMessage("Check your email to confirm your new account.");
    setBusy(false);
  }

  async function resetPassword() {
    const cleanEmail = email.trim().toLowerCase();
    if (!EMAIL_PATTERN.test(cleanEmail)) {
      setError("Enter your valid email address first, then choose Forgot password.");
      return;
    }
    if (!isAuthRedirectConfigured) {
      setError("Password reset is paused until MathDreams return URLs are verified.");
      return;
    }
    const client = getSupabaseClient();
    if (!client) return setError("Sign-in needs Supabase environment variables before it can go live.");
    setBusy(true);
    setError("");
    setMessage("");
    const { error: resetError } = await client.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: window.location.href.split("?")[0],
    });
    if (resetError) setError(friendlyAuthError(resetError.message));
    else setMessage("Password reset email sent. Check your inbox.");
    setBusy(false);
  }

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-ink/55 p-3 backdrop-blur-sm sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="signin-title"
        aria-describedby="signin-description"
        tabIndex={-1}
        className="my-auto grid w-full max-w-3xl overflow-hidden rounded-[1.75rem] bg-background shadow-2xl sm:rounded-[2.25rem] md:grid-cols-[0.82fr_1.18fr]"
      >
        <div className="relative hidden overflow-hidden bg-primary p-8 text-primary-foreground md:flex md:flex-col md:justify-between">
          <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-secondary/35 blur-2xl" />
          <div className="relative">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-2xl">
              ✨
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold">Keep the magic going.</h2>
            <p className="mt-3 text-sm leading-6 text-primary-foreground/80">
              A free account helps us learn which lessons are useful and gives you a familiar
              welcome on your next visit.
            </p>
          </div>
          <div className="relative space-y-3 text-sm">
            <Benefit icon={Clock3}>A familiar welcome on future visits</Benefit>
            <Benefit icon={BarChart3}>Help shape the lessons we build next</Benefit>
            <Benefit icon={ShieldCheck}>No payment details, ever</Benefit>
          </div>
        </div>

        <div className="relative max-h-[calc(100dvh-1.5rem)] overflow-y-auto p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] sm:p-8">
          <button
            type="button"
            onClick={onDismiss}
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-muted-foreground transition hover:bg-muted hover:text-foreground"
            aria-label="Close sign-in and continue exploring"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="pr-11">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary md:hidden">
              <Sparkles className="h-4 w-4" /> MathDreams
            </div>
            <h2 id="signin-title" className="mt-2 font-display text-2xl font-bold sm:text-3xl">
              {prompted ? "Enjoying MathDreams?" : mode === "signin" ? "Welcome back" : "Join MathDreams"}
            </h2>
            <p id="signin-description" className="mt-2 text-sm leading-6 text-muted-foreground">
              {prompted
                ? "Sign in for the full experience, or keep exploring as a guest."
                : "Use a parent or guardian account to continue."}
            </p>
          </div>

          <div className="mt-5 grid grid-cols-2 rounded-full bg-muted p-1 text-sm font-semibold">
            {(["signin", "signup"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setMode(item);
                  setError("");
                  setMessage("");
                }}
                className={`rounded-full px-3 py-2 transition ${mode === item ? "bg-background shadow-sm" : "text-muted-foreground"}`}
              >
                {item === "signin" ? "Sign in" : "Create account"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => void signInWithGoogle()}
            disabled={busy || !isAuthRedirectConfigured}
            className="mt-4 flex min-h-11 w-full items-center justify-center gap-2 rounded-full border bg-white/70 px-4 text-sm font-semibold transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-55"
          >
            <span className="text-base font-bold text-[#4285f4]">G</span>
            Continue with Google
          </button>

          <div className="my-4 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> or use email <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={submitEmail} noValidate className="space-y-3">
            <label className="block text-sm font-semibold">
              Email
              <span className="relative mt-1.5 block">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  ref={emailRef}
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="parent@example.com"
                  className="h-12 w-full rounded-2xl border bg-white/60 pl-10 pr-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </span>
            </label>
            <label className="block text-sm font-semibold">
              Password
              <span className="relative mt-1.5 block">
                <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password"
                  autoComplete={mode === "signin" ? "current-password" : "new-password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 8 characters"
                  className="h-12 w-full rounded-2xl border bg-white/60 pl-10 pr-3 text-base outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/15"
                />
              </span>
            </label>

            {mode === "signin" && (
              <button
                type="button"
                onClick={() => void resetPassword()}
                disabled={busy}
                className="block w-full text-right text-xs font-semibold text-primary hover:underline disabled:opacity-50"
              >
                Forgot password?
              </button>
            )}

            {error && <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
            {message && <p className="flex items-center gap-2 rounded-xl bg-primary/10 px-3 py-2 text-sm text-primary"><Check className="h-4 w-4" />{message}</p>}
            {!isSupabaseConfigured && (
              <p className="rounded-xl bg-secondary/20 px-3 py-2 text-xs text-foreground/75">
                Preview mode: connect the dedicated MathDreams Supabase project to activate accounts and analytics.
              </p>
            )}
            {isSupabaseConfigured && !isAuthRedirectConfigured && (
              <p className="rounded-xl bg-secondary/20 px-3 py-2 text-xs text-foreground/75">
                Google, account creation, and password reset stay paused until MathDreams return URLs are verified.
              </p>
            )}

            <button
              type="submit"
              disabled={busy || !isSupabaseConfigured || (mode === "signup" && !isAuthRedirectConfigured)}
              className="flex min-h-12 w-full items-center justify-center rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground shadow-glow transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-55"
            >
              {busy ? "One moment…" : mode === "signin" ? "Sign in" : "Create free account"}
            </button>
          </form>

          <button
            type="button"
            onClick={onDismiss}
            className="mt-3 w-full rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground transition hover:bg-muted hover:text-foreground"
          >
            Continue exploring as a guest
          </button>
          <p className="mt-2 text-center text-[11px] leading-4 text-muted-foreground">
            For parents and guardians. Guest browsing is always available.
          </p>
        </div>
      </div>
    </div>
  );
}

function Benefit({
  icon: Icon,
  children,
}: {
  icon: typeof Clock3;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-white/15">
        <Icon className="h-4 w-4" />
      </span>
      <span>{children}</span>
    </div>
  );
}
