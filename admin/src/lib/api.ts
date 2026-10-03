const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000';

export async function fetchCollections(): Promise<CollectionRecord[]> {
  const response = await fetch(`${API_BASE_URL}/api/collections`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch collections');
  }

  const data = (await response.json()) as { data?: CollectionRecord[] };
  return data.data ?? [];
}

export type CollectionRecord = {
  qr_id: string;
  weight: number;
  points: number;
  timestamp: string;
};
