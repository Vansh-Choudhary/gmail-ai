// pages/api/classify-emails.js
import { classifyEmails } from '../../lib/gemini';

export default async function handler(req, res) {
  const { emails } = req.body;

  // Log the request body to ensure it contains the emails
  console.log('Request body:', req.body);

  if (!emails || !Array.isArray(emails)) {
    return res.status(400).json({ error: 'Invalid request body, expected an array of emails.' });
  }

  try {
    // Log the emails to be classified
    console.log('Emails to be classified:', emails);

    const classifiedEmails = await classifyEmails(emails);

    // Log the classified emails
    console.log('Classified emails:', classifiedEmails);

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
