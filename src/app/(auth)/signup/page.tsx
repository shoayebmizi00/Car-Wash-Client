"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { signIn, signUp } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

// Brand icons (lucide removed brand icons, so we use small inline svgs)
const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4">
    <path
      fill="#4285F4"
      d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"
    />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  // Password rules for the live checklist
  const passwordChecks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "One uppercase letter (A-Z)", ok: /[A-Z]/.test(password) },
    { label: "One lowercase letter (a-z)", ok: /[a-z]/.test(password) },
    { label: "One number (0-9)", ok: /[0-9]/.test(password) },
  ];

  // How many rules are passing right now (0 to 4)
  const passedCount = passwordChecks.filter((check) => check.ok).length;

  // Strength text and color based on passed rules
  const strengthLabel =
    passedCount <= 1 ? "Weak" : passedCount <= 3 ? "Medium" : "Strong";
  const strengthBarColor =
    passedCount <= 1
      ? "bg-red-500"
      : passedCount <= 3
        ? "bg-[#ffc20e]"
        : "bg-green-500";
  const strengthTextColor =
    passedCount <= 1
      ? "text-red-500"
      : passedCount <= 3
        ? "text-[#ffc20e]"
        : "text-green-600";

  // Email + password sign up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      password: String(formData.get("password") || ""),
      image: String(formData.get("image") || ""),
    };

    const result = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      image: data.image,
      callbackURL: "/",
    });

    // Check passwords match before sending
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Every password rule must pass
    const allChecksPassed = passwordChecks.every((check) => check.ok);

    if (!allChecksPassed) {
      setError(
        "Password must be at least 8 characters and contain one uppercase letter, one lowercase letter, and one number.",
      );
      return;
    }

    setLoading(false);

    //check if the account already created show error message and if not then show success message
    if (result.error) {
      const errorMessage =
        result.error.message || result.error.statusText || "Sign up failed.";
      setError(errorMessage);
      toast.add({
        title: "Error",
        description: errorMessage,
        type: "destructive",
      });
    } else {
      toast.add({
        title: "Success",
        description: "Account created successfully!",
        type: "success",
      });
    }
    router.push("/");
  };

  // Google sign up
  const handleGoogle = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  // Github sign up
  const handleGithub = async () => {
    await signIn.social({
      provider: "github",
      callbackURL: "/",
    });
  };

  return (
    <div className="min-h-screen bg-[#0d1526] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#f5f4ef] rounded-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-14 h-14 rounded-full bg-[#4a3f8f] ring-2 ring-white/10 flex items-center justify-center text-2xl">
            🚗
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1e2a4f] text-center mt-4">
          Create Account
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1">
          Sign up to get started with Cleanify
        </p>

        {/* Social sign up */}
        <div className="flex flex-col gap-3 mt-6">
          <Button
            variant="outline"
            onClick={handleGoogle}
            className="w-full h-10 bg-white border-gray-300 text-[#1e2a4f] gap-2"
          >
            <GoogleIcon />
            Continue with Google
          </Button>
          <Button
            variant="outline"
            onClick={handleGithub}
            className="w-full h-10 bg-white border-gray-300 text-[#1e2a4f] gap-2"
          >
            <GithubIcon />
            Continue with GitHub
          </Button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Name + email + password form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium text-[#1e2a4f] block mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-[#1e2a4f] outline-none focus:border-[#ffc20e] focus:ring-2 focus:ring-[#ffc20e]/30"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#1e2a4f] block mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-[#1e2a4f] outline-none focus:border-[#ffc20e] focus:ring-2 focus:ring-[#ffc20e]/30"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-[#1e2a4f] block mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-[#1e2a4f] outline-none focus:border-[#ffc20e] focus:ring-2 focus:ring-[#ffc20e]/30"
              />

              {/* Eye button to show/hide password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e2a4f]"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Strength meter - only shows when typing */}
            {password.length > 0 && (
              <div className="mt-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">
                    Password strength
                  </span>
                  <span className={`text-xs font-bold ${strengthTextColor}`}>
                    {strengthLabel}
                  </span>
                </div>
                <div className="flex gap-1">
                  <div
                    className={`h-1 flex-1 rounded-full ${passedCount >= 1 ? strengthBarColor : "bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-1 flex-1 rounded-full ${passedCount >= 2 ? strengthBarColor : "bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-1 flex-1 rounded-full ${passedCount >= 3 ? strengthBarColor : "bg-gray-200"}`}
                  ></div>
                  <div
                    className={`h-1 flex-1 rounded-full ${passedCount >= 4 ? strengthBarColor : "bg-gray-200"}`}
                  ></div>
                </div>

                {/* Live rule checklist */}
                <div className="grid grid-cols-2 gap-x-3 gap-y-1 mt-2">
                  {passwordChecks.map((check) => (
                    <div
                      key={check.label}
                      className={`flex items-center gap-1 text-xs ${
                        check.ok ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      {check.ok ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <X className="w-3 h-3" />
                      )}
                      <span>{check.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-[#1e2a4f] block mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm text-[#1e2a4f] outline-none focus:border-[#ffc20e] focus:ring-2 focus:ring-[#ffc20e]/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#1e2a4f]"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          {/* Error message */}
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          {/* Taking image url */}
          <div>
            <label className="text-sm font-medium text-[#1e2a4f] block mb-1">
              Profile Image URL
            </label>
            <input
              type="text"
              name="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.png"
              className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-[#1e2a4f] outline-none focus:border-[#ffc20e] focus:ring-2 focus:ring-[#ffc20e]/30"
            />
          </div>

          {/* Submit button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full h-10 bg-[#ffc20e] hover:bg-[#e6ae0c] text-white"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        {/* Go to sign in */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-[#1e2a4f] font-semibold hover:text-[#ffc20e]"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
