/**
 * HTTP client - generic fetch wrapper
 */
import { getJwtToken } from "../../state/stateStore";

export async function httpRequest<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  const token = getJwtToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
    let message = `HTTP error! status: ${response.status}`;
    try {
      const errorBody = await response.json();
      message = errorBody?.message || message;
    } catch {}
    throw new Error(message);
  }

  return response.json() as Promise<T>;
}
