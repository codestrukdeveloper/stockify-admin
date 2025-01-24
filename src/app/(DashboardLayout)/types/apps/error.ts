export interface IError {
    message?: string;
    errors?:string[]
  }
  
  

export type IServerError = { error: IError };

export type IServerResponse<T> = T | IServerError;
