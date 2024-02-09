import { NextApiRequest, NextApiResponse } from 'next';
import { sendMail } from 'helper_functions/mailService';
import { FormContent } from '@data/types';

// This is an example of how to send a server-side email
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    switch (method) {
      case 'POST':
        if (!req.body) {
          throw new Error('Request body is undefined');
        }
        await sendMail({content: JSON.parse(req.body) as FormContent});
        res.status(200).json({ message: 'Email sent successfully' });
        break;
      default:
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${method} Not Allowed`);
    }
  } catch (err: any) {
    res.status(500).json({
      error_code: 'api_error',
      message: err.message,
    });
  }
};