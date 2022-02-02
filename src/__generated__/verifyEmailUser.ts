/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VerifyEmailInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: verifyEmailUser
// ====================================================

export interface verifyEmailUser_verifyEmailUser {
  __typename: "VerifyEmailOutput";
  ok: boolean;
  message: string | null;
}

export interface verifyEmailUser {
  verifyEmailUser: verifyEmailUser_verifyEmailUser;
}

export interface verifyEmailUserVariables {
  verifyEmailUserInput: VerifyEmailInput;
}
