export const ROUTES = {
  INDEX: '/',
  AUTHENTICATION: {
    LOGIN: '/login',
    SIGN_UP: '/sign-up',
    RESET_PASSWORD: '/reset-password',
    CONFIRM_PASSWORD:'/recovery-password/:token',
    CONFIRMATION: '/confirmation',
  },
  ON_BOARDING: {
    ADD_CHILDREN: '/add-children',
    PERSONALITY_TESTS: '/personality-tests',
    BIG_FIVE_PERSONALITY: {
      INTRO: '/personality-tests/big-five-personality/',
      QUESTIONS: '/personality-tests/big-five-personality/questions',
      RESULT: '/personality-tests/big-five-personality/result',
    },
    EMOTIONAL_INTELLIGENCE: {
      INTRO: '/personality-tests/emotional-intelligence/',
      QUESTIONS: '/personality-tests/emotional-intelligence/questions',
      RESULT: '/personality-tests/emotional-intelligence/result',
    },
    CONFLICT_RESOLUTION_STYLE: {
      INTRO: '/personality-tests/conflict-resolution-style/',
      QUESTIONS: '/personality-tests/conflict-resolution-style/questions',
      RESULT: '/personality-tests/conflict-resolution-style/result',
    },
    VALUES_ASSESSMENT: {
      INTRO: '/personality-tests/values-assessment/',
      QUESTIONS: '/personality-tests/values-assessment/questions',
      RESULT: '/personality-tests/values-assessment/result',
    },
    VOICE_CLONE: {
      VOICE: '/personality-tests/voice-clone/',
      CLONING_DONE: '/personality-tests/voice-clone/cloning-done',
    },
  },
  PARENT: {
    DASHBOARD: {
      INDEX: '/parent-dashboard',
    },
    PERFORMANCE: {
      INDEX: '/parent-dashboard/performance',
    },
    LEARN_SUBJECT: {
      INDEX: '/parent-dashboard/learn-subject',
      DETAIL: '/parent-dashboard/learn-subject/:subjectId',
      CHAT: '/parent-dashboard/learn-subject/:subjectId/:courseId/chat',
    },
    DAILY_QUIZ: {
      INDEX: '/parent-dashboard/daily-quiz',
      RESULT: '/parent-dashboard/daily-quiz/result',
    },
    IMPROVE_PARENTING: {
      INDEX: '/parent-dashboard/improve-parenting',
      CHAT: '/parent-dashboard/improve-parenting/:topicId/:subTopicId/chat',
    },
    EXPLORE: {
      INDEX: '/parent-dashboard/explore',
    },
    JOURNAL: {
      INDEX: '/parent-dashboard/journal',
    },
    SETTINGS: {
      INDEX: '/parent-dashboard/settings',
    },
    LOGOUT: {
      INDEX: '/login',
      // INDEX: '/parent-dashboard/logout',
    },
  },
  CHILD: {
    DASHBOARD: {
      INDEX: '/child-dashboard',
    },
    REPORT_CARD: {
      INDEX: '/child-dashboard/report-card',
    },
    LEARN_SUBJECT: {
      INDEX: '/child-dashboard/learn-subject',
      DETAIL: '/child-dashboard/learn-subject/:subjectId',
      CHAT: '/child-dashboard/learn-subject/chat',
    },
    DAILY_QUIZ: {
      INDEX: '/child-dashboard/daily-quiz',
    },
    EXPLORE: {
      INDEX: '/child-dashboard/explore',
    },
    LOGOUT: {
      INDEX: '/login',
      // INDEX: '/child-dashboard/logout',
    },
  },
  ADMIN: {
    DASHBOARD: {
      INDEX: '/admin-dashboard',
    },
    PROMPTS: {
      INDEX: '/admin-dashboard/prompts',
    },
    QUIZZES: {
      INDEX: '/admin-dashboard/quizzes',
    },
    SUBJECTS: {
      INDEX: '/admin-dashboard/subjects',
    },
    ROLE_PLAYING: {
      INDEX: '/admin-dashboard/role-playing',
    },
    AI_TRAINING: {
      INDEX: '/admin-dashboard/ai-training',
    },
    KEYWORDS_ALERT: {
      INDEX: '/admin-dashboard/keywords-alert',
    },
    LOGOUT: {
      INDEX: '/login',
      // INDEX: '/admin-dashboard/logout',
    },
  },
};
