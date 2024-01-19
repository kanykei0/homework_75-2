export interface MessageData {
  message: string;
  password: string;
}

export interface MessageMutation {
  password: string;
  encoded: string;
  decoded: string;
}
