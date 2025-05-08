import { SurveyQuestionType } from "../surveys/SurveyFeed";

export type Survey = {
  id: string;
  title: string;
  rewards: number;
  maxResponses: number;
  currentResponses: number;
  questions: SurveyQuestionType[];
  creator: string;
  eligible: boolean;
};

// Mock survey data
export const MOCK_SURVEYS: Survey[] = [
  {
    id: "survey-123",
    title: "Web3 User Experience Survey",
    rewards: 100,
    maxResponses: 100,
    currentResponses: 54,
    questions: [
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
          "What emerging Web3 project do you think has the most potential to change how we interact online, and why?",
        description:
          "Share your insights on projects that could transform online interactions in the Web3 space.",
        answerType: "text",
        minChars: 100,
        maxChars: 1000,
      },
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
    ],
    creator: "@alice",
    eligible: true,
  },
  {
    id: "survey-456",
    title: "DeFi Adoption Research",
    rewards: 75,
    maxResponses: 200,
    currentResponses: 123,
    questions: [
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
      {
        question:
          "What emerging Web3 project do you think has the most potential to change how we interact online, and why?",
        description:
          "Share your insights on projects that could transform online interactions in the Web3 space.",
        answerType: "text",
        minChars: 100,
        maxChars: 1000,
      },
    ],
    creator: "@bob",
    eligible: true,
  },
  {
    id: "survey-789",
    title: "NFT Market Sentiment",
    rewards: 150,
    maxResponses: 50,
    currentResponses: 32,
    questions: [
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
        ],
      },
    ],
    creator: "@charlie",
    eligible: false,
  },
  {
    id: "survey-124",
    title: "Web3 User Experience Survey",
    rewards: 100,
    maxResponses: 100,
    currentResponses: 54,
    questions: [
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
    ],
    creator: "@alice",
    eligible: true,
  },
  {
    id: "survey-457",
    title: "DeFi Adoption Research",
    rewards: 75,
    maxResponses: 200,
    currentResponses: 123,
    questions: [
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
      {
        question:
          "What emerging Web3 project do you think has the most potential to change how we interact online, and why?",
        description:
          "Share your insights on projects that could transform online interactions in the Web3 space.",
        answerType: "text",
        minChars: 100,
        maxChars: 1000,
      },
    ],
    creator: "@bob",
    eligible: true,
  },
  {
    id: "survey-790",
    title: "NFT Market Sentiment",
    rewards: 150,
    maxResponses: 50,
    currentResponses: 32,
    questions: [
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
        ],
      },
    ],
    creator: "@charlie",
    eligible: false,
  },
  {
    id: "survey-125",
    title: "Web3 User Experience Survey",
    rewards: 100,
    maxResponses: 100,
    currentResponses: 54,
    questions: [
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
    ],
    creator: "@alice",
    eligible: true,
  },
  {
    id: "survey-458",
    title: "DeFi Adoption Research",
    rewards: 75,
    maxResponses: 200,
    currentResponses: 123,
    questions: [
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
      {
        question:
          "What emerging Web3 project do you think has the most potential to change how we interact online, and why?",
        description:
          "Share your insights on projects that could transform online interactions in the Web3 space.",
        answerType: "text",
        minChars: 100,
        maxChars: 1000,
      },
    ],
    creator: "@bob",
    eligible: true,
  },
  {
    id: "survey-791",
    title: "NFT Market Sentiment",
    rewards: 150,
    maxResponses: 50,
    currentResponses: 32,
    questions: [
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
        ],
      },
    ],
    creator: "@charlie",
    eligible: false,
  },
  {
    id: "survey-126",
    title: "Web3 User Experience Survey",
    rewards: 100,
    maxResponses: 100,
    currentResponses: 54,
    questions: [
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
    ],
    creator: "@alice",
    eligible: true,
  },
  {
    id: "survey-459",
    title: "DeFi Adoption Research",
    rewards: 75,
    maxResponses: 200,
    currentResponses: 123,
    questions: [
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
      {
        question:
          "What emerging Web3 project do you think has the most potential to change how we interact online, and why?",
        description:
          "Share your insights on projects that could transform online interactions in the Web3 space.",
        answerType: "text",
        minChars: 100,
        maxChars: 1000,
      },
    ],
    creator: "@bob",
    eligible: true,
  },
  {
    id: "survey-792",
    title: "NFT Market Sentiment",
    rewards: 150,
    maxResponses: 50,
    currentResponses: 32,
    questions: [
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
        ],
      },
    ],
    creator: "@charlie",
    eligible: false,
  },
  {
    id: "survey-127",
    title: "Web3 User Experience Survey",
    rewards: 100,
    maxResponses: 100,
    currentResponses: 54,
    questions: [
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
    ],
    creator: "@alice",
    eligible: true,
  },
  {
    id: "survey-460",
    title: "DeFi Adoption Research",
    rewards: 75,
    maxResponses: 200,
    currentResponses: 123,
    questions: [
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
      {
        question:
          "What emerging Web3 project do you think has the most potential to change how we interact online, and why?",
        description:
          "Share your insights on projects that could transform online interactions in the Web3 space.",
        answerType: "text",
        minChars: 100,
        maxChars: 1000,
      },
    ],
    creator: "@bob",
    eligible: true,
  },
  {
    id: "survey-795",
    title: "NFT Market Sentiment",
    rewards: 150,
    maxResponses: 50,
    currentResponses: 32,
    questions: [
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
        ],
      },
    ],
    creator: "@charlie",
    eligible: false,
  },
  {
    id: "survey-130",
    title: "Web3 User Experience Survey",
    rewards: 100,
    maxResponses: 100,
    currentResponses: 54,
    questions: [
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
    ],
    creator: "@alice",
    eligible: true,
  },
  {
    id: "survey-75",
    title: "DeFi Adoption Research",
    rewards: 75,
    maxResponses: 200,
    currentResponses: 123,
    questions: [
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
      {
        question:
          "What emerging Web3 project do you think has the most potential to change how we interact online, and why?",
        description:
          "Share your insights on projects that could transform online interactions in the Web3 space.",
        answerType: "text",
        minChars: 100,
        maxChars: 1000,
      },
    ],
    creator: "@bob",
    eligible: true,
  },
  {
    id: "survey-799",
    title: "NFT Market Sentiment",
    rewards: 150,
    maxResponses: 50,
    currentResponses: 32,
    questions: [
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
        ],
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
        ],
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
        ],
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
        ],
      },
    ],
    creator: "@charlie",
    eligible: false,
  },
];
