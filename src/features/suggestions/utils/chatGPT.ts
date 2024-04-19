// import { ChatCompletionContentPartImage } from 'openai/resources/index.mjs';

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

// export const generateAIAdviseWithImage = async (url: ChatCompletionContentPartImage.ImageURL) => {
//   const response = await fetch('/api/openai', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       messages: [
//         {
//           role: 'user',
//           content: [
//             { type: 'text', text: 'What kind of clothes can be paired with this piece of clothes?' },
//             {
//               type: 'image_url',
//               image_url: {
//                 url: url,
//                 detail: 'low',
//               },
//             },
//           ],
//         },
//       ],
//     }),
//   });
