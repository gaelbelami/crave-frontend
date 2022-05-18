/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: loginMutation
// ====================================================

export interface loginMutation_loginUser {
  __typename: "LoginUserOutput";
  ok: boolean;
  message: string | null;
  token: string | null;
}

export interface loginMutation {
  loginUser: loginMutation_loginUser;
}

export interface loginMutationVariables {
  loginUserInput: LoginUserInput;
}
