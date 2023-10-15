export interface Error {
  error: string;
}

export interface Success {
  success: string;
}

export interface Response {
  error?: string;
  success?: string;
}

export interface Data<T> {
  data: T;
}
