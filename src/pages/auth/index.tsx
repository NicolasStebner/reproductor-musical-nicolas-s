import { useEffect } from "react";
import { useAuth } from "../../providers/auth/AuthContext";
import { AuthPageSecondary } from "./page";
import { useNavigate } from "react-router-dom";
const clientId = import.meta.env.VITE_CLIENT_ID;

export function AuthPage() {
  const { changeAccessToken, access_token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const getToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      let code = urlParams.get("code");
      //tiene codigo
      if (!code) {
        redirectToAuthCodeFlow();
      } else {
        if (access_token == null) {
          return await getAccessToken(code);
        }
      }
    };
    getToken().then((data) => {
      if (data) {
        changeAccessToken(data);
        navigate("/");
      }
    });
  });
  return <AuthPageSecondary />;
}

async function redirectToAuthCodeFlow() {
  // TODO: Redirect to Spotify authorization page
  const verifier = generateCodeVerifier(128);
  const challenge = await generateCodeChallenge(verifier);
  localStorage.setItem("verifier", verifier);

  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("response_type", "code");
  params.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);
  params.append("scope", import.meta.env.VITE_SCOPE);
  params.append("code_challenge_method", "S256");
  params.append("code_challenge", challenge);

  document.location = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length: any) {
  let text = "";
  let possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

async function generateCodeChallenge(codeVerifier: any) {
  const data = new TextEncoder().encode(codeVerifier);
  const digest = await window.crypto.subtle.digest("SHA-256", data);
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/*  */
async function getAccessToken(code: string) {
  const verifier = localStorage.getItem("verifier");
  const params = new URLSearchParams();
  params.append("client_id", clientId);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", import.meta.env.VITE_REDIRECT_URI);
  params.append("code_verifier", verifier!);

  const result = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: params,
  });

  const object = await result.json();
  console.log("acess token: " + JSON.stringify(object));

  return object.access_token;
}
