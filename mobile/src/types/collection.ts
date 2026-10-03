export interface CollectionPayload {
  qr_id: string;
  weight: number;
  timestamp: string;
}

export interface CollectionResponseData {
  qr_id: string;
  weight: number;
  points: number;
  timestamp: string;
}

export interface CollectionApiResponse {
  message: string;
  data?: CollectionResponseData;
}
