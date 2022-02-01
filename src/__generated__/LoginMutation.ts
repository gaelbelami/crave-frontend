/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_loginUser {
  __typename: "LoginUserOutput";
  ok: boolean;
  message: string | null;
  token: string | null;
}

export interface LoginMutation {
  loginUser: LoginMutation_loginUser;
}

export interface LoginMutationVariables {
  loginUserInput: LoginUserInput;
}
