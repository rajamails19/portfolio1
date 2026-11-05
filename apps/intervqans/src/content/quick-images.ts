export interface QuickImage {
  title: string;
  src: string;
}

// Add new images to the end: drop the file in public/quick-images and list it here.
export const quickImages: QuickImage[] = [
  {
    title:
      "Relationship between Artificial Intelligence, Machine Learning, Deep Learning, and Artificial Neural Networks",
    src: "/quick-images/ai-ml-dl-ann-relationship.webp",
  },
  {
    title: "Applications of Machine learning",
    src: "/quick-images/applications-of-machine-learning.webp",
  },
  {
    title: "Under-fitting, Optimal-fitting, Over-fitting",
    src: "/quick-images/under-optimal-over-fitting.webp",
  },
];
