"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Logo from "@/app/components/Logo";

export default function AdminLogin() {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];
  const router = useRouter();

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pin];
    newPin[index] = value.slice(-1);
    setPin(newPin);
    setError("");
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
    if (newPin.every((digit) => digit !== "") && index === 3) {
      handleSubmit(newPin.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleSubmit = async (pinValue: string) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "1234";
    if (pinValue === correctPin) {
      sessionStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect PIN. Please try again.");
      setPin(["", "", "", ""]);
      inputRefs[0].current?.focus();
    }
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-[#EDFFF5] flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-fadeInUp">
          <div className="flex justify-center mb-6"><Logo /></div>
          <h1 className="text-[32px] md:text-[42px] font-bold text-black mb-2">Admin Access</h1>
          <p className="text-gray-600">Enter your 4-digit PIN to continue</p>
        </div>
        <div className="bg-white rounded-2xl border-2 border-green-100 p-8 shadow-xl animate-fadeInUp stagger-1">
          <div className="flex justify-center gap-3 sm:gap-4 mb-6">
            {pin.map((digit, index) => (
              <input key={index} ref={inputRefs[index]} type="text" inputMode="numeric" maxLength={1} value={digit} onChange={(e) => handleChange(index, e.target.value)} onKeyDown={(e) => handleKeyDown(index, e)} disabled={isSubmitting} className="w-14 h-14 sm:w-16 sm:h-16 text-center text-2xl font-bold bg-[#EDFFF5] border-2 border-green-100 rounded-xl focus:border-green-200 focus:scale-105 focus:outline-none transition-all duration-300 disabled:opacity-50" />
            ))}
          </div>
          {error && <p className="text-red-500 text-center text-sm mb-4 animate-fadeInUp">{error}</p>}
          <button onClick={() => handleSubmit(pin.join(""))} disabled={pin.some((d) => !d) || isSubmitting} className="w-full py-3 bg-green-200 text-white rounded-lg font-medium hover:bg-green-100 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {isSubmitting ? "Logging in..." : "Log In"}
          </button>
        </div>
      </div>
    </div>
  );
}