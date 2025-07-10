export type AuthUserDb = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDb = Omit<AuthUserDb, 'passwordHash'>;

export type AuthUser = Omit<AuthUserDb, 'createdAt' | 'updatedAt'>;

export type User = Omit<UserDb, 'createdAt' | 'updatedAt'>;

export type JwtPayload = {
  email: string;
  sub: string;
};
