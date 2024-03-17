const Subjects = [
  { value: 'subject-1', label: 'Animals' },
  { value: 'subject-2', label: 'Art' },
  { value: 'subject-3', label: 'Biology' },
  { value: 'subject-4', label: 'Business' },
  { value: 'subject-5', label: 'Chemistry' },
  { value: 'subject-6', label: 'Computer Science' },
];

const Tiers = ['Basic', 'Pro', 'Premium'];

const QuizData = {
  id: 'quiz-1',
  title: 'Animals Quiz',
  tier: Tiers[Math.floor(Math.random() * Tiers.length)],
  subject: Subjects[Math.floor(Math.random() * Subjects.length)],
  prompt: `Generate a quiz about animals and their habitats. Include multiple-choice and true/false questions to test the participants' knowledge of different ecosystems, animal behaviors, physical adaptations, and the relationships between animals and their environments.`,
};

const QuizzesData = [
  ...Array(10)
    .fill(QuizData)
    .map((quiz, index) => ({
      ...quiz,
      id: `quiz-${index + 1}`,
      title: `Quiz ${index + 1}`,
      tier: Tiers[Math.floor(Math.random() * Tiers.length)],
      subject: Subjects[Math.floor(Math.random() * Subjects.length)],
    })),
];

export { Subjects, QuizzesData };
