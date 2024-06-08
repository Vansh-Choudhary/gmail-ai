// pages/api/auth/callback.js
import { getOAuth2Client, getAuthenticatedClient } from '../../../lib/google';

export default async function handler(req, res) {
  const oAuth2Client = getOAuth2Client();
  const { code } = req.query;

  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);

  const userInfoRes = await oAuth2Client.request({ url: 'https://www.googleapis.com/oauth2/v3/userinfo' });
  const userInfo = userInfoRes.data;

  res.setHeader(
    'Set-Cookie',
    `token=${tokens.access_token}; HttpOnly; Path=/; Max-Age=${tokens.expiry_date - Date.now() / 1000}`
  );

  res.redirect(`/emails?name=${userInfo.name}&email=${userInfo.email}`);
}
