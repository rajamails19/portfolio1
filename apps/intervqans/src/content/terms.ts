import {
  BrainCircuit,
  Bot,
  Layers,
  Network,
  Languages,
  Sparkles,
  Cpu,
  Database,
  Table2,
  Send,
  Gamepad2,
  Target,
  RotateCw,
  TrendingDown,
  Scale,
  ArrowUpDown,
  Settings2,
  type LucideIcon,
} from "lucide-react";

export interface TermTile {
  term: string;
  icon: LucideIcon;
  short: string;
  why: string;
  example: string;
}

export const termTiles: TermTile[] = [
  {
    term: "Machine Learning (ML)",
    icon: BrainCircuit,
    short: "A branch of AI where computers learn patterns from data instead of following hard-coded rules.",
    why: "Learns from examples, allowing it to make predictions on new, unseen data.",
    example:
      "Train a model on thousands of spam and non-spam emails so it can classify new emails automatically.",
  },
  {
    term: "Artificial Intelligence (AI)",
    icon: Bot,
    short:
      "The field of creating systems that can perform tasks requiring human intelligence, such as learning, reasoning, and decision-making.",
    why: "Enables computers to solve complex problems and automate intelligent tasks.",
    example:
      "ChatGPT answering questions, Siri understanding voice commands, or a self-driving car recognizing traffic signs.",
  },
  {
    term: "Deep Learning (DL)",
    icon: Layers,
    short:
      "A subset of Machine Learning that uses neural networks with many layers to learn complex patterns from large amounts of data.",
    why: "Excels at solving problems involving images, speech, language, and other complex data.",
    example: "A facial recognition system learns to identify people by training on millions of images.",
  },
  {
    term: "Neural Network",
    icon: Network,
    short:
      "A Machine Learning model inspired by the human brain that learns patterns by connecting many simple processing units called neurons.",
    why: "Helps solve complex problems that are difficult to handle with traditional algorithms.",
    example:
      "A neural network learns to recognize handwritten digits by training on thousands of labeled images.",
  },
  {
    term: "Large Language Model (LLM)",
    icon: Languages,
    short: "An AI model trained on massive amounts of text to understand and generate human-like language.",
    why: "Powers applications that can answer questions, write content, summarize text, and assist with coding.",
    example: "ChatGPT uses a Large Language Model to answer questions, explain concepts, and generate code.",
  },
  {
    term: "Generative AI (GenAI)",
    icon: Sparkles,
    short:
      "A type of AI that creates new content such as text, images, audio, video, or code based on user prompts.",
    why: "Helps automate content creation, improve productivity, and assist with creative and technical tasks.",
    example: "ChatGPT generates text, DALL·E creates images, and GitHub Copilot writes code.",
  },
  {
    term: "Model",
    icon: Cpu,
    short: "A trained AI system that has learned patterns from data and can make predictions or generate outputs.",
    why: "The model is the \"brain\" that applies what it learned to solve new problems.",
    example: "A spam detection model predicts whether a new email is spam or not.",
  },
  {
    term: "Dataset",
    icon: Database,
    short: "A collection of data used to train, validate, or test an AI model.",
    why: "A well-prepared dataset helps the model learn accurate and reliable patterns.",
    example: "A CSV file containing customer age, income, and purchase history.",
  },
  {
    term: "Feature",
    icon: Table2,
    short: "An individual piece of information (input variable) used by a model to make predictions.",
    why: "Features provide the information the model uses to learn and make decisions.",
    example:
      "For predicting house prices, features could include the number of bedrooms, square footage, and location.",
  },
  {
    term: "Inference",
    icon: Send,
    short: "The process of using a trained AI model to make predictions or generate outputs on new data.",
    why: "Inference is when the model applies what it learned to solve real-world tasks.",
    example: "A trained spam filter classifies a newly received email as spam or not spam.",
  },
  {
    term: "Reinforcement Learning (RL)",
    icon: Gamepad2,
    short:
      "A type of Machine Learning where an agent learns by interacting with an environment and receiving rewards or penalties.",
    why: "Helps AI learn the best actions through trial and error.",
    example: "An AI learns to play chess by earning rewards for winning games and penalties for losing.",
  },
  {
    term: "Generalization",
    icon: Target,
    short: "A model's ability to perform well on new, unseen data after training.",
    why: "Good generalization is the ultimate goal of Machine Learning.",
    example: "A fraud detection model accurately identifies fraudulent transactions it has never encountered before.",
  },
  {
    term: "Epoch",
    icon: RotateCw,
    short: "One complete pass of the entire training dataset through the model during training.",
    why: "Multiple epochs help the model gradually improve its learning.",
    example: "If you train on 10,000 images once, you've completed 1 epoch.",
  },
  {
    term: "Gradient Descent",
    icon: TrendingDown,
    short: "An optimization algorithm that updates the model's parameters to minimize the loss function.",
    why: "Helps the model gradually find the best parameters for accurate predictions.",
    example: "After each training step, Gradient Descent adjusts the model's weights to reduce prediction errors.",
  },
  {
    term: "Weight",
    icon: Scale,
    short: "A numerical value the model learns during training that determines how important a feature is.",
    why: "Adjusting weights helps the model make more accurate predictions.",
    example: "In house price prediction, square footage may receive a higher weight than the paint color.",
  },
  {
    term: "Bias",
    icon: ArrowUpDown,
    short: "A learnable value added to the model that helps improve its predictions.",
    why: "Allows the model to fit data more accurately, even when all inputs are zero.",
    example: "A bias helps a prediction line shift up or down to better match the data.",
  },
  {
    term: "Hyperparameter",
    icon: Settings2,
    short: "A setting chosen before training that controls how the model learns.",
    why: "Hyperparameters affect the model's performance and training process.",
    example: "Learning rate, batch size, and the number of epochs are common hyperparameters.",
  },
];
