import { ASSETS } from '../../../config/assets';

const Colors = [
  { value: '#BDEE77', label: '#BDEE77' },
  { value: '#ECC283', label: '#ECC283' },
  { value: '#A1D8E4', label: '#A1D8E4' },
  { value: '#FC99CE', label: '#FC99CE' },
  { value: '#C792C8', label: '#C792C8' },
];

const Tiers = ['Basic', 'Pro', 'Premium'];

const SubjectData = {
  id: 'subject-1',
  title: 'Science',
  tier: Tiers[Math.floor(Math.random() * Tiers.length)],
  description: 'Explore the wonders of the world!',
  iconPath: ASSETS.SUBJECTS.SCIENCE,
  color: Colors[Math.floor(Math.random() * Colors.length)],
  prompt: `Talk about science`,
  minAge: 5,
  maxAge: 10,
  subSubjects: [
    {
      id: 'sub-subject-1',
      title: 'Animals and their habitats',
      description: 'Learn about animals and their habitats',
      prompt: `Talk about animals and their habitats`,
    },
    {
      id: 'sub-subject-2',
      title: 'Plants and their habitats',
      description: 'Learn about plants and their habitats',
      prompt: `Talk about plants and their habitats`,
    },
    {
      id: 'sub-subject-3',
      title: 'The human body',
      description: 'Learn about the human body',
      prompt: `Talk about the human body`,
    },
    {
      id: 'sub-subject-4',
      title: 'The solar system',
      description: 'Learn about the solar system',
      prompt: `Talk about the solar system`,
    },
  ],
};

const SubjectsData = [
  ...Array(10)
    .fill(SubjectData)
    .map((subject, index) => ({
      ...subject,
      id: `subject-${index + 1}`,
      title: `Subject ${index + 1}`,
      color: Colors[Math.floor(Math.random() * Colors.length)],
      tier: Tiers[Math.floor(Math.random() * Tiers.length)],
    })),
];

export { Colors, SubjectsData };
