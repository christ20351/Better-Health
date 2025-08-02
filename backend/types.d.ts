
declare namespace Express {
  export interface Request {
    userId: string;
    user: {
      id: string;
      role: string;
      workspace: string;
    };
  }
  export interface Response {
    userId: string;
    user: {
      id: string;
      role: string;
      workspace: string;
    };
  }
}