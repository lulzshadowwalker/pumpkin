export type Creation = {
  id: string;
  url: string;
  status: 'completed' | 'failed' | 'pending' | 'unknown';
  createdAt: string;
  error?: string;
  userId: string;
}
