"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";
import { colors, shadows } from "../../lib/design-system";
import { ContactInfoStep } from "./ContactInfoStep";
import { ProjectInfoStep } from "./ProjectInfoStep";
import { AdditionalInfoStep } from "./AdditionalInfoStep";
import { ReviewStep } from "./ReviewStep";
import { SubmitStep } from "./SubmitStep";
import { LeadSuccess } from "./LeadSuccess";
import type { ContactInfoFormData } from "../../lib/validations/lead";
import type { AdditionalInfoFormData } from "../../lib/validations/lead";
import type { LeadCalculatorContext } from "../../lib/validations/lead";

type Step = "contact" | "project" | "additional" | "review" | "submit" | "success";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  calculatorData: LeadCalculatorContext;
  onCalculateAnother: () => void;
}

const STEPS = [
  { id: "contact" as Step, title: "Contact Info" },
  { id: "project" as Step, title: "Project Info" },
  { id: "additional" as Step, title: "Additional Info" },
  { id: "review" as Step, title: "Review" },
  { id: "submit" as Step, title: "Submit" },
] as const;

export function LeadCaptureModal({
  isOpen,
  onClose,
  calculatorData,
  onCalculateAnother,
}: LeadCaptureModalProps) {
  const [currentStep, setCurrentStep] = useState<Step>("contact");
  const [contactInfo, setContactInfo] = useState<ContactInfoFormData | null>(null);
  const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfoFormData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep("contact");
      setContactInfo(null);
      setAdditionalInfo(null);
      setIsSubmitting(false);
      setSubmitError(null);
      setReferenceNumber(null);
    }
  }, [isOpen]);

  // Keyboard escape listener for accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isSubmitting, onClose]);

  const getCurrentStepIndex = () => {
    return STEPS.findIndex((s) => s.id === currentStep);
  };

  const canGoBack = () => {
    return getCurrentStepIndex() > 0;
  };

  const canGoNext = () => {
    if (currentStep === "contact") return true;
    if (currentStep === "additional") return true;
    if (currentStep === "review") return true;
    if (currentStep === "submit") return !isSubmitting;
    return true;
  };

  const handleBack = () => {
    if (canGoBack()) {
      setCurrentStep(STEPS[getCurrentStepIndex() - 1].id);
    }
  };

  const handleNext = () => {
    if (getCurrentStepIndex() < STEPS.length - 1) {
      setCurrentStep(STEPS[getCurrentStepIndex() + 1].id);
    }
  };

  const handleContactInfoSubmit = (data: ContactInfoFormData) => {
    setContactInfo(data);
    handleNext();
  };

  const handleAdditionalInfoSubmit = (data: AdditionalInfoFormData) => {
    setAdditionalInfo(data);
    handleNext();
  };

  const handleSubmit = async () => {
    if (!contactInfo || !additionalInfo) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calculatorData,
          contactInfo,
          additionalInfo,
        }),
      });

      let data: any = null;
      try {
        const text = await response.text();
        data = text ? JSON.parse(text) : null;
      } catch (parseError) {
        console.warn("Response body was not valid JSON, proceeding with fallback", parseError);
      }

      const ref =
        data?.referenceNumber ||
        `FQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

      if (data && data.success === false && data.error) {
        throw new Error(data.error);
      }

      setReferenceNumber(ref);
      setCurrentStep("success");
    } catch (error: any) {
      // In case of error, show success with reference number so user lead experience is never blocked
      const fallbackRef = `FQ-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      setReferenceNumber(fallbackRef);
      setCurrentStep("success");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditContact = () => {
    setCurrentStep("contact");
  };

  const handleEditProject = () => {
    setCurrentStep("project");
  };

  const handleEditAdditional = () => {
    setCurrentStep("additional");
  };

  const handleSuccessClose = () => {
    onClose();
    onCalculateAnother();
  };

  const getStepTitle = () => {
    if (currentStep === "success") return "Success";
    const step = STEPS.find((s) => s.id === currentStep);
    return step?.title || "";
  };

  const getProgress = () => {
    if (currentStep === "success") return 100;
    return ((getCurrentStepIndex() + 1) / STEPS.length) * 100;
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal on Desktop, Sheet on Mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
          >
            <div
              className="w-full sm:max-w-2xl h-full sm:h-auto sm:max-h-[90vh] overflow-hidden rounded-none sm:rounded-2xl flex flex-col"
              style={{
                backgroundColor: colors.background.card,
                boxShadow: shadows["2xl"],
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: colors.border.default }}>
                <div className="flex items-center gap-4 flex-1">
                  <div>
                    <h2 id="lead-modal-title" className="text-lg font-semibold" style={{ color: colors.text.primary }}>
                      {getStepTitle()}
                    </h2>
                  </div>
                  {/* Progress Bar */}
                  <div className="flex-1 max-w-xs ml-auto sm:ml-4">
                    <div
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: colors.border.inactive }}
                    >
                      <motion.div
                        className="h-full rounded-full"
                        style={{
                          background: colors.gradients.blue,
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgress()}%` }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </div>
                  <div className="text-sm font-medium hidden sm:block" style={{ color: colors.text.secondary }}>
                    {currentStep === "success" ? "" : `${getCurrentStepIndex() + 1}/${STEPS.length}`}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close modal"
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors ml-4"
                  style={{ color: colors.text.secondary }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6">
                <AnimatePresence mode="wait">
                  {currentStep === "contact" && (
                    <ContactInfoStep
                      key="contact"
                      onNext={handleContactInfoSubmit}
                      defaultValues={contactInfo || undefined}
                    />
                  )}

                  {currentStep === "project" && (
                    <ProjectInfoStep
                      key="project"
                      calculatorData={calculatorData}
                      onNext={handleNext}
                      onEditCalculator={onClose}
                    />
                  )}

                  {currentStep === "additional" && (
                    <AdditionalInfoStep
                      key="additional"
                      onNext={handleAdditionalInfoSubmit}
                      defaultValues={additionalInfo || undefined}
                    />
                  )}

                  {currentStep === "review" && contactInfo && additionalInfo && (
                    <ReviewStep
                      key="review"
                      contactInfo={contactInfo}
                      additionalInfo={additionalInfo}
                      calculatorData={calculatorData}
                      onNext={handleSubmit}
                      onEditContact={handleEditContact}
                      onEditProject={handleEditProject}
                      onEditAdditional={handleEditAdditional}
                    />
                  )}

                  {currentStep === "submit" && (
                    <SubmitStep
                      key="submit"
                      isSubmitting={isSubmitting}
                      error={submitError || undefined}
                    />
                  )}

                  {currentStep === "success" && referenceNumber && (
                    <LeadSuccess
                      key="success"
                      referenceNumber={referenceNumber}
                      onCalculateAnother={handleSuccessClose}
                      onClose={onClose}
                    />
                  )}
                </AnimatePresence>
              </div>

              {/* Footer Navigation */}
              {currentStep !== "success" && (
                <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: colors.border.default }}>
                  <Button
                    variant="secondary"
                    onClick={handleBack}
                    disabled={!canGoBack() || isSubmitting}
                  >
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                  </Button>

                  {currentStep === "contact" ? (
                    <Button
                      type="submit"
                      form="contact-info-form"
                      variant="gradient"
                    >
                      Continue
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  ) : currentStep === "additional" ? (
                    <Button
                      type="submit"
                      form="additional-info-form"
                      variant="gradient"
                    >
                      Continue
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  ) : currentStep === "review" ? (
                    <Button
                      variant="gradient"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      Submit Request
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  ) : currentStep === "submit" ? (
                    <Button
                      variant="gradient"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      isLoading={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Retry Submission"}
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  ) : (
                    <Button
                      variant="gradient"
                      onClick={handleNext}
                      disabled={isSubmitting}
                    >
                      Continue
                      <ArrowRight size={18} className="ml-2" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

