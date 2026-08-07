/**
 * AdditionalInfoStep Component
 * 
 * Step 3 of lead capture: Additional Information
 * Collects property type, garage empty status, preferred contact time, and notes.
 * Uses React Hook Form with Zod validation.
 */

"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, Building, Clock, Sun, Moon, FileText } from "lucide-react";
import { OptionCard } from "../ui/OptionCard";
import { colors } from "../../lib/design-system";
import { additionalInfoSchema, type AdditionalInfoFormData } from "../../lib/validations/lead";

interface AdditionalInfoStepProps {
  onNext: (data: AdditionalInfoFormData) => void;
  defaultValues?: Partial<AdditionalInfoFormData>;
}

const PROPERTY_TYPES = [
  { value: "detached", label: "Detached Home", icon: <Home size={24} /> },
  { value: "semi_detached", label: "Semi-Detached", icon: <Home size={24} /> },
  { value: "townhouse", label: "Townhouse", icon: <Building size={24} /> },
  { value: "commercial", label: "Commercial", icon: <Building size={24} /> },
] as const;

const CONTACT_TIMES = [
  { value: "morning", label: "Morning (8am - 12pm)", icon: <Sun size={24} /> },
  { value: "afternoon", label: "Afternoon (12pm - 5pm)", icon: <Clock size={24} /> },
  { value: "evening", label: "Evening (5pm - 8pm)", icon: <Moon size={24} /> },
  { value: "any", label: "Any Time", icon: <Clock size={24} /> },
] as const;

export function AdditionalInfoStep({ onNext, defaultValues }: AdditionalInfoStepProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
    watch,
  } = useForm<AdditionalInfoFormData>({
    resolver: zodResolver(additionalInfoSchema),
    defaultValues: {
      propertyType: defaultValues?.propertyType || "detached",
      garageEmpty: defaultValues?.garageEmpty ?? true,
      preferredContactTime: defaultValues?.preferredContactTime || "any",
      additionalNotes: defaultValues?.additionalNotes || "",
    },
    mode: "onChange",
  });

  const propertyType = watch("propertyType");
  const garageEmpty = watch("garageEmpty");
  const preferredContactTime = watch("preferredContactTime");

  const onSubmit = (data: AdditionalInfoFormData) => {
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
          Additional Information
        </h2>
        <p style={{ color: colors.text.secondary }}>
          Help contractors understand your property and preferences.
        </p>
      </div>

      <form id="additional-info-form" onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Property Type */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: colors.text.primary }}
          >
            Property Type
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {PROPERTY_TYPES.map((type) => (
              <OptionCard
                key={type.value}
                selected={propertyType === type.value}
                onClick={() => {
                  setValue("propertyType", type.value, { shouldValidate: true });
                }}
                icon={type.icon}
              >
                <input
                  type="radio"
                  value={type.value}
                  {...register("propertyType")}
                  className="hidden"
                />
                <div className="font-medium" style={{ color: colors.text.primary }}>
                  {type.label}
                </div>
              </OptionCard>
            ))}
          </div>
          {errors.propertyType && (
            <p
              className="mt-2 text-sm"
              style={{ color: colors.status.error }}
            >
              {errors.propertyType.message}
            </p>
          )}
        </motion.div>

        {/* Garage Empty */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: colors.text.primary }}
          >
            Is your garage currently empty?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { value: true, label: "Yes, it's empty" },
              { value: false, label: "No, has items inside" },
            ].map((option) => (
              <OptionCard
                key={option.value.toString()}
                selected={garageEmpty === option.value}
                onClick={() => {
                  setValue("garageEmpty", option.value, { shouldValidate: true });
                }}
              >
                <input
                  type="radio"
                  value={option.value.toString()}
                  {...register("garageEmpty")}
                  className="hidden"
                />
                <div className="font-medium" style={{ color: colors.text.primary }}>
                  {option.label}
                </div>
              </OptionCard>
            ))}
          </div>
          {errors.garageEmpty && (
            <p
              className="mt-2 text-sm"
              style={{ color: colors.status.error }}
            >
              {errors.garageEmpty.message}
            </p>
          )}
        </motion.div>

        {/* Preferred Contact Time */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: colors.text.primary }}
          >
            Preferred Contact Time
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {CONTACT_TIMES.map((time) => (
              <OptionCard
                key={time.value}
                selected={preferredContactTime === time.value}
                onClick={() => {
                  setValue("preferredContactTime", time.value, { shouldValidate: true });
                }}
                icon={time.icon}
              >
                <input
                  type="radio"
                  value={time.value}
                  {...register("preferredContactTime")}
                  className="hidden"
                />
                <div className="font-medium" style={{ color: colors.text.primary }}>
                  {time.label}
                </div>
              </OptionCard>
            ))}
          </div>
          {errors.preferredContactTime && (
            <p
              className="mt-2 text-sm"
              style={{ color: colors.status.error }}
            >
              {errors.preferredContactTime.message}
            </p>
          )}
        </motion.div>

        {/* Additional Notes */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <label
            className="block text-sm font-medium mb-3"
            style={{ color: colors.text.primary }}
          >
            Additional Notes (Optional)
          </label>
          <div className="relative">
            <FileText
              size={20}
              className="absolute left-4 top-4"
              style={{ color: colors.text.muted }}
            />
            <textarea
              id="additional-notes"
              {...register("additionalNotes")}
              placeholder="Any specific requirements or questions for contractors..."
              rows={4}
              maxLength={500}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:outline-none transition-all duration-200 resize-none"
              style={{
                borderColor: errors.additionalNotes ? colors.status.error : colors.border.default,
                backgroundColor: colors.background.card,
                color: colors.text.primary,
              }}
            />
          </div>
          <div className="flex justify-between mt-1">
            {errors.additionalNotes && (
              <p
                className="text-sm"
                style={{ color: colors.status.error }}
              >
                {errors.additionalNotes.message}
              </p>
            )}
            <p
              className="text-sm ml-auto"
              style={{ color: colors.text.muted }}
            >
              {watch("additionalNotes")?.length || 0}/500
            </p>
          </div>
        </motion.div>
      </form>
    </motion.div>
  );
}

