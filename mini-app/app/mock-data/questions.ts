import { SurveyQuestion as SurveyQuestionType } from "@/components/survey-question";
export const mockSurveyQuestions: SurveyQuestionType[] = [
  {
    question:
      "What emerging Web3 project do you think has the most potential to change how we interact online, and why?",
    description:
      "Share your insights on projects that could transform online interactions in the Web3 space.",
    answerType: "text",
    minChars: 100,
    maxChars: 1000,
  },
  {
    question:
      "Which of these factors do you consider most important when evaluating a new protocol to invest in?",
    description:
      "Select all factors that influence your investment decisions in new protocols.",
    answerType: "multiple-choice",
    options: [
      "Team background and experience",
      "Tokenomics and distribution model",
      "On-chain metrics and user growth",
      "Strategic partnerships and backers",
      "Novel technical innovation",
      "Community engagement quality",
      "Regulatory compliance approach",
    ],
  },
  {
    question:
      "In your opinion, which emerging blockchain use case will see the most mainstream adoption in the next 18 months?",
    description:
      "Choose the one area you believe will gain the most traction with mainstream users.",
    answerType: "single-choice",
    options: [
      "Decentralized social media",
      "On-chain credentials and reputation",
      "Real-world asset tokenization",
      "AI and blockchain integration",
      "Gaming and metaverse applications",
      "DeFi infrastructure evolution",
      "Privacy-focused applications",
    ],
  },
];
