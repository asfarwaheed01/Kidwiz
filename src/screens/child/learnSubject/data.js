const SubjectData = [
  {
    id: 1,
    title: 'Science',
    description: 'Explore the world of science!',
    iconPath: '',
    color: '#BDEE77',
    isUnlocked: true,
  },
  {
    id: 2,
    title: 'Biology',
    description: 'Discover the secrets of living organisms!',
    iconPath: '',
    color: '#BDEE77',
    isUnlocked: false,
  },
  {
    id: 3,
    title: 'English',
    description: 'Enhance your language and communication!',
    iconPath: '',
    color: '#A1D8E4',
    isUnlocked: true,
  },
  {
    id: 4,
    title: 'Math',
    description: 'Master numbers and problem-solving!',
    iconPath: '',
    color: '#C792C8',
    isUnlocked: true,
  },
  {
    id: 5,
    title: 'Social Study',
    description: 'Journey through history and society!',
    iconPath: '',
    color: '#ECC283',
    isUnlocked: true,
  },
];

const SubjectDetailData = [
  {
    id: 1,
    title: 'Animals and Their Habitats',
  },
  {
    id: 2,
    title: 'Plants and Photosynthesis',
  },
  {
    id: 3,
    title: 'Scientific Method and Experiments',
  },
  {
    id: 4,
    title: 'Animals and Their Habitats',
  },
  {
    id: 5,
    title: 'Weather and Climate',
  },
];

const GoalsOfTodayData = {
  percentage: 50,
  remainingTime: '4 hrs 20 mins',
  subjectVise: [
    {
      title: 'Science, biology, & Environment',
      color: '#BDEE77',
      remainingTime: '20 min',
      percentage: 80,
    },
    {
      title: 'English & Coding',
      color: '#ECC283',
      remainingTime: '15 min',
      percentage: 40,
    },
    {
      title: 'Math, Money, & Music',
      color: '#A1D8E4',
      remainingTime: '17 min',
      percentage: 33,
    },
    {
      title: 'Social Study & Languages',
      color: '#FC99CE',
      remainingTime: '1 hrs 11 min',
      percentage: 24,
    },
    {
      title: 'Logic, Life, Emotions, & Innovation',
      color: '#C792C8',
      remainingTime: '47 min',
      percentage: 50,
    },
  ],
};

export { SubjectData, SubjectDetailData, GoalsOfTodayData };
