import { Message } from "./message.interface";

export interface Chat {
  chat_id: string;
  chat_history_name: string;
  first_message: Message;
}
