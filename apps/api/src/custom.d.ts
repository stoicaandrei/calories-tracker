declare namespace Express {
  export interface Request {
    userId: string;
    userRoles: UserRole[];
  }
}
