export type GenerateRequest = {
  sentence: string;
};

export type GenerateResponse = 
  | { message: string }
  | { error: string };