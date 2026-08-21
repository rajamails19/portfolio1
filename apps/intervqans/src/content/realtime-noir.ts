import type { QAItem, Section } from "./types";
import { realtimeSection } from "./realtime";

const aiMlRealtime: QAItem[] = [
  {
    id: "kroger-weights-and-bias",
    question: "Kroger wants to recommend products to customers. How do Weights & Bias help?",
    tags: ["AI/ML", "Recommendations"],
    difficulty: "Medium",
    answer: [
      { type: "heading", content: "Scenario" },
      {
        type: "text",
        content:
          "Kroger wants to predict whether a customer will buy Greek Yogurt and show it under ==Recommended for You==.",
      },
      { type: "heading", content: "What are Weights?" },
      {
        type: "text",
        content: "Think of **Weight = Importance given to each factor**.",
      },
      { type: "text", content: "For this customer, the model may learn:" },
      {
        type: "code",
        language: "text",
        content: `Bought yogurt many times before → HIGH importance
Bought yogurt last week         → HIGH importance
Yogurt is on sale               → MEDIUM importance
Usually shops on weekends       → LOW importance`,
      },
      {
        type: "text",
        content:
          "So, weights tell the model ==which customer behaviors matter more or less== when making the prediction.",
      },
      { type: "heading", content: "What is Bias?" },
      {
        type: "text",
        content: "Think of **Bias = Starting tendency / baseline**.",
      },
      {
        type: "text",
        content:
          "For example, before even looking at this customer's history, Kroger's data may show that customers have some __baseline likelihood__ of buying yogurt. The customer's behavior then moves the prediction up or down from that starting point.",
      },
      {
        type: "code",
        language: "text",
        content: `Past Purchases   × Weight
Recent Purchase  × Weight
Discount         × Weight
Shopping Pattern × Weight
        +
       Bias
        ↓
Purchase Probability = 82%`,
      },
      { type: "heading", content: "Easy Kroger Analogy 🛒" },
      {
        type: "text",
        content:
          'Imagine a Kroger store manager deciding: "Should I stock extra ice cream this weekend?"',
      },
      {
        type: "code",
        language: "text",
        content: `Hot weather       → VERY important
Weekend           → Important
Ice cream on sale → Important
Package color     → Not very important`,
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "The importance the manager gives each factor = **Weight**. The manager's normal expectation of how much ice cream usually sells is similar to a **Bias / baseline**.",
      },
      { type: "heading", content: "Production Flow" },
      {
        type: "flow",
        title: "From a customer's activity to a recommended product",
        nodes: [
          { label: "Customer", sub: "Shops the app", tone: "gold" },
          { label: "Kroger App", sub: "Sends activity", tone: "ember" },
          { label: "ML Model", sub: "Weights + Bias", tone: "sky" },
          { label: "82% Likely to Buy", sub: "Purchase probability", tone: "mint" },
          { label: "Recommended: Greek Yogurt", sub: "Shown to customer", tone: "gold" },
        ],
      },
      {
        type: "callout",
        variant: "info",
        content:
          "💡 Interview Tip: The developer provides the data/features; during training, the model ==learns the weights and biases== rather than us manually assigning them.",
      },
      {
        type: "callout",
        variant: "tip",
        content:
          "**Business Goal:** Recommend products customers are genuinely likely to want.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "**Interviewer expects:** You can explain what weights and bias mean, __how they're learned__, and how they contribute to a real prediction.",
      },
    ],
  },
  {
    id: "kroger-what-is-a-model",
    question: "Kroger wants to predict what customers will buy. What is a Model?",
    tags: ["AI/ML", "Fundamentals"],
    difficulty: "Easy",
    answer: [
      { type: "heading", content: "Scenario" },
      {
        type: "text",
        content:
          'Kroger has years of customer shopping data and wants to predict: "What product is this customer likely to buy next?"',
      },
      { type: "heading", content: "What is a Model?" },
      { type: "text", content: "Think of a **Model = The trained decision-maker**." },
      { type: "text", content: "Kroger gives the model historical examples:" },
      {
        type: "code",
        language: "text",
        content: `Customer bought bread → often buys butter
Customer buys baby products → often buys diapers
Customer buys yogurt weekly → likely to buy it again`,
      },
      {
        type: "text",
        content:
          "The model learns patterns from this historical data and uses those patterns to ==predict new customer behavior==.",
      },
      { type: "heading", content: "Easy Kroger Analogy 🛒" },
      {
        type: "text",
        content: "Imagine an experienced Kroger store manager. After working there for years, they notice:",
      },
      {
        type: "callout",
        variant: "tip",
        content: '"Whenever there\'s a hot weekend, we sell a lot more ice cream."',
      },
      {
        type: "text",
        content:
          "Their experience has created a __pattern__ in their mind. An ML model does something similar — except it learns from ==millions of historical data points==.",
      },
      { type: "heading", content: "Production Flow" },
      {
        type: "flow",
        title: "From historical data to a fresh recommendation",
        nodes: [
          { label: "Historical Kroger Data", sub: "Years of purchases", tone: "gold" },
          { label: "Train Model", sub: "Learn the patterns", tone: "ember" },
          { label: "New Customer Activity", sub: "What they're doing now", tone: "sky" },
          { label: "Prediction", sub: '"Likely to buy Yogurt"', tone: "mint" },
          { label: "Recommended for You", sub: "Shown in the app", tone: "gold" },
        ],
      },
      {
        type: "callout",
        variant: "info",
        content:
          "💡 Interview Tip: A model is the learned mathematical function/pattern produced during training. **Training creates the model**; __inference uses that model__ to make predictions.",
      },
      {
        type: "callout",
        variant: "tip",
        content: "**Business Goal:** Use past customer behavior to make useful predictions about new customer activity.",
      },
      {
        type: "callout",
        variant: "info",
        content: "**Interviewer expects:** Understand the distinction — ==Data → Training → Model → Prediction==.",
      },
    ],
  },
];

export const realtimeNoirSection: Section = {
  ...realtimeSection,
  items: [...realtimeSection.items, ...aiMlRealtime],
};
