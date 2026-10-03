export interface CollectionRecord {
  qr_id: string;
  weight: number;
  points: number;
  timestamp: string;
}

export interface CreateCollectionInput {
  qr_id: string;
  weight: number;
  timestamp: string;
}

export interface ApiResponse<T> {
  message: string;
  data?: T;
}
