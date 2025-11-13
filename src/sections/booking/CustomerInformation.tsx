"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import {
  HiUser,
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiChatBubbleBottomCenterText,
  HiArrowLeft,
  HiArrowRight,
} from "react-icons/hi2";
import Button from "@/components/ui/Button";
import { BookingFormData } from "@/types/booking";

const customerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Minimum 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Minimum 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Please provide a complete address"),
  specialNotes: yup.string(),
});

interface CustomerInformationProps {
  formData: BookingFormData;
  onDataChange: (data: Partial<BookingFormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const CustomerInformation = ({
  formData,
  onDataChange,
  onNext,
  onPrev,
}: CustomerInformationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      specialNotes: formData.specialNotes,
    },
    mode: "onChange",
  });

  const onSubmit = (data: any) => {
    onDataChange({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      address: data.address,
      specialNotes: data.specialNotes,
    });
    onNext();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your Information
        </h2>
        <p className="text-foreground/60">
          Tell us about yourself so we can serve you better
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-primary/10 space-y-6"
      >
        {/* Name Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              First Name *
            </label>
            <div className="relative">
              <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
              <input
                {...register("firstName")}
                type="text"
                className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                  errors.firstName
                    ? "border-red-500"
                    : "border-primary/20 focus:border-primary"
                }`}
                placeholder="John"
                onChange={(e) => onDataChange({ firstName: e.target.value })}
              />
            </div>
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Last Name *
            </label>
            <div className="relative">
              <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
              <input
                {...register("lastName")}
                type="text"
                className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                  errors.lastName
                    ? "border-red-500"
                    : "border-primary/20 focus:border-primary"
                }`}
                placeholder="Doe"
                onChange={(e) => onDataChange({ lastName: e.target.value })}
              />
            </div>
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-2">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Contact Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Email Address *
            </label>
            <div className="relative">
              <HiEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
              <input
                {...register("email")}
                type="email"
                className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                  errors.email
                    ? "border-red-500"
                    : "border-primary/20 focus:border-primary"
                }`}
                placeholder="john@example.com"
                onChange={(e) => onDataChange({ email: e.target.value })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-3">
              Phone Number *
            </label>
            <div className="relative">
              <HiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
              <input
                {...register("phone")}
                type="tel"
                className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                  errors.phone
                    ? "border-red-500"
                    : "border-primary/20 focus:border-primary"
                }`}
                placeholder="9876543210"
                onChange={(e) => onDataChange({ phone: e.target.value })}
              />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Service Address *
          </label>
          <div className="relative">
            <HiMapPin className="absolute left-4 top-4 w-5 h-5 text-foreground/40 z-10" />
            <textarea
              {...register("address")}
              rows={3}
              className={`w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none ${
                errors.address
                  ? "border-red-500"
                  : "border-primary/20 focus:border-primary"
              }`}
              placeholder="Enter your complete address including apartment/house number, street, area, city, and pincode"
              onChange={(e) => onDataChange({ address: e.target.value })}
            />
          </div>
          {errors.address && (
            <p className="text-red-500 text-sm mt-2">
              {errors.address.message}
            </p>
          )}
        </div>

        {/* Special Notes Field */}
        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Special Notes (Optional)
          </label>
          <div className="relative">
            <HiChatBubbleBottomCenterText className="absolute left-4 top-4 w-5 h-5 text-foreground/40 z-10" />
            <textarea
              {...register("specialNotes")}
              rows={3}
              className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-sm border-2 border-primary/20 focus:border-primary rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
              placeholder="Any specific requirements, allergies, or preferences you'd like our team to know about..."
              onChange={(e) => onDataChange({ specialNotes: e.target.value })}
            />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-6">
          <Button
            type="button"
            onClick={onPrev}
            variant="outline"
            className="border-2 border-primary/20 text-primary hover:bg-primary/5 px-8 py-3 rounded-full font-semibold flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            <HiArrowLeft className="w-4 h-4" />
            Previous
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 w-full sm:w-auto"
          >
            Continue
            <HiArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.form>
    </div>
  );
};

export default CustomerInformation;
