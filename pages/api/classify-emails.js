// pages/api/classify-emails.js
import { classifyEmails } from '../../lib/gemini';

export default async function handler(req, res) {
  const { emails } = req.body;

  try {
    const classifiedEmails = await classifyEmails(emails);

    const categorizedEmails = emails.map((email, index) => ({
      ...email,
      category: classifiedEmails[index],
    }));

    res.status(200).json({ emails: categorizedEmails });
  } catch (error) {
    console.error('Error classifying emails:', error);
    res.status(500).json({ error: 'Error classifying emails, please try again later.' });
  }
}
