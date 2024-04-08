// pages/api/openai.js
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

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
