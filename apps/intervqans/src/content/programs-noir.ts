import type { QAItem, Section } from "./types";
import { programsSection } from "./programs";

const aiMlPrograms: QAItem[] = [
  {
    id: "python-spam-classifier-naive-bayes",
    question: "Spam Email Classifier using Naive Bayes",
    tags: ["AI/ML", "Python", "Classification"],
    difficulty: "Medium",
    answer: [
      {
        type: "text",
        content: "Build a basic program to classify an email as ==Spam== or __Not Spam__.",
      },
      {
        type: "code",
        language: "python",
        content: `from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB

emails = [
    "Win money now",
    "Meeting at 10 AM",
    "Claim your free prize",
    "Project discussion tomorrow",
]
labels = ["spam", "not spam", "spam", "not spam"]

vectorizer = CountVectorizer()
X = vectorizer.fit_transform(emails)

model = MultinomialNB()
model.fit(X, labels)

new_email = ["Free prize waiting for you"]
new_X = vectorizer.transform(new_email)
prediction = model.predict(new_X)
print(prediction[0])`,
      },
      {
        type: "code",
        language: "text",
        content: "spam",
      },
      { type: "heading", content: "What is happening?" },
      {
        type: "flow",
        title: "Text becomes numbers before the model ever sees it",
        nodes: [
          { label: "Text", sub: "Raw email strings", tone: "gold" },
          { label: "Numerical Features", sub: "CountVectorizer", tone: "ember" },
          { label: "Train Model", sub: "MultinomialNB", tone: "sky" },
          { label: "Predict", sub: "spam / not spam", tone: "mint" },
        ],
      },
      { type: "heading", content: "Analogy" },
      {
        type: "callout",
        variant: "tip",
        content:
          "Like teaching someone using examples of junk mail and normal mail. Eventually they start __recognizing the patterns__ themselves.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Interview Tip: Mention that `CountVectorizer` converts text into numerical features because ==ML models cannot directly understand raw text==.",
      },
    ],
  },
  {
    id: "python-house-price-linear-regression",
    question: "Predict House Price using Linear Regression",
    tags: ["AI/ML", "Python", "Regression"],
    difficulty: "Easy",
    answer: [
      {
        type: "text",
        content: "Build a simple Machine Learning model that predicts house price based on ==house size==.",
      },
      {
        type: "code",
        language: "python",
        content: `from sklearn.linear_model import LinearRegression

# House size in square feet
X = [[1000], [1500], [2000], [2500], [3000]]

# Price
y = [200000, 300000, 400000, 500000, 600000]

model = LinearRegression()
model.fit(X, y)

prediction = model.predict([[1800]])
print(prediction[0])`,
      },
      {
        type: "code",
        language: "text",
        content: "360000.0",
      },
      { type: "heading", content: "What is happening?" },
      {
        type: "flow",
        title: "The model learns a relationship, then applies it to new input",
        nodes: [
          { label: "Training Data", sub: "Size → Price pairs", tone: "gold" },
          { label: "Find Relationship", sub: "model.fit()", tone: "ember" },
          { label: "New Input", sub: "1,800 sq ft", tone: "sky" },
          { label: "Prediction", sub: "$360,000", tone: "mint" },
        ],
      },
      {
        type: "text",
        content: "The model roughly learns:",
      },
      {
        type: "code",
        language: "text",
        content: "Price ≈ House Size × Relationship",
      },
      { type: "heading", content: "Analogy" },
      {
        type: "callout",
        variant: "tip",
        content:
          "If you notice that bigger houses generally cost more, you can ==estimate the price== of a new house based on the pattern you've already seen.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Interview Tip: Linear Regression is a **supervised learning regression algorithm** used when the output is a __continuous numerical value__.",
      },
    ],
  },
  {
    id: "python-customer-classification-knn",
    question: "Customer Classification using K-Nearest Neighbors",
    tags: ["AI/ML", "Python", "Classification"],
    difficulty: "Medium",
    answer: [
      {
        type: "text",
        content:
          "Given customer information, classify whether a new customer is likely to ==Buy== or __Not Buy__.",
      },
      {
        type: "code",
        language: "python",
        content: `from sklearn.neighbors import KNeighborsClassifier

# [Age, Income]
X = [
    [22, 30000],
    [25, 35000],
    [35, 60000],
    [40, 70000],
    [45, 80000],
]
y = ["No", "No", "Yes", "Yes", "Yes"]

model = KNeighborsClassifier(n_neighbors=3)
model.fit(X, y)

new_customer = [[38, 65000]]
prediction = model.predict(new_customer)
print(prediction[0])`,
      },
      {
        type: "code",
        language: "text",
        content: "Yes",
      },
      { type: "heading", content: "What is happening?" },
      {
        type: "flow",
        title: "KNN votes using whichever labeled points are closest",
        nodes: [
          { label: "New Customer", sub: "[38, 65000]", tone: "gold" },
          { label: "Find K Nearest", sub: "k = 3 closest points", tone: "ember" },
          { label: "Majority Vote", sub: "Among those 3 neighbors", tone: "sky" },
          { label: "Predict", sub: '"Yes"', tone: "mint" },
        ],
      },
      { type: "heading", content: "Analogy" },
      {
        type: "callout",
        variant: "tip",
        content:
          "Like asking your **3 closest friends by age and income** whether they'd buy the product, and going with whatever __most of them say__.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Interview Tip: KNN is a **lazy learner** — it does not build a model during training. It just stores the data and does the comparison ==at prediction time==.",
      },
    ],
  },
  {
    id: "python-iris-decision-tree",
    question: "Iris Flower Classification using Decision Tree",
    tags: ["AI/ML", "Python", "Classification"],
    difficulty: "Easy",
    answer: [
      {
        type: "text",
        content: "Build a model to classify an Iris flower based on its ==measurements==.",
      },
      {
        type: "code",
        language: "python",
        content: `from sklearn.datasets import load_iris
from sklearn.tree import DecisionTreeClassifier

iris = load_iris()
X = iris.data
y = iris.target

model = DecisionTreeClassifier()
model.fit(X, y)

flower = [[5.1, 3.5, 1.4, 0.2]]
prediction = model.predict(flower)
print(iris.target_names[prediction[0]])`,
      },
      {
        type: "code",
        language: "text",
        content: "setosa",
      },
      { type: "heading", content: "What is happening?" },
      {
        type: "flow",
        title: "The tree splits on features until it reaches an answer",
        nodes: [
          { label: "Flower Measurements", sub: "4 numeric inputs", tone: "gold" },
          { label: "Decision Rules", sub: "Learned splits", tone: "ember" },
          { label: "Flower Type", sub: '"setosa"', tone: "mint" },
        ],
      },
      { type: "heading", content: "Analogy" },
      {
        type: "callout",
        variant: "tip",
        content:
          'Like playing **20 Questions**: "Is petal length < 2 cm?" → Yes → follow one branch; No → follow another.',
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Interview Tip: Decision Trees repeatedly split data based on ==features that best separate the classes==.",
      },
    ],
  },
  {
    id: "python-train-test-split-accuracy",
    question: "Train/Test Split and Model Accuracy",
    tags: ["AI/ML", "Python", "Evaluation"],
    difficulty: "Medium",
    answer: [
      {
        type: "text",
        content: "Train a model and evaluate how well it performs on ==unseen data==.",
      },
      {
        type: "code",
        language: "python",
        content: `from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

predictions = model.predict(X_test)
print("Accuracy:", accuracy_score(y_test, predictions))`,
      },
      { type: "heading", content: "What is happening?" },
      {
        type: "flow",
        title: "Only the held-out 20% is used to judge the model",
        nodes: [
          { label: "Dataset", sub: "150 iris samples", tone: "gold" },
          { label: "80% Train / 20% Test", sub: "train_test_split()", tone: "ember" },
          { label: "Train", sub: "model.fit()", tone: "sky" },
          { label: "Predict + Evaluate", sub: "accuracy_score()", tone: "mint" },
        ],
      },
      { type: "heading", content: "Analogy" },
      {
        type: "callout",
        variant: "tip",
        content: "Study using practice questions, then test yourself using __questions you haven't seen before__.",
      },
      {
        type: "callout",
        variant: "info",
        content: "Interview Tip: Never evaluate a model only on the data it was trained on.",
      },
      {
        type: "callout",
        variant: "warn",
        content:
          "⭐ Key point: The goal is never to minimize **training error** — it's to minimize ==generalization error==.",
      },
    ],
  },
  {
    id: "python-confusion-matrix",
    question: "Confusion Matrix in Python",
    tags: ["AI/ML", "Python", "Metrics"],
    difficulty: "Easy",
    answer: [
      {
        type: "text",
        content: "Evaluate a classification model using a ==Confusion Matrix==.",
      },
      {
        type: "code",
        language: "python",
        content: `from sklearn.metrics import confusion_matrix

actual = [1, 0, 1, 1, 0, 1, 0, 0, 1, 0]
predicted = [1, 0, 1, 0, 0, 1, 1, 0, 1, 0]

matrix = confusion_matrix(actual, predicted)
print(matrix)`,
      },
      {
        type: "code",
        language: "text",
        content: "[[4 1]\n [1 4]]",
      },
      { type: "heading", content: "Meaning" },
      {
        type: "table",
        headers: ["", "Predicted 0", "Predicted 1"],
        rows: [
          ["Actual 0", "**TN = 4**", "FP = 1"],
          ["Actual 1", "FN = 1", "**TP = 4**"],
        ],
      },
      { type: "heading", content: "Analogy" },
      {
        type: "callout",
        variant: "tip",
        content:
          "Like checking an exam and separating answers into __correctly identified__, __wrongly identified__, __missed__, and __correctly rejected__.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Interview Tip: Know how the confusion matrix leads to ==Accuracy, Precision, Recall== and __F1-score__.",
      },
    ],
  },
  {
    id: "python-customer-segmentation-kmeans",
    question: "Customer Segmentation using K-Means",
    tags: ["AI/ML", "Python", "Clustering"],
    difficulty: "Medium",
    answer: [
      {
        type: "text",
        content:
          "Group customers into similar clusters based on their ==income and spending==.",
      },
      {
        type: "code",
        language: "python",
        content: `from sklearn.cluster import KMeans

# [Income, Spending Score]
customers = [
    [30, 20],
    [35, 25],
    [60, 70],
    [65, 75],
    [90, 30],
    [95, 35],
]

model = KMeans(n_clusters=3, random_state=42)
model.fit(customers)
print(model.labels_)`,
      },
      { type: "heading", content: "What is happening?" },
      {
        type: "flow",
        title: "No labels are given — the algorithm finds the groups itself",
        nodes: [
          { label: "Customer Data", sub: "Income + spending", tone: "gold" },
          { label: "Find Similarities", sub: "Distance between points", tone: "ember" },
          { label: "Create Groups", sub: "3 clusters", tone: "mint" },
        ],
      },
      {
        type: "text",
        content: "Unlike classification, we didn't provide labels such as:",
      },
      {
        type: "list",
        items: ["Budget Customer", "Premium Customer", "High Spender"],
      },
      { type: "text", content: "The algorithm discovers groups itself." },
      { type: "heading", content: "Analogy" },
      {
        type: "callout",
        variant: "tip",
        content:
          "Imagine students entering a cafeteria and naturally forming groups based on similar interests — __nobody assigned the groups beforehand__.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Interview Tip: K-Means is **unsupervised learning** because the training data doesn't contain ==target labels==.",
      },
    ],
  },
  {
    id: "python-sentiment-analysis-transformer",
    question: "Sentiment Analysis using a Pretrained Transformer",
    tags: ["AI/ML", "Python", "LLM"],
    difficulty: "Easy",
    answer: [
      {
        type: "text",
        content: "Use an existing AI model to determine whether text is ==positive== or __negative__.",
      },
      {
        type: "code",
        language: "python",
        content: `from transformers import pipeline

sentiment = pipeline("sentiment-analysis")

text = "This product is absolutely amazing!"
result = sentiment(text)
print(result)`,
      },
      {
        type: "code",
        language: "text",
        content: "[{'label': 'POSITIVE', 'score': 0.999}]",
      },
      { type: "heading", content: "What is happening?" },
      {
        type: "flow",
        title: "No training happens here — the model already knows English",
        nodes: [
          { label: "Text", sub: "Raw sentence", tone: "gold" },
          { label: "Pretrained Transformer", sub: "Already trained on huge text", tone: "ember" },
          { label: "Sentiment + Confidence", sub: "POSITIVE, 0.999", tone: "mint" },
        ],
      },
      { type: "heading", content: "Analogy" },
      {
        type: "callout",
        variant: "tip",
        content:
          "Instead of teaching a new employee English from scratch, you **hire someone who already understands English** and teach them the specific task you need.",
      },
      {
        type: "callout",
        variant: "info",
        content:
          "Interview Tip: This demonstrates **Transfer Learning** / pretrained models. Modern AI applications commonly start with pretrained models rather than ==training large models from scratch==.",
      },
    ],
  },
];

export const programsNoirSection: Section = {
  ...programsSection,
  items: [...programsSection.items, ...aiMlPrograms],
};
