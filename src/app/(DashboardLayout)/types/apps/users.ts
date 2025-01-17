import { IDocuments } from "./document";

export enum UserStatus {
  PENDING = 'pending',
  ACTIVE = 'active',
  SUSPENDED = 'suspended',
  INACTIVE = 'inactive'
}

export enum AccountType {
  INDIVIDUAL = 'individual',
  CORPORATE = 'corporate',
}

export interface IUserOtp {
  userId: string;
  _id?: string;
  phoneOTP?: string;
  phoneOTPExpires?: Date;
  emailOTP?: string;
  emailOTPExpires?: Date;
}

export interface IUserPortfolio extends Document {
  userId: string;
  portfolio: Array<{
    companyId: string;
    shares: number;
    averageBuyPrice: number;
  }>;
  watchlist: string[];
}

export interface IUserBase {
  firstName: string;
  lastName: string;
  displayName?: string;
  email: string;
  genderId?: string|string;
  phone: string;
  countryCode: string;
  password?: string;
  documents?: IDocuments;
  status: UserStatus;
  accountType: AccountType;
  emailVerified: boolean;
  phoneVerified: boolean;
  verified: boolean;
}

export interface IUser extends IUserBase {
  _id?: string;
  passwordHash?: string;
  passwordHistory: string[];
  loginAttempts: number;
  lastSeen?: Date,
  isLoggedIn?: boolean,
  lockUntil?: Date;
  lastPasswordChange: Date;
  twoFactorEnabled: boolean;
  twoFactorSecret?: string;
  createdAt: Date;
  updatedAt: Date;
}