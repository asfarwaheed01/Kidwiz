const Tiers = ['Basic', 'Pro', 'Premium'];

const RolePlayingTopic = {
  id: 'role-playing-topic-1',
  title: 'Discipline and Behavior',
  tier: Tiers[Math.floor(Math.random() * Tiers.length)],
  description: 'Teach your child to be more disciplined',
  prompt: `Talk about discipline`,
  subRolePlayingTopics: [
    {
      id: 'sub-role-playing-topic-1',
      title: 'Emotional coping skills',
      description: 'Explore emotional coping skills!',
      prompt: `Talk about emotional coping skills`,
    },
    {
      id: 'sub-role-playing-topic-2',
      title: 'Social skills',
      description: 'Explore social skills!',
      prompt: `Talk about social skills`,
    },
    {
      id: 'sub-role-playing-topic-3',
      title: 'Self-care',
      description: 'Explore self-care!',
      prompt: `Talk about self-care`,
    },
    {
      id: 'sub-role-playing-topic-4',
      title: 'Self-esteem',
      description: 'Explore self-esteem!',
      prompt: `Talk about self-esteem`,
    },
  ],
};

const RolePlayingTopicsData = [
  ...Array(10)
    .fill(RolePlayingTopic)
    .map((rolePlayingTopic, index) => ({
      ...rolePlayingTopic,
      id: `role-playing-topic-${index + 1}`,
      title: `Role Playing Topic ${index + 1}`,
      tier: Tiers[Math.floor(Math.random() * Tiers.length)],
    })),
];

export { RolePlayingTopicsData };
