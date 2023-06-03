import axios, { AxiosResponse } from "axios";
import * as queryString from "querystring";

interface GithubUserInfo {
  email: string;
  name: string;
  photo_url: string;
  bio: string;
}

interface GithubAccessTokenResponseData {
  access_token: string;
}

const REDIRECT_URI = process.env.APP_URL + "/api/auth/github/callback";

// Returns the URL for initiating the GitHub OAuth2 login flow
export function getGithubLoginUrl(): string {
  const stringifiedParams = queryString.stringify({
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    scope: "user:email",
  });

  return `https://github.com/login/oauth/authorize?${stringifiedParams}`;
}

// Fetches an access token from the GitHub OAuth2 API using an authorization code
export async function getGithubAccessTokenFromCode(
  code: string
): Promise<string> {
  const url = `https://github.com/login/oauth/access_token`;
  const method = "post";
  const data = {
    client_id: process.env.GITHUB_CLIENT_ID,
    client_secret: process.env.GITHUB_CLIENT_SECRET,
    redirect_uri: REDIRECT_URI,
    code,
  };
  const headers = { Accept: "application/json" };
  const response: AxiosResponse<GithubAccessTokenResponseData> = await axios({
    url,
    method,
    data,
    headers,
  });
  return response.data.access_token;
}

// Fetches user information from the GitHub OAuth2 API
async function fetchEmails(access_token: string): Promise<AxiosResponse> {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const url = "https://api.github.com/user/emails";
  const method = "get";
  const response = await axios({
    url,
    method,
    headers,
  });
  return response;
}

// Fetches user information from the GitHub OAuth2 API
async function fetchUserInfo(access_token: string): Promise<AxiosResponse> {
  const headers = {
    Authorization: `Bearer ${access_token}`,
  };
  const url = "https://api.github.com/user";
  const method = "get";
  const response = await axios({
    url,
    method,
    headers,
  });
  return response;
}

// Gets user information by calling the two API requests asynchronously
export async function getGithubUserInfo(
  access_token: string
): Promise<GithubUserInfo> {
  const [emailsResponse, userInfoResponse] = await Promise.all([
    fetchEmails(access_token),
    fetchUserInfo(access_token),
  ]);

  const email: string = emailsResponse.data[0].email;
  const name: string =
    userInfoResponse.data.name || userInfoResponse.data.login;
  const photo_url: string = userInfoResponse.data.avatar_url;
  const bio: string = userInfoResponse.data.bio;

  return {
    email,
    name,
    photo_url,
    bio,
  };
}
