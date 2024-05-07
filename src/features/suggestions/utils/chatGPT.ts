import { smtWentWrongMessage } from '@/constants/Message';
import { getErrorMessage } from '@/utils/errorHandler';

export const generateAIAdvise = async (message: string, userId: string) => {
  try {
    const response = await fetch('/api/openai', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: { role: 'user', content: message },
        userId,
      }),
    });

    return await response.json();
  } catch (error) {
    throw new Error(getErrorMessage(error) || smtWentWrongMessage);
  }
};
