/**
 * CalculatorWizard Component
 * 
 * Main wizard component that manages the multi-step calculator flow.
 * Handles state management, navigation, and transitions between steps.
 */

"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressBar } from "../ui/ProgressBar";
import { Button } from "../ui/Button";
import { colors, spacing, typography } from "../../lib/design-system";
import type { CalculatorInput } from "../../types/calculator";
import { GarageSizeQuestion } from "./questions/GarageSizeQuestion";
import { SquareFeetQuestion } from "./questions/SquareFeetQuestion";
import { CoatingTypeQuestion } from "./questions/CoatingTypeQuestion";
import { FloorConditionQuestion } from "./questions/FloorConditionQuestion";
import { CrackLevelQuestion } from "./questions/CrackLevelQuestion";
import { ExistingCoatingQuestion } from "./questions/ExistingCoatingQuestion";
import { DecorativeFinishQuestion } from "./questions/DecorativeFinishQuestion";
import { StemWallsQuestion } from "./questions/StemWallsQuestion";
import { StepsCountQuestion } from "./questions/StepsCountQuestion";
import { MoistureIssuesQuestion } from "./questions/MoistureIssuesQuestion";
import { TimelineQuestion } from "./questions/TimelineQuestion";

// Question steps with titles and descriptions
const STEPS = [
  {
    key: "garageSize" as const,
    title: "What's your garage size?",
    description: "Select the size that best describes your garage",
  },
  {
    key: "squareFeet" as const,
    title: "What's the exact square footage?",
    description: "Enter the precise measurement for accurate pricing",
  },
  {
    key: "coatingType" as const,
    title: "Which coating type interests you?",
    description: "Different materials offer different benefits and price points",
  },
  {
    key: "floorCondition" as const,
    title: "How would you describe your floor's condition?",
    description: "This helps us estimate preparation work needed",
  },
  {
    key: "crackLevel" as const,
    title: "Are there any cracks in the concrete?",
    description: "Crack severity affects repair requirements",
  },
  {
    key: "existingCoating" as const,
    title: "Is there an existing coating?",
    description: "Removing old coatings requires additional work",
  },
  {
    key: "decorativeFinish" as const,
    title: "Would you like a decorative finish?",
    description: "Add texture and visual appeal to your floor",
  },
  {
    key: "stemWalls" as const,
    title: "Do you need stem walls coated?",
    description: "Stem walls are the vertical concrete above the floor",
  },
  {
    key: "stepsCount" as const,
    title: "How many steps need coating?",
    description: "Include any steps leading into the garage",
  },
  {
    key: "moistureIssues" as const,
    title: "Are there any moisture issues?",
    description: "Water problems require special treatment",
  },
  {
    key: "timeline" as const,
    title: "When are you planning to do this project?",
    description: "This helps contractors understand your timeline",
  },
] as const;

interface CalculatorWizardProps {
  onComplete: (data: CalculatorInput) => void;
}

export function CalculatorWizard({ onComplete }: CalculatorWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CalculatorInput>>({
    city: "Calgary",
    stemWalls: false,
    stepsCount: 0,
    moistureIssues: false,
  });

  const updateFormData = useCallback((field: keyof CalculatorInput, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleNext = useCallback(() => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onComplete(formData as CalculatorInput);
    }
  }, [currentStep, formData, onComplete]);

  const handleBack = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const canProceed = useCallback(() => {
    const currentField = STEPS[currentStep].key;
    const value = formData[currentField];

    // Validation for each step
    switch (currentField) {
      case "garageSize":
        return !!value;
      case "squareFeet":
        return typeof value === "number" && value >= 100 && value <= 5000;
      case "coatingType":
        return !!value;
      case "floorCondition":
        return !!value;
      case "crackLevel":
        return !!value;
      case "existingCoating":
        return !!value;
      case "decorativeFinish":
        return !!value;
      case "stemWalls":
        return typeof value === "boolean";
      case "stepsCount":
        return typeof value === "number" && value >= 0 && value <= 20;
      case "moistureIssues":
        return typeof value === "boolean";
      case "timeline":
        return !!value;
      default:
        return false;
    }
  }, [currentStep, formData]);

  const renderQuestion = () => {
    const step = STEPS[currentStep];

    switch (step.key) {
      case "garageSize":
        return (
          <GarageSizeQuestion
            value={formData.garageSize}
            onChange={(value) => updateFormData("garageSize", value)}
          />
        );
      case "squareFeet":
        return (
          <SquareFeetQuestion
            value={formData.squareFeet}
            onChange={(value) => updateFormData("squareFeet", value)}
          />
        );
      case "coatingType":
        return (
          <CoatingTypeQuestion
            value={formData.coatingType}
            onChange={(value) => updateFormData("coatingType", value)}
          />
        );
      case "floorCondition":
        return (
          <FloorConditionQuestion
            value={formData.floorCondition}
            onChange={(value) => updateFormData("floorCondition", value)}
          />
        );
      case "crackLevel":
        return (
          <CrackLevelQuestion
            value={formData.crackLevel}
            onChange={(value) => updateFormData("crackLevel", value)}
          />
        );
      case "existingCoating":
        return (
          <ExistingCoatingQuestion
            value={formData.existingCoating}
            onChange={(value) => updateFormData("existingCoating", value)}
          />
        );
      case "decorativeFinish":
        return (
          <DecorativeFinishQuestion
            value={formData.decorativeFinish}
            onChange={(value) => updateFormData("decorativeFinish", value)}
          />
        );
      case "stemWalls":
        return (
          <StemWallsQuestion
            value={formData.stemWalls}
            onChange={(value) => updateFormData("stemWalls", value)}
          />
        );
      case "stepsCount":
        return (
          <StepsCountQuestion
            value={formData.stepsCount}
            onChange={(value) => updateFormData("stepsCount", value)}
          />
        );
      case "moistureIssues":
        return (
          <MoistureIssuesQuestion
            value={formData.moistureIssues}
            onChange={(value) => updateFormData("moistureIssues", value)}
          />
        );
      case "timeline":
        return (
          <TimelineQuestion
            value={formData.timeline}
            onChange={(value) => updateFormData("timeline", value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: colors.gradients.background }}
    >
      <ProgressBar current={currentStep + 1} total={STEPS.length} />

      <div className="max-w-3xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="mb-8"
            >
              <h1
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: colors.text.primary, fontSize: typography.fontSize["3xl"] }}
              >
                {STEPS[currentStep].title}
              </h1>
              <p
                className="text-lg"
                style={{ color: colors.text.secondary }}
              >
                {STEPS[currentStep].description}
              </p>
            </motion.div>

            {renderQuestion()}

            {/* Navigation buttons */}
            <motion.div
              className="flex justify-between items-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={currentStep === 0}
              >
                Back
              </Button>
              <Button
                variant="gradient"
                onClick={handleNext}
                disabled={!canProceed()}
              >
                {currentStep === STEPS.length - 1 ? "Get Estimate" : "Continue"}
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
