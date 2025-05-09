'use client';

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    let errorText = 'API request failed';
    try {
      const errJson = await res.json();
      if (errJson && errJson.message) {
        errorText = errJson.message;
      }
    } catch (e) {
      // If we can't parse the error as JSON, use the status text
      errorText = res.statusText || errorText;
    }
    throw new Error(errorText);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: any
): Promise<any> {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(url, options);
  await throwIfResNotOk(res);
  
  // Não tentar parsear JSON se a resposta for 204 No Content
  if (res.status === 204) {
    return null;
  }
  
  return res.json();
}