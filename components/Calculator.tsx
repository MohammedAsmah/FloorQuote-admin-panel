/**
 * Calculator Component
 * 
 * Main calculator component that integrates the wizard, result page,
 * lead capture modal, and pricing engine. Manages the overall state and flow.
 */

"use client";

import { useState } from "react";
import { CalculatorWizard } from "./calculator/CalculatorWizard";
import { ResultPage } from "./calculator/ResultPage";
import { LeadCaptureModal } from "./lead/LeadCaptureModal";
import { calculateEstimate } from "../lib/calculator";
import type { CalculatorInput } from "../types/calculator";

type CalculatorState = "wizard" | "result";

export function Calculator() {
  const [state, setState] = useState<CalculatorState>("wizard");
  const [result, setResult] = useState<ReturnType<typeof calculateEstimate> | null>(null);
  const [inputData, setInputData] = useState<CalculatorInput | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const handleComplete = (data: CalculatorInput) => {
    const calculationResult = calculateEstimate(data);
    setResult(calculationResult);
    setInputData(data);
    setState("result");
  };

  const handleRestart = () => {
    setState("wizard");
    setResult(null);
    setInputData(null);
    setIsLeadModalOpen(false);
  };

  const handleGetQuotes = () => {
    setIsLeadModalOpen(true);
  };

  const handleCalculateAnother = () => {
    handleRestart();
  };

  const handleCloseLeadModal = () => {
    setIsLeadModalOpen(false);
  };

  if (state === "result" && result && inputData) {
    return (
      <>
        <ResultPage
          result={result}
          input={inputData}
          onRestart={handleRestart}
          onGetQuotes={handleGetQuotes}
          isLeadModalOpen={isLeadModalOpen}
        />
        <LeadCaptureModal
          isOpen={isLeadModalOpen}
          onClose={handleCloseLeadModal}
          calculatorData={{
            ...inputData,
            estimatedLow: result.estimatedLow,
            estimatedHigh: result.estimatedHigh,
            recommendedSystem: result.recommendedSystem,
          }}
          onCalculateAnother={handleCalculateAnother}
        />
      </>
    );
  }

  return <CalculatorWizard onComplete={handleComplete} />;
}
