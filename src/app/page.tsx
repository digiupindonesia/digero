"use client";

import * as React from "react";
// (opsional) ganti ke icon favoritmu; lucide-react dipakai krn ringan
import { Mail, Lock, Eye, EyeOff, Github } from "lucide-react";
import strengthText from "@/utils/strengthText";
import strengthColor from "@/utils/strengthColor";
import calcStrength from "@/utils/calcStrength";

type Toast = { id: number; type: "success" | "error" | "info"; text: string };

export default function Home() {
  const [tab, setTab] = React.useState<"login" | "register">("login");

  // visibilitas password
  const [showLoginPass, setShowLoginPass] = React.useState(false);
  const [showRegPass, setShowRegPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

  // register state
  const [regPassword, setRegPassword] = React.useState("");
  const strength = React.useMemo(
    () => calcStrength(regPassword),
    [regPassword]
  );

  // toast sederhana
  const [toasts, setToasts] = React.useState<Toast[]>([]);
  const pushToast = (text: string, type: Toast["type"]) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, text, type }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4500);
  };

  const onSubmitLogin: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    if (!email || !password) return;
    pushToast("Logging in...", "info");
    setTimeout(
      () => pushToast("Login successful! Welcome back.", "success"),
      1200
    );
  };

  const onSubmitRegister: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") || "");
    const password = String(fd.get("password") || "");
    const confirm = String(fd.get("confirm") || "");
    if (!email || !password || !confirm) return;
    if (password !== confirm)
      return pushToast("Passwords do not match!", "error");
    pushToast("Creating account...", "info");
    setTimeout(() => {
      pushToast("Account created! Please verify your email.", "success");
      setTab("login");
    }, 1200);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-zinc-950 to-zinc-900 flex items-center justify-center p-4 text-white">
      {/* pola radial amber tipis */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,#f59e0b_0%,transparent_40%),radial-gradient(circle_at_75%_75%,#f59e0b_0%,transparent_40%)]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight drop-shadow-[0_0_20px_rgba(245,158,11,0.35)]">
            DIGERO
          </h1>
          <p className="text-amber-400 text-sm tracking-[0.25em]">
            WHITELIST ACCOUNT
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-zinc-900/70 backdrop-blur-md p-6 sm:p-8 shadow-2xl ring-1 ring-amber-500/20">
          {/* Tabs */}
          <div className="mb-6 flex rounded-lg bg-zinc-950 p-1">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={[
                "flex-1 py-2 rounded-md text-sm font-medium transition-all",
                tab === "login"
                  ? "bg-amber-400 text-zinc-950 shadow"
                  : "text-zinc-400 hover:text-white",
              ].join(" ")}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setTab("register")}
              className={[
                "flex-1 py-2 rounded-md text-sm font-medium transition-all",
                tab === "register"
                  ? "bg-amber-400 text-zinc-950 shadow"
                  : "text-zinc-400 hover:text-white",
              ].join(" ")}
            >
              Register
            </button>
          </div>

          {/* Login Form */}
          {tab === "login" && (
            <form
              onSubmit={onSubmitLogin}
              className="space-y-5 animate-[slideIn_0.25s_ease-out]"
            >
              <Field>
                <Icon>
                  <Mail className="h-4 w-4" />
                </Icon>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Field>

              <Field>
                <Icon>
                  <Lock className="h-4 w-4" />
                </Icon>
                <Input
                  name="password"
                  type={showLoginPass ? "text" : "password"}
                  placeholder="Enter your password"
                  required
                />
                <Toggle
                  onClick={() => setShowLoginPass((s) => !s)}
                  shown={showLoginPass}
                />
              </Field>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-zinc-300">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500"
                  />
                  Remember me
                </label>
                <a
                  className="text-sm text-amber-400 hover:text-amber-500"
                  href="#"
                >
                  Forgot password?
                </a>
              </div>

              <Button type="submit" className="w-full">
                Sign In
              </Button>
            </form>
          )}

          {/* Register Form */}
          {tab === "register" && (
            <form
              onSubmit={onSubmitRegister}
              className="space-y-5 animate-[slideIn_0.25s_ease-out]"
            >
              <Field>
                <Icon>
                  <Mail className="h-4 w-4" />
                </Icon>
                <Input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Field>

              <Field>
                <Icon>
                  <Lock className="h-4 w-4" />
                </Icon>
                <Input
                  name="password"
                  type={showRegPass ? "text" : "password"}
                  placeholder="Create password"
                  required
                  onChange={(e) => setRegPassword(e.target.value)}
                />
                <Toggle
                  onClick={() => setShowRegPass((s) => !s)}
                  shown={showRegPass}
                />
              </Field>

              <Field>
                <Icon>
                  <Lock className="h-4 w-4" />
                </Icon>
                <Input
                  name="confirm"
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Confirm password"
                  required
                />
                <Toggle
                  onClick={() => setShowConfirmPass((s) => !s)}
                  shown={showConfirmPass}
                />
              </Field>

              {/* Password strength */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-zinc-300">
                    Password Strength
                  </span>
                  <span className="text-sm text-zinc-400">
                    {strengthText(strength)}
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden">
                  <div
                    className={`h-full ${strengthColor(
                      strength
                    )} transition-all duration-300`}
                    style={{ width: `${strength}%` }}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-sm text-zinc-300">
                <input
                  type="checkbox"
                  required
                  className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-500 focus:ring-amber-500"
                />
                I agree to the
                <a className="text-amber-400 hover:text-amber-500" href="#">
                  Terms of Service
                </a>
                and
                <a className="text-amber-400 hover:text-amber-500" href="#">
                  Privacy Policy
                </a>
              </label>

              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
          )}

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="h-px flex-1 bg-zinc-800" />
            <span className="text-sm text-zinc-400">or</span>
            <div className="h-px flex-1 bg-zinc-800" />
          </div>

          {/* Social login (dummy) */}
          <div className="space-y-3">
            <button className="w-full inline-flex items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm hover:bg-zinc-900 transition">
              <Mail className="h-4 w-4 text-red-500" /> Continue with Google
            </button>
            <button className="w-full inline-flex items-center justify-center gap-3 rounded-lg border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm hover:bg-zinc-900 transition">
              <Github className="h-4 w-4" /> Continue with GitHub
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-zinc-400">
          © {new Date().getFullYear()} DIGERO. All rights reserved.
        </p>
      </div>

      {/* Toasts */}
      <div className="pointer-events-none fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={[
              "pointer-events-auto rounded-lg px-4 py-2 shadow-lg transition",
              t.type === "success" && "bg-green-500",
              t.type === "error" && "bg-red-500",
              t.type === "info" && "bg-blue-500",
            ].join(" ")}
          >
            {t.text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Small UI primitives (Tailwind-only) ---------- */

function Field({ children }: { children: React.ReactNode }) {
  return <div className="relative group">{children}</div>;
}

function Icon({ children }: { children: React.ReactNode }) {
  return (
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400 group-focus-within:text-amber-400 transition-colors">
      {children}
    </div>
  );
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;
function Input(props: InputProps) {
  const { className = "", ...rest } = props;
  return (
    <input
      {...rest}
      className={[
        "w-full rounded-lg bg-zinc-950 border border-zinc-800 text-white",
        "pl-10 pr-12 py-3 placeholder:text-zinc-500",
        "outline-none ring-0 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30",
        "transition-all",
        className,
      ].join(" ")}
    />
  );
}

function Toggle({ onClick, shown }: { onClick: () => void; shown: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-400 hover:text-amber-400 transition"
      aria-label={shown ? "Hide password" : "Show password"}
    >
      {shown ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
  );
}

function Button({
  children,
  className = "",
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...rest}
      className={[
        "inline-flex items-center justify-center rounded-lg",
        "bg-amber-400 text-zinc-950 font-semibold",
        "px-4 py-3 hover:bg-amber-500",
        "shadow-md hover:shadow-amber-500/30 -translate-y-0 hover:-translate-y-0.5",
        "transition-all",
        className,
      ].join(" ")}
    >
      {children}
    </button>
  );
}
