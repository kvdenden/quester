export const exampleSurveys = {
  "Web3 Product Feedback": [
    {
      question:
        "Have you used any decentralized finance apps in the last 3 months?",
      description: "Select the option that best matches your experience.",
      answerType: "single-choice",
      options: ["Yes", "No"],
    },
    {
      question: "Which DeFi apps have you used recently?",
      description: "Choose all that apply.",
      answerType: "multiple-choice",
      options: ["Uniswap", "Aave", "Arcadia", "Velodrome", "Other"],
    },
    {
      question: "What was the biggest blocker you experienced?",
      description: "Tell us what made the experience difficult or confusing.",
      answerType: "text",
      minChars: 50,
      maxChars: 500,
    },
    {
      question: "How likely are you to use this dApp again?",
      description: "Select the answer that matches your level of interest.",
      answerType: "single-choice",
      options: ["Definitely", "Maybe", "Not likely"],
    },
    {
      question: "What feature would you want us to build next?",
      description: "Be honest — what’s missing or needs fixing?",
      answerType: "text",
      minChars: 50,
      maxChars: 500,
    },
  ],
  "Crypto Sentiment": [
    {
      question: "How do you currently feel about the overall crypto market?",
      description: "Pick the one that best reflects your current sentiment.",
      answerType: "single-choice",
      options: ["Bullish", "Bearish", "Neutral"],
    },
    {
      question: "Which sectors are you most optimistic about in the next year?",
      description: "Choose up to three.",
      answerType: "multiple-choice",
      options: [
        "Layer 2s",
        "AI x Crypto",
        "DeFi",
        "NFTs",
        "SocialFi",
        "RWAs",
        "Gaming",
      ],
    },
    {
      question: "Do you expect ETH to outperform BTC in 2025?",
      description: "Quick yes or no.",
      answerType: "single-choice",
      options: ["Yes", "No"],
    },
    {
      question: "What’s your go-to information source for crypto news?",
      description:
        "Be specific if you want (name a podcast, newsletter, account...).",
      answerType: "text",
      minChars: 50,
      maxChars: 300,
    },
    {
      question: "Do you currently hold any governance tokens?",
      description: "Pick all that apply.",
      answerType: "multiple-choice",
      options: ["UNI", "AAVE", "LDO", "ARB", "OP", "None"],
    },
  ],
};
