"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreContext";
// 100% safe imports that exist in every version of lucide-react
import { Mail, User, Code } from "lucide-react"; 

export default function LoginPage() {
  const { login } = useStore();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login) {
      login({ name: email.split("@")[0] || "Student", email });
    }
    router.push("/");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground font-sans">
      <div className="w-full max-w-[400px] p-6">
        
        <h1 className="text-left text-2xl md:text-3xl font-bold mb-8 tracking-tight">
          Log in to your account
        </h1>

        {/* Udemy-Style Social Logins (Safe Icons) */}
        <div className="space-y-3 mb-6">
          <button className="w-full h-14 flex items-center justify-center gap-3 border border-border font-bold hover:bg-muted transition-colors">
            <Mail className="w-5 h-5" />
            Continue with Google
          </button>
          <button className="w-full h-14 flex items-center justify-center gap-3 border border-border font-bold hover:bg-muted transition-colors">
            <User className="w-5 h-5" />
            Continue with Apple
          </button>
          <button className="w-full h-14 flex items-center justify-center gap-3 border border-border font-bold hover:bg-muted transition-colors">
            <Code className="w-5 h-5" />
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-[1px] bg-border" />
          <span className="text-sm text-muted-foreground font-bold">or</span>
          <div className="flex-1 h-[1px] bg-border" />
        </div>

        {/* Email/Password Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-14 px-4 border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium placeholder:text-muted-foreground placeholder:font-normal"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-14 px-4 border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-medium placeholder:text-muted-foreground placeholder:font-normal"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-primary text-primary-foreground font-bold hover:opacity-90 transition-opacity mt-2"
          >
            Log in
          </button>
        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center text-sm flex flex-col gap-4">
          <div>
            <span className="text-foreground">Don't have an account? </span>
            <a href="#" className="font-bold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors">
              Sign up
            </a>
          </div>
          
          <a href="#" className="font-bold text-primary underline underline-offset-4 decoration-primary/30 hover:decoration-primary transition-colors">
            Log in with your organization
          </a>
        </div>

      </div>
    </main>
  );
}