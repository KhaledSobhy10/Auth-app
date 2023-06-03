import axios, { AxiosResponse } from "axios";
import * as queryString from "querystring";

interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

// Returns the URL for initiating the Google OAuth2 login flow
export function getGoogleLoginUrl(): string {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.APP_URL + "/api/auth/google/callback",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;
}

// Fetches user information from the Google OAuth2 API
export async function getGoogleUserInfo(
  access_token: string
): Promise<GoogleUserInfo> {
  const url = "https://www.googleapis.com/oauth2/v2/userinfo";
  const method = "get";
  const headers = { Authorization: `Bearer ${access_token}` };
  const response: AxiosResponse = await axios({
    url,
    method,
    headers,
  });
  return response.data;
}

// Fetches an access token from the Google OAuth2 API using an authorization code
export async function getAccessTokenFromCode(code: string): Promise<string> {
  const url = "https://oauth2.googleapis.com/token";
  const method = "post";
  const data = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: process.env.APP_URL + "/api/auth/google/callback",
    grant_type: "authorization_code",
    code,
  };
  const response: AxiosResponse = await axios({
    url,
    method,
    data,
  });
  return response.data.access_token;
}
