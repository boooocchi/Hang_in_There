import { smtWentWrongMessage } from '@/constants/Message';

export const generateAIAdvise = async (message: string) => {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: { role: 'user', content: message },
      }),
    });

    return await response.json();
  } catch (error) {
    throw new Error(smtWentWrongMessage);
  }
};
