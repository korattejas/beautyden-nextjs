"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  HiUser, 
  HiEnvelope, 
  HiPhone, 
  HiMapPin, 
  HiChatBubbleBottomCenterText,
  HiSparkles,
  HiCheckCircle
} from "react-icons/hi2";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { submitBeauticianInquiryForm } from "@/services/beauticianInquiry.service";
import { BeauticianInquiryFormData } from "@/services/beauticianInquiry.service";

const EnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    experience_years: "",
    address: "",
    bio: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const payload: BeauticianInquiryFormData = {
        name: formData.name,
        phone: formData.phone,
        experience_years: formData.experience_years,
        address: formData.address,
        bio: formData.bio
      };
      
      await submitBeauticianInquiryForm(payload);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          name: "",
          phone: "",
          experience_years: "",
          address: "",
          bio: ""
        });
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      setIsSubmitting(false);
      alert("Failed to submit form. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,105,180,0.15),_transparent_55%)]" />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-primary shadow-sm">
              <HiSparkles className="h-4 w-4" />
              Join Our Team
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              Become a Beautician
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Join our team of professional beauticians. Fill out the form below and our team will contact you soon.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto bg-green-50 border border-green-200 rounded-3xl p-8 text-center"
            >
              <HiCheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-green-600 mb-4">
                Application Submitted Successfully!
              </h3>
              <p className="text-green-700 text-lg">
                Thank you for your application. Our team will review your request and get back to you soon.
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <div className="bg-white rounded-3xl shadow-xl border border-border overflow-hidden">
                <div className="p-6 sm:p-8 md:p-10">
                  <div className="text-center mb-8">
                    <h2 className="font-heading text-2xl font-bold text-foreground mb-2">
                      Beautician Application
                    </h2>
                    <p className="text-foreground/60">
                      Fill out the form below and our team will contact you soon
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Full Name *
                      </label>
                      <div className="relative">
                        <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 border-border focus:border-primary"
                          placeholder="Enter your full name"
                        />
                      </div>
                    </div>

                    {/* Email & Phone */}
                    <div className="grid md:grid-cols-2 gap-6">

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <HiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 border-border focus:border-primary"
                            placeholder="9876543210"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-3">
                          Years of Experience *
                        </label>
                        <div className="relative">
                          <HiSparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                          <input
                            type="number"
                            name="experience_years"
                            value={formData.experience_years || ""}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 border-border focus:border-primary"
                            placeholder="Years of experience"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Address Field */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Address *
                      </label>
                      <div className="relative">
                        <HiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 border-border focus:border-primary"
                          placeholder="Your full address"
                        />
                      </div>
                    </div>

                    {/* Bio Field */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-3">
                        Bio *
                      </label>
                      <div className="relative">
                        <HiChatBubbleBottomCenterText className="absolute left-4 top-6 w-5 h-5 text-foreground/40" />
                        <textarea
                          name="bio"
                          value={formData.bio}
                          onChange={handleChange}
                          required
                          rows={5}
                          className="w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none border-border focus:border-primary"
                          placeholder="Tell us about your skills, expertise, and why you'd be a great addition to our team"
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full justify-center"
                        size="lg"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-3">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Submitting Application...
                          </div>
                        ) : (
                          "Submit Application"
                        )}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>

              <div className="mt-10 text-center text-sm text-foreground/60">
                <p>We respect your privacy. Your information will only be used to process your application.</p>
              </div>
            </motion.div>
          )}
        </Container>
      </section>
    </div>
  );
};

export default EnquiryForm;