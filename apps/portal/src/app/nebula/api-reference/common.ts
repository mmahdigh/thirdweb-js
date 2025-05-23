import type { APIParameter } from "../../../components/Document/APIEndpointMeta/ApiEndpoint";

export const nebulaFullSessionResponse = `\
{
  "result": {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "title": "string",
    "context": {
      "chain_ids": ["1", "137"],
      "wallet_address": "0x..."
    },
    "history": [
      {}
    ],
    "account_id": "string",
    "model_name": "string",
    "is_public": true,
    "memory": [
      {}
    ],
    "action": [
      {}
    ],
    "archive_at": "2025-01-08T17:22:45.016Z",
    "deleted_at": "2025-01-08T17:22:45.016Z",
    "created_at": "2025-01-08T17:22:45.016Z",
    "updated_at": "2025-01-08T17:22:45.016Z"
  }
}`;

export const nebulaAPI401Response = `\
{
  "error": {
    "message": "401: Authentication failed"
  }
}`;

export const nebulaAPI422Response = `\
{
  "detail": [
    {
      "loc": [
        "string",
        0
      ],
      "msg": "string",
      "type": "string"
    }
  ]
}`;

export const nebulaSecretKeyHeaderParameter: APIParameter = {
  name: "x-secret-key",
  required: true,
  description: "Your thirdweb secret key for authentication.",
  type: "string",
  example: "YOUR_THIRDWEB_SECRET_KEY",
};

export const nebulaSessionIdPathParameter: APIParameter = {
  name: "session_id",
  required: true,
  description: "The unique ID of the session",
  type: "string",
  example: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
};
const nebulaContextFilterType = `\
{
  chainIds: string[] | null;
  walletAddress: string | null;
}`;

export const nebulaContextParameter: APIParameter = {
  name: "context",
  required: false,
  description: "Provide additional context information along with the message",
  type: nebulaContextFilterType,
};
