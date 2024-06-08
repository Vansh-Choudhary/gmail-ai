// pages/api/emails.js
import { getAuthenticatedClient, getEmails, getUserProfile } from '../../lib/google';

export default async function handler(req, res) {
  const { token } = req.cookies;
  const { limit = 20 } = req.query;

  if (!token) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  try {
    const authClient = await getAuthenticatedClient({ access_token: token });
    const emails = await getEmails(authClient, limit);
    const userProfile = await getUserProfile(authClient);

    res.status(200).json({ emails, userProfile });
  } catch (error) {
    console.error('Error fetching emails or user profile:', error);
    res.status(500).json({ error: 'Error fetching emails or user profile, please try again later.' });
  }
}
