/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  client = "client",
  delivery = "delivery",
  owner = "owner",
}

export interface CategoryInput {
  page?: number | null;
  categorySlug: string;
}

export interface CreateUserAccountInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface EditUserProfileInput {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  birthdate?: any | null;
  email?: string | null;
  password?: string | null;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface SearchRestaurantInput {
  page?: number | null;
  query: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
