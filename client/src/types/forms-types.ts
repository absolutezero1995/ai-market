export type Form = {
  id?: number;
  model: string;
  messages: Message[];
  temperature?: number;
};

interface Message {
  role: string;
  content: string;
}
