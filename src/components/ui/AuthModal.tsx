"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { HiXMark, HiDevicePhoneMobile, HiCheckCircle, HiShieldCheck } from "react-icons/hi2";
import { sendOtp, verifyOtp } from "@/services/customer.service";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const otpRefs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("phone");
        setPhone("");
        setOtpDigits(["", "", "", "", "", ""]);
        setError(null);
        setIsLoading(false);
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

  const handleRequestOtp = async () => {
    if (!isPhoneValid) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await sendOtp({ mobile_number: phone });
      
      if (response.status && (response.code === 200 || response.code === 201)) {
        setStep("otp");
      } else {
        setError(response.message || "Failed to send OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("Error sending OTP:", err);
      const errorMessage = err?.response?.data?.message || err?.message || "Failed to send OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!isOtpValid) return;
    
    setIsLoading(true);
    setError(null);
    
    const otp = otpDigits.join("");
    
    try {
      const response = await verifyOtp({ 
        mobile_number: phone, 
        otp: otp 
      });
      
      if (response.status && (response.code === 200 || response.code === 201)) {
        try {
          localStorage.setItem("bd_isLoggedIn", "true");
          localStorage.setItem("bd_mobile_number", phone);
          // Store token from response
          if (response.data?.token) {
            localStorage.setItem("bd_auth_token", response.data.token);
          }
        } catch {}
        // notify other parts of the app immediately
        try {
          window.dispatchEvent(new CustomEvent("bd-auth-changed"));
        } catch {}
        onLoggedIn();
        onClose();
        router.push("/customer/account");
      } else {
        setError(response.message || "Invalid OTP. Please try again.");
      }
    } catch (err: any) {
      console.error("Error verifying OTP:", err);
      const errorMessage = err?.response?.data?.message || err?.message || "Invalid OTP. Please try again.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 overflow-y-auto"
            initial={{ opacity: 0, scale: 0.98, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) onClose();
            }}
          >
            <div className="relative w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 my-auto">
              {/* Left promo panel (desktop) */}
              <div className="hidden md:flex flex-col gap-6 bg-black text-white p-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <HiShieldCheck className="w-6 h-6 text-black" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-white">Hello again!</p>
                    <p className="text-xs text-white/80">Exciting offer waiting for you</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-5 text-sm text-white">
                  <li className="flex gap-3">
                    <span className="mt-1 text-white/60">•</span>
                    <span>Enjoy hassle-free shopping with the best offers applied for you</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 text-white/60">•</span>
                    <span>Explore unbeatable prices and unmatchable value</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 text-white/60">•</span>
                    <span>100% secure & spam free, we will not annoy you</span>
                  </li>
                </ul>
              </div>

              {/* Right form panel */}
              <div className="relative p-6 md:p-8 flex flex-col">
                <button
                  onClick={onClose}
                  className="absolute right-3 top-3 p-2 rounded-md text-gray-500 hover:bg-gray-100 transition-colors z-10"
                  aria-label="Close"
                >
                  <HiXMark className="w-5 h-5" />
                </button>

                {step === "phone" && (
                  <div className="space-y-5 w-full max-w-sm mx-auto">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Login with Phone</h2>
                      {error && (
                        <p className="text-xs text-red-600 mt-1">{error}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center justify-center gap-1.5 px-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-700 text-sm h-11 min-w-[85px] flex-shrink-0">
                        <span className="text-base">🇮🇳</span>
                        <span className="font-medium">+91</span>
                      </div>
                      <input
                        ref={phoneInputRef}
                        inputMode="numeric"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter phone number"
                        className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 h-11 transition-all min-w-0"
                      />
                    </div>

                    <label className="flex items-center gap-2 text-xs text-gray-600 select-none cursor-pointer">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary focus:ring-1 focus:ring-primary/20 cursor-pointer" />
                      Send me offers and updates
                    </label>

                    <Button
                      onClick={handleRequestOtp}
                      disabled={!isPhoneValid || isLoading}
                      className={`w-full flex items-center justify-center gap-2 h-11 text-sm ${isPhoneValid && !isLoading ? "" : "opacity-60 cursor-not-allowed"}`}
                    >
                      <HiDevicePhoneMobile className="w-4 h-4" />
                      {isLoading ? "Sending..." : "Login with Phone"}
                    </Button>

                    <p className="text-[11px] text-gray-500 leading-relaxed">
                      By Proceeding, I agree to my data being processed as per BeautyDen's
                      <span className="text-primary"> Privacy Policy</span>.
                    </p>
                  </div>
                )}

                {step === "otp" && (
                  <div className="space-y-5 w-full max-w-sm mx-auto">
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Verify OTP</h2>
                      <p className="text-xs text-gray-600">Sent to +91 {phone}</p>
                      {error && (
                        <p className="text-xs text-red-600 mt-1">{error}</p>
                      )}
                    </div>

                    <div className="flex items-center justify-center gap-2 md:gap-2.5 px-2 md:px-0">
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
                          className="w-10 h-12 md:w-11 md:h-14 text-center rounded-lg border-2 border-gray-200 text-base md:text-xl font-semibold tracking-widest focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none transition-all"
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <button 
                        className="text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={() => {
                          setStep("phone");
                          setError(null);
                        }}
                        disabled={isLoading}
                      >
                        Change number
                      </button>
                      <button 
                        className="hover:text-gray-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleRequestOtp}
                        disabled={isLoading}
                      >
                        Resend OTP
                      </button>
                    </div>

                    <Button
                      onClick={handleVerifyOtp}
                      disabled={!isOtpValid || isLoading}
                      className={`w-full flex items-center justify-center gap-2 h-11 text-sm ${isOtpValid && !isLoading ? "" : "opacity-60 cursor-not-allowed"}`}
                    >
                      <HiCheckCircle className="w-4 h-4" />
                      {isLoading ? "Verifying..." : "Verify & Continue"}
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


