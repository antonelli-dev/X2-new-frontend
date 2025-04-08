export interface Message {
  id: string;
  chat_id: string;
  sender: "human" | "bot";
  content: string;
  created_at: string;
  document: string[];
}
