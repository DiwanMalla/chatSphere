export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  text?: string;
  images?: string[];
  timestamp: string;
  createdAt: string;
}
