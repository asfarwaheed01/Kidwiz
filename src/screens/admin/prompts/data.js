const FoundationalPromptData = {
  id: `foundational-prompt-0`,
  title: 'Magic Summary',
  tier: 'Basic',
  type: 'foundational',
  prompts: [
    'Identify the main themes and recurring patterns in the journal entries, and summarize their significance.',
    'Condense the content of the journal entries into a succinct summary, capturing the essential information and key takeaways.',
    'Condense the content of the journal entries into a succinct summary, capturing the essential information and key takeaways.',
  ],
  tags: ['Important', 'Text'],
};

const ButtonsPromptData = {
  id: `buttons-prompt-0`,
  title: 'Magic Summary',
  tier: 'Basic',
  type: 'buttons',
  buttonLabel: 'Summarize Using AI Magic',
  buttonId: 'B65',
  scoring: true,
  prompts: [
    'Identify the main themes and recurring patterns in the journal entries, and summarize their significance.',
    'Condense the content of the journal entries into a succinct summary, capturing the essential information and key takeaways.',
    'Condense the content of the journal entries into a succinct summary, capturing the essential information and key takeaways.',
  ],
  tags: ['Important', 'Text'],
};

const ChatPromptData = {
  id: `chat-prompt-0`,
  title: 'Magic Summary',
  tier: 'Pro',
  buttonLabel: 'Summarize Using AI Magic',
  type: 'chat-command',
  prompts: [
    'Identify the main themes and recurring patterns in the journal entries, and summarize their significance.',
    'Condense the content of the journal entries into a succinct summary, capturing the essential information and key takeaways.',
    'Condense the content of the journal entries into a succinct summary, capturing the essential information and key takeaways.',
  ],
  tags: ['Important', 'Text'],
};

const tiers = ['Basic', 'Pro', 'Premium'];

const PromptsData = [
  FoundationalPromptData,
  ...Array(10)
    .fill(FoundationalPromptData)
    .map((prompt, index) => ({
      ...prompt,
      id: `foundational-prompt-${index + 1}`,
      title: `Prompt ${index + 1}`,
      tier: tiers[index % 3],
    })),

  ButtonsPromptData,
  ...Array(10)
    .fill(ButtonsPromptData)
    .map((prompt, index) => ({
      ...prompt,
      id: `buttons-prompt-${index + 1}`,
      title: `Prompt ${index + 1}`,
      tier: tiers[index % 3],
    })),

  ChatPromptData,
  ...Array(10)
    .fill(ChatPromptData)
    .map((prompt, index) => ({
      ...prompt,
      id: `chat-prompt-${index + 1}`,
      title: `Prompt ${index + 1}`,
      tier: tiers[index % 3],
    })),
];

export { PromptsData };
