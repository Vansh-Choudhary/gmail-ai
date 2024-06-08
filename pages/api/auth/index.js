// pages/api/auth/index.js
import { getOAuth2Client } from '../../../lib/google';

export default function handler(req, res) {
  const oAuth2Client = getOAuth2Client();
  const url = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/gmail.readonly'
    ],
  });
  res.redirect(url);
}
