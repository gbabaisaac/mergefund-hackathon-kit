import type { ApiEndpoint, ApiParameter } from "@/data/mock-api-endpoints";

export type CodeLanguage = "cURL" | "JavaScript" | "Python";

export type ApiRequestDraft = {
  parameters: ApiParameter[];
  requestBody?: string;
};

export function createRequestDraft(endpoint: ApiEndpoint): ApiRequestDraft {
  return {
    parameters: endpoint.parameters.map((parameter) => ({ ...parameter })),
    requestBody: endpoint.requestBody,
  };
}

export function buildRequestUrl(
  endpoint: ApiEndpoint,
  draft: ApiRequestDraft,
) {
  let path = endpoint.path;
  draft.parameters
    .filter((parameter) => parameter.location === "path")
    .forEach((parameter) => {
      const value = parameter.enabled && parameter.value
        ? encodeURIComponent(parameter.value)
        : `:${parameter.name}`;
      path = path.replace(`:${parameter.name}`, value);
    });

  const query = draft.parameters
    .filter(
      (parameter) =>
        parameter.location === "query" && parameter.enabled && parameter.value,
    )
    .map(
      (parameter) =>
        `${encodeURIComponent(parameter.name)}=${encodeURIComponent(parameter.value)}`,
    )
    .join("&");

  return `https://api.mergefund.dev${path}${query ? `?${query}` : ""}`;
}

export function validateRequestBody(draft: ApiRequestDraft) {
  if (!draft.requestBody) return null;

  try {
    JSON.parse(draft.requestBody);
    return null;
  } catch {
    return "Request body must be valid JSON before it can be sent.";
  }
}

export function codeSample(
  endpoint: ApiEndpoint,
  draft: ApiRequestDraft,
  language: CodeLanguage,
) {
  const url = buildRequestUrl(endpoint, draft);
  const body = draft.requestBody;

  if (language === "JavaScript") {
    return `const response = await fetch("${url}", {
  method: "${endpoint.method}",
  headers: {
    "Authorization": "Bearer $MERGEFUND_API_KEY",
    "Content-Type": "application/json"
  }${body ? `,\n  body: JSON.stringify(${body})` : ""}
});

const data = await response.json();`;
  }

  if (language === "Python") {
    return `import os
import requests

response = requests.${endpoint.method.toLowerCase()}(
    "${url}",
    headers={"Authorization": f"Bearer {os.environ['MERGEFUND_API_KEY']}"}${
      body ? `,\n    json=${body}` : ""
    }
)

data = response.json()`;
  }

  return `curl --request ${endpoint.method} \\
  --url '${url}' \\
  --header 'Authorization: Bearer $MERGEFUND_API_KEY'${
    body
      ? ` \\\n  --header 'Content-Type: application/json' \\\n  --data '${body.replace(/\n/g, "")}'`
      : ""
  }`;
}
