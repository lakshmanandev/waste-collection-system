export interface CollectionRecord {
  qr_id: string;
  weight: number;
  points: number;
  timestamp: string;
}

export interface CollectionListResponse {
  message: string;
  data: CollectionRecord[];
}
