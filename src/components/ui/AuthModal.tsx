"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { HiXMark, HiDevicePhoneMobile, HiCheckCircle, HiShieldCheck } from "react-icons/hi2";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onLoggedIn: () => void;
};

const phonePattern = /^\d{10}$/;

export default function AuthModal({ open, onClose, onLoggedIn }: AuthModalProps) {
  const router = useRouter();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("phone");
        setPhone("");
        setOtpDigits(["", "", "", "", "", ""]);
      }, 200);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => {
      if (step === "phone") phoneInputRef.current?.focus();
      if (step === "otp") otpRefs.current[0]?.focus();
    }, 150);
    return () => clearTimeout(t);
  }, [open, step]);

  const isPhoneValid = useMemo(() => phonePattern.test(phone), [phone]);
  const isOtpValid = useMemo(() => otpDigits.join("").length === 6, [otpDigits]);

  const handleRequestOtp = () => {
    if (!isPhoneValid) return;
    setStep("otp");
  };

  const handleVerifyOtp = () => {
    if (!isOtpValid) return;
    try {
      localStorage.setItem("bd_isLoggedIn", "true");
    } catch {}
    // notify other parts of the app immediately
    try {
      window.dispatchEvent(new CustomEvent("bd-auth-changed"));
    } catch {}
    onLoggedIn();
    onClose();
    router.push("/customer/account");
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[70] bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              {/* Left promo panel (desktop) */}
              <div className="hidden md:flex flex-col gap-4 bg-black text-white p-6">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-primary text-white grid place-items-center">
                    <HiShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Hello again!</p>
                    <p className="text-xs text-white/80">Exciting offer waiting for you</p>
                  </div>
                </div>
                <ul className="mt-2 space-y-4 text-sm text-white">
                  <li className="flex gap-3">
                    <span className="mt-1">•</span>
                    Enjoy hassle-free shopping with the best offers applied for you
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1">•</span>
                    Explore unbeatable prices and unmatchable value
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1">•</span>
                    100% secure & spam free, we will not annoy you
                  </li>
                </ul>
              </div>

              {/* Right form panel */}
              <div className="p-5 md:p-8">
                <button
                  onClick={onClose}
                  className="absolute right-3 top-3 p-2 rounded-md text-gray-500 hover:bg-gray-100"
                  aria-label="Close"
                >
                  <HiXMark className="w-5 h-5" />
                </button>

                {step === "phone" && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Login with Phone</p>
                    </div>

                    <div className="flex items-stretch gap-2 max-sm:flex-col">
                      <div className="flex items-center gap-2 px-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm max-sm:h-11">
                        <span>🇮🇳</span>
                        <span className="font-medium">+91</span>
                      </div>
                      <input
                        ref={phoneInputRef}
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter phone number"
                        className="flex-1 rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-primary max-sm:h-11"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-gray-600 select-none">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary" />
                      Send me offers and updates
                    </label>

                    <Button
                      onClick={handleRequestOtp}
                      className={`w-full flex items-center justify-center gap-2 ${isPhoneValid ? "" : "opacity-60 cursor-not-allowed"}`}
                    >
                      <HiDevicePhoneMobile className="w-4 h-4" />
                      Login with Phone
                    </Button>

                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      By Proceeding, I agree to my data being processed as per BeautyDen's
                      <span className="text-primary"> Privacy Policy</span>.
                    </p>
                  </div>
                )}

                {step === "otp" && (
                  <div className="space-y-5">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Verify OTP</p>
                      <p className="text-xs text-gray-600">Sent to +91 {phone}</p>
                    </div>

                    <div className="flex items-center justify-between gap-1">
                      {otpDigits.map((d, i) => (
                        <input
                          key={i}
                          ref={(el:any) => (otpRefs.current[i] = el)}
                          inputMode="numeric"
                          maxLength={1}
                          value={d}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            const next = [...otpDigits];
                            next[i] = val;
                            setOtpDigits(next);
                            if (val && i < 5) otpRefs.current[i + 1]?.focus();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace" && !otpDigits[i] && i > 0) {
                              otpRefs.current[i - 1]?.focus();
                            }
                          }}
                          className="w-11 h-12 sm:w-12 sm:h-14 text-center rounded-lg border border-gray-200 text-sm font-semibold tracking-widest focus:border-primary outline-none"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <button className="text-primary" onClick={() => setStep("phone")}>Change number</button>
                      <button className="hover:text-gray-900">Resend OTP</button>
                    </div>

                    <Button
                      onClick={handleVerifyOtp}
                      className={`w-full flex items-center justify-center gap-2 ${isOtpValid ? "" : "opacity-60 cursor-not-allowed"}`}
                    >
                      <HiCheckCircle className="w-4 h-4" />
                      Verify & Continue
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


