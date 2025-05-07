"use client";

import { useState } from "react";
import { mockSurveyQuestions } from "@/app/mock-data/questions";
import { QuestionNavigation } from "./components/QuestionNavigation";
import { QuestionDisplay } from "./components/QuestionDisplay";
import { AnswerInput } from "./components/AnswerInput";
import { ReviewSection } from "./components/ReviewSection";
import { NavigationButtons } from "./components/NavigationButtons";

export default function Survey() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, any>>({});
  const [textInput, setTextInput] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isReviewing, setIsReviewing] = useState(false);
  const [validationWarnings, setValidationWarnings] = useState<
    Record<number, string>
  >({});

  const currentQuestion = mockSurveyQuestions[currentQuestionIndex];

  const goToPrevious = () => {
    if (isReviewing) {
      setIsReviewing(false);
      setCurrentQuestionIndex(mockSurveyQuestions.length - 1);
    } else if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);

      // Load previous answers if they exist
      if (mockSurveyQuestions[currentQuestionIndex - 1].answerType === "text") {
        setTextInput(answers[currentQuestionIndex - 1] || "");
        setSelectedOptions([]);
        setSelectedOption("");
      } else if (
        mockSurveyQuestions[currentQuestionIndex - 1].answerType ===
        "multiple-choice"
      ) {
        setSelectedOptions(answers[currentQuestionIndex - 1] || []);
        setTextInput("");
        setSelectedOption("");
      } else if (
        mockSurveyQuestions[currentQuestionIndex - 1].answerType ===
        "single-choice"
      ) {
        setSelectedOption(answers[currentQuestionIndex - 1] || "");
        setTextInput("");
        setSelectedOptions([]);
      }
    }
  };

  const goToNext = () => {
    // Save current answers
    if (currentQuestion.answerType === "text") {
      setAnswers({ ...answers, [currentQuestionIndex]: textInput });
    } else if (currentQuestion.answerType === "multiple-choice") {
      setAnswers({ ...answers, [currentQuestionIndex]: selectedOptions });
    } else if (currentQuestion.answerType === "single-choice") {
      setAnswers({ ...answers, [currentQuestionIndex]: selectedOption });
    }

    if (currentQuestionIndex < mockSurveyQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);

      // Load next answers if they exist
      if (mockSurveyQuestions[currentQuestionIndex + 1].answerType === "text") {
        setTextInput(answers[currentQuestionIndex + 1] || "");
        setSelectedOptions([]);
        setSelectedOption("");
      } else if (
        mockSurveyQuestions[currentQuestionIndex + 1].answerType ===
        "multiple-choice"
      ) {
        setSelectedOptions(answers[currentQuestionIndex + 1] || []);
        setTextInput("");
        setSelectedOption("");
      } else if (
        mockSurveyQuestions[currentQuestionIndex + 1].answerType ===
        "single-choice"
      ) {
        setSelectedOption(answers[currentQuestionIndex + 1] || "");
        setTextInput("");
        setSelectedOptions([]);
      }
    } else {
      setIsReviewing(true);
      validateAnswers();
    }
  };

  const validateAnswers = () => {
    const warnings: Record<number, string> = {};

    mockSurveyQuestions.forEach((question, index) => {
      const answer = answers[index];

      if (question.answerType === "text") {
        if (!answer || answer.trim() === "") {
          warnings[index] = "No answer provided";
        } else if (question.minChars && answer.length < question.minChars) {
          warnings[index] = `Minimum ${question.minChars} characters required`;
        } else if (question.maxChars && answer.length > question.maxChars) {
          warnings[index] = `Maximum ${question.maxChars} characters allowed`;
        }
      } else if (question.answerType === "multiple-choice") {
        if (!answer || answer.length === 0) {
          warnings[index] = "No option selected";
        }
      } else if (question.answerType === "single-choice") {
        if (!answer || answer.trim() === "") {
          warnings[index] = "No option selected";
        }
      }
    });

    setValidationWarnings(warnings);
    return Object.keys(warnings).length === 0;
  };

  const handleSubmit = () => {
    if (!validateAnswers()) {
      return;
    }
    // TODO: Implement survey submission
    console.log("Submitting survey answers:", answers);
  };

  const handleTextChange = (value: string) => {
    setTextInput(value);
  };

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleSingleChoice = (value: string) => {
    setSelectedOption(value);
    setAnswers({ ...answers, [currentQuestionIndex]: value });
  };

  const containerHeight = "calc(100dvh - 64px)"; // 64px footer

  return (
    <div
      className={`flex flex-col h-full p-4 space-y-6 snap-x snap-mandatory min-h-[${containerHeight}] overflow-x-auto`}
      style={{ height: containerHeight }}
    >
      <QuestionNavigation
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={mockSurveyQuestions.length}
        isReviewing={isReviewing}
      />

      {isReviewing ? (
        <ReviewSection
          questions={mockSurveyQuestions}
          answers={answers}
          validationWarnings={validationWarnings}
        />
      ) : (
        <>
          <QuestionDisplay
            question={currentQuestion.question}
            description={currentQuestion.description}
          />
          <div className="flex-grow">
            <AnswerInput
              type={currentQuestion.answerType}
              value={
                currentQuestion.answerType === "text"
                  ? textInput
                  : currentQuestion.answerType === "multiple-choice"
                    ? selectedOptions
                    : selectedOption
              }
              onChange={
                currentQuestion.answerType === "text"
                  ? handleTextChange
                  : currentQuestion.answerType === "multiple-choice"
                    ? toggleOption
                    : handleSingleChoice
              }
              options={currentQuestion.options}
              minChars={currentQuestion.minChars}
              maxChars={currentQuestion.maxChars}
            />
          </div>
        </>
      )}

      <NavigationButtons
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={mockSurveyQuestions.length}
        isReviewing={isReviewing}
        hasValidationWarnings={Object.keys(validationWarnings).length > 0}
        onPrevious={goToPrevious}
        onNext={goToNext}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
