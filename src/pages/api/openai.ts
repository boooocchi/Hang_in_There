// pages/api/openai.js
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: req.body.messages,
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
