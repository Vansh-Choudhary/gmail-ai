// lib/google.js
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://gmail-ai-six.vercel.app/api/auth/callback'
);

export function getOAuth2Client() {
  return oAuth2Client;
}

export async function getAuthenticatedClient(tokens) {
  oAuth2Client.setCredentials(tokens);
  return oAuth2Client;
}

export async function getUserProfile(authClient) {
  const oauth2 = google.oauth2({
    auth: authClient,
    version: 'v2',
  });

  const res = await oauth2.userinfo.get();
  return res.data;
}

export async function getEmails(authClient, limit = 20) {
  const gmail = google.gmail({ version: 'v1', auth: authClient });
  const res = await gmail.users.messages.list({
    userId: 'me',
    maxResults: limit,
  });

  const messages = await Promise.all(
    res.data.messages.map(async (msg) => {
      const message = await gmail.users.messages.get({
        userId: 'me',
        id: msg.id,
      });
      return {
        id: message.data.id,
        snippet: message.data.snippet,
        from: message.data.payload.headers.find(header => header.name === 'From').value,
        subject: message.data.payload.headers.find(header => header.name === 'Subject').value,
      };
    })
  );

  return messages;
}
