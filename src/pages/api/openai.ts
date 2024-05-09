// pages/api/openai.js
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

import prisma from '../../lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const userId = req.body.userId;
    const message = req.body.message;
    try {
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
        select: {
          chatRestriction: true,
        },
      });
      if (
        user?.chatRestriction &&
        user?.chatRestriction.lastUpdated.toISOString().slice(0, 10) !== new Date().toISOString().slice(0, 10)
      ) {
        await prisma.chatRestriction.update({
          where: {
            userId: userId,
          },
          data: {
            lastUpdated: new Date(),
            count: 1,
          },
        });
      } else {
        await prisma.chatRestriction.update({
          where: {
            userId: userId,
          },
          data: {
            count: {
              increment: 1,
            },
          },
        });
      }
      if (user?.chatRestriction?.count && user.chatRestriction.count > 5) {
        res.status(429).json({ status: 429, message: 'You have exceeded the number of requests limit' });
        return;
      }
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      if (message.content.includes('I would like to ask for good matching pieces for this item below')) {
        const response = await openai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content:
                'Please provide three clothing options along with a one short sentence explanation for each choice as follows: Option 1: [clothing option 1] Reason: [one sentence reason]  Option 2: [clothing option 2] Reason: [one sentence reason]  Option 3: [clothing option 3] Reason: [one sentence reason]. Each option should be separated by a new empty line.',
            },
            message,
          ],
          model: 'gpt-3.5-turbo',
          temperature: 1,
        });

        res.status(200).json(response.choices[0]);
      } else {
        const response = await openai.chat.completions.create({
          messages: [
            {
              role: 'system',
              content:
                'you are helpful assistance. you can answer questions about fashion and clothing. when User ask something not related to fashion, you can say "I am a fashion assistant and I can only answer questions related to fashion and clothing. Please ask me a question about fashion or clothing."',
            },
            message,
          ],
          model: 'gpt-3.5-turbo',
          temperature: 1,
          max_tokens: 500,
        });

        res.status(200).json(response.choices[0]);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error communicating with OpenAI API' });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
