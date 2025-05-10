interface ApiRequestOptions {
  path: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
}

const defaultHeaders = {
  "Content-Type": "application/json",
};

export async function apiRequest<T>({
  path,
  method,
  body,
  headers,
}: ApiRequestOptions): Promise<T> {
  const mergedHeaders = { ...defaultHeaders, ...headers };

  const options = {
    method,
    headers: mergedHeaders,
    body: body ? JSON.stringify(body) : undefined,
  };

  const response = await fetch(
    new URL(path, process.env.NEXT_PUBLIC_API_URL),
    options,
  );
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Request failed with status ${response.status}: ${errorText}`,
    );
  }
  return response.json() as Promise<T>;
}

export async function getSurveys() {
  return apiRequest({
    path: "/surveys",
    method: "GET",
  });
}

export async function createSurvey(survey: Record<string, unknown>) {
  return apiRequest({
    path: "/surveys",
    method: "POST",
    body: survey,
  });
}

export async function getSurvey(slug: string) {
  return apiRequest({
    path: `/surveys/${slug}`,
    method: "GET",
  });
}
