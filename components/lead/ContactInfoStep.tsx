/**
 * ContactInfoStep Component
 * 
 * Step 1 of lead capture: Contact Information
 * Collects name, email, phone, and preferred contact method.
 * Uses React Hook Form with Zod validation.
 */

"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, MessageSquare, User } from "lucide-react";
import { Input } from "../ui/Input";
import { OptionCard } from "../ui/OptionCard";
import { colors } from "../../lib/design-system";
import { contactInfoSchema, type ContactInfoFormData } from "../../lib/validations/lead";

interface ContactInfoStepProps {
  onNext: (data: ContactInfoFormData) => void;
  defaultValues?: Partial<ContactInfoFormData>;
}

const CONTACT_METHODS = [
  { value: "email", label: "Email", icon: <Mail size={24} /> },
  { value: "phone", label: "Phone Call", icon: <Phone size={24} /> },
  { value: "text", label: "Text Message", icon: <MessageSquare size={24} /> },
] as const;

export function ContactInfoStep({ onNext, defaultValues }: ContactInfoStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm<ContactInfoFormData>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      preferredContactMethod: defaultValues?.preferredContactMethod || "email",
    },
    mode: "onChange",
  });

  const preferredContactMethod = watch("preferredContactMethod");

  const onSubmit = (data: ContactInfoFormData) => {
    onNext(data);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2
          className="text-2xl md:text-3xl font-bold mb-2"
          style={{ color: colors.text.primary }}
        >
          Contact Information
        </h2>
        <p style={{ color: colors.text.secondary }}>
          How should contractors reach you with your exact quotes?
        </p>
      </div>

      <form id="contact-info-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Input
            id="lead-full-name"
            label="Full Name"
            placeholder="John Doe"
            icon={<User size={20} />}
            error={errors.name?.message}
            {...register("name")}
          />
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <Input
            id="lead-email"
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            icon={<Mail size={20} />}
            error={errors.email?.message}
            {...register("email")}
          />
        </motion.div>

        {/* Phone */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Input
            id="lead-phone"
            label="Phone Number"
            type="tel"
            placeholder="(403) 555-0123"
            icon={<Phone size={20} />}
            error={errors.phone?.message}
            {...register("phone")}
          />
        </motion.div>

        {/* Preferred Contact Method */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: colors.text.primary }}
          >
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {CONTACT_METHODS.map((method) => (
              <OptionCard
                key={method.value}
                selected={preferredContactMethod === method.value}
                onClick={() => {
                  setValue("preferredContactMethod", method.value, { shouldValidate: true });
                }}
                icon={method.icon}
              >
                <input
                  type="radio"
                  value={method.value}
                  {...register("preferredContactMethod")}
                  className="hidden"
                />
                <div className="font-medium" style={{ color: colors.text.primary }}>
                  {method.label}
                </div>
              </OptionCard>
            ))}
          </div>
          {errors.preferredContactMethod && (
            <p
              className="mt-2 text-sm"
              style={{ color: colors.status.error }}
            >
              {errors.preferredContactMethod.message}
            </p>
          )}
        </motion.div>
      </form>
    </motion.div>
  );
}

