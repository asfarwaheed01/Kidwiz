import { ASSETS } from '../../../config/assets';

const WheelSegmentColors = [
  '#BDEE77',
  '#ECC283',
  '#A1D8E4',
  '#C792C8',
  '#FC99CE',
];

const WheelData = [
  {
    id: `category-1`,
    category: 'Category 1',
    subjects: [
      {
        id: `category-1-subject-1`,
        iconPath: ASSETS.SUBJECTS.MATH,
        title: 'Math',
        topics: [
          {
            id: `category-1-subject-1-topic-1`,
            name: 'Geometry & Shapes',
          },
          {
            id: `category-1-subject-1-topic-2`,
            name: 'Addition & Substraction',
          },
          {
            id: `category-1-subject-1-topic-3`,
            name: 'Multiplication & Division',
          },
          {
            id: `category-1-subject-1-topic-4`,
            name: 'Fraction & Decimals',
          },
          {
            id: `category-1-subject-1-topic-5`,
            name: 'Data & Measurements',
          },
        ],
      },
      {
        id: `category-1-subject-2`,
        iconPath: ASSETS.SUBJECTS.MONEY,
        title: 'Money',
        topics: [
          {
            id: `category-1-subject-2-topic-1`,
            name: 'Counting Coins',
          },
          {
            id: `category-1-subject-2-topic-2`,
            name: 'Saving & Budgeting',
          },
          {
            id: `category-1-subject-2-topic-3`,
            name: 'Investing & Compound Interest',
          },
          {
            id: `category-1-subject-2-topic-4`,
            name: 'Understanding Exchange Rates',
          },
          {
            id: `category-1-subject-2-topic-5`,
            name: 'Financial Literacy',
          },
        ],
      },
      {
        id: `category-1-subject-3`,
        iconPath: ASSETS.SUBJECTS.MUSIC,
        title: 'Music',
        topics: [
          {
            id: `category-1-subject-3-topic-1`,
            name: 'Music Theory',
          },
          {
            id: `category-1-subject-3-topic-2`,
            name: 'Famous Composers',
          },
          {
            id: `category-1-subject-3-topic-3`,
            name: 'Musical Genres',
          },
          {
            id: `category-1-subject-3-topic-4`,
            name: 'Playing Musical Instruments',
          },
          {
            id: `category-1-subject-3-topic-5`,
            name: 'Music Notation',
          },
        ],
      },
    ],
  },
  {
    id: `category-2`,
    category: 'Category 2',
    subjects: [
      {
        id: `category-2-subject-1`,
        iconPath: ASSETS.SUBJECTS.INNOVATION,
        title: 'Innovation',
        topics: [
          {
            id: `category-2-subject-1-topic-1`,
            name: 'History of Innovation',
          },
          {
            id: `category-2-subject-1-topic-2`,
            name: 'Innovative Technologies',
          },
          {
            id: `category-2-subject-1-topic-3`,
            name: 'Innovation in Medicine',
          },
          {
            id: `category-2-subject-1-topic-4`,
            name: 'Famous Innovators',
          },
          {
            id: `category-2-subject-1-topic-5`,
            name: 'Innovation and Society',
          },
        ],
      },
      {
        id: `category-2-subject-2`,
        iconPath: ASSETS.SUBJECTS.EMOTIONS,
        title: 'Emotions',
        topics: [
          {
            id: `category-2-subject-2-topic-1`,
            name: 'Understanding Emotions',
          },
          {
            id: `category-2-subject-2-topic-2`,
            name: 'Emotional Intelligence',
          },
          {
            id: `category-2-subject-2-topic-3`,
            name: 'Coping with Stress',
          },
          {
            id: `category-2-subject-2-topic-4`,
            name: 'Expressing Feelings',
          },
          {
            id: `category-2-subject-2-topic-5`,
            name: 'Emotions and Mental Health',
          },
        ],
      },
      {
        id: `category-2-subject-3`,
        iconPath: ASSETS.SUBJECTS.LOGIC,
        title: 'Login',
        topics: [
          {
            id: `category-2-subject-3-topic-1`,
            name: 'Logical Reasoning',
          },
          {
            id: `category-2-subject-3-topic-2`,
            name: 'Problem Solving',
          },
          {
            id: `category-2-subject-3-topic-3`,
            name: 'Critical Thinking',
          },
          {
            id: `category-2-subject-3-topic-4`,
            name: 'Deductive Reasoning',
          },
          {
            id: `category-2-subject-3-topic-5`,
            name: 'Inductive Reasoning',
          },
        ],
      },
      {
        id: `category-2-subject-4`,
        iconPath: ASSETS.SUBJECTS.LIFE_SKILLS,
        title: 'Life Skills',
        topics: [
          {
            id: `category-2-subject-4-topic-1`,
            name: 'Time Management',
          },
          {
            id: `category-2-subject-4-topic-2`,
            name: 'Effective Communication',
          },
          {
            id: `category-2-subject-4-topic-3`,
            name: 'Decision Making',
          },
          {
            id: `category-2-subject-4-topic-4`,
            name: 'Problem Solving',
          },
          {
            id: `category-2-subject-4-topic-5`,
            name: 'Goal Setting',
          },
        ],
      },
    ],
  },
  {
    id: `category-3`,
    category: 'Category 3',
    subjects: [
      {
        id: `category-3-subject-1`,
        iconPath: ASSETS.SUBJECTS.SCIENCE,
        title: 'Science',
        topics: [
          {
            id: `category-3-subject-1-topic-1`,
            name: 'Physics',
          },
          {
            id: `category-3-subject-1-topic-2`,
            name: 'Chemistry',
          },
          {
            id: `category-3-subject-1-topic-3`,
            name: 'Biology',
          },
          {
            id: `category-3-subject-1-topic-4`,
            name: 'Astronomy',
          },
          {
            id: `category-3-subject-1-topic-5`,
            name: 'Geology',
          },
        ],
      },
      {
        id: `category-3-subject-2`,
        iconPath: ASSETS.SUBJECTS.BIOLOGY,
        title: 'Biology',
        topics: [
          {
            id: `category-3-subject-2-topic-1`,
            name: 'Cell Biology',
          },
          {
            id: `category-3-subject-2-topic-2`,
            name: 'Genetics',
          },
          {
            id: `category-3-subject-2-topic-3`,
            name: 'Ecology',
          },
          {
            id: `category-3-subject-2-topic-4`,
            name: 'Evolution',
          },
          {
            id: `category-3-subject-2-topic-5`,
            name: 'Human Anatomy',
          },
        ],
      },
      {
        id: `category-3-subject-3`,
        iconPath: ASSETS.SUBJECTS.ENVIRONMENT,
        title: 'Environment',
        topics: [
          {
            id: `category-3-subject-3-topic-1`,
            name: 'Climate Change',
          },
          {
            id: `category-3-subject-3-topic-2`,
            name: 'Renewable Energy',
          },
          {
            id: `category-3-subject-3-topic-3`,
            name: 'Conservation',
          },
          {
            id: `category-3-subject-3-topic-4`,
            name: 'Pollution Control',
          },
          {
            id: `category-3-subject-3-topic-5`,
            name: 'Sustainable Development',
          },
        ],
      },
    ],
  },
  {
    id: `category-4`,
    category: 'Category 4',
    subjects: [
      {
        id: `category-4-subject-1`,
        iconPath: ASSETS.SUBJECTS.LANGUAGES,
        title: 'Languages',
        topics: [
          {
            id: `category-4-subject-1-topic-1`,
            name: 'English Language',
          },
          {
            id: `category-4-subject-1-topic-2`,
            name: 'Spanish Language',
          },
          {
            id: `category-4-subject-1-topic-3`,
            name: 'French Language',
          },
          {
            id: `category-4-subject-1-topic-4`,
            name: 'Chinese Language',
          },
          {
            id: `category-4-subject-1-topic-5`,
            name: 'Arabic Language',
          },
        ],
      },
      {
        id: `category-4-subject-2`,
        iconPath: ASSETS.SUBJECTS.SOCIAL_STUDY,
        title: 'Social Study',
        topics: [
          {
            id: `category-4-subject-2-topic-1`,
            name: 'History',
          },
          {
            id: `category-4-subject-2-topic-2`,
            name: 'Geography',
          },
          {
            id: `category-4-subject-2-topic-3`,
            name: 'Civics',
          },
          {
            id: `category-4-subject-2-topic-4`,
            name: 'Economics',
          },
          {
            id: `category-4-subject-2-topic-5`,
            name: 'Culture & Society',
          },
        ],
      },
    ],
  },
  {
    id: `category-5`,
    category: 'Category 5',
    subjects: [
      {
        id: `category-5-subject-1`,
        iconPath: ASSETS.SUBJECTS.ENGLISH,
        title: 'English',
        topics: [
          {
            id: `category-5-subject-1-topic-1`,
            name: 'Grammar',
          },
          {
            id: `category-5-subject-1-topic-2`,
            name: 'Vocabulary',
          },
          {
            id: `category-5-subject-1-topic-3`,
            name: 'Reading Comprehension',
          },
          {
            id: `category-5-subject-1-topic-4`,
            name: 'Writing Skills',
          },
          {
            id: `category-5-subject-1-topic-5`,
            name: 'Literature',
          },
        ],
      },
      {
        id: `category-5-subject-2`,
        iconPath: ASSETS.SUBJECTS.CODING,
        title: 'Coding',
        topics: [
          {
            id: `category-5-subject-2-topic-1`,
            name: 'Introduction to Programming',
          },
          {
            id: `category-5-subject-2-topic-2`,
            name: 'Web Development',
          },
          {
            id: `category-5-subject-2-topic-3`,
            name: 'Mobile App Development',
          },
          {
            id: `category-5-subject-2-topic-4`,
            name: 'Data Science & Analysis',
          },
          {
            id: `category-5-subject-2-topic-5`,
            name: 'Game Development',
          },
        ],
      },
    ],
  },
];

export { WheelData, WheelSegmentColors };
