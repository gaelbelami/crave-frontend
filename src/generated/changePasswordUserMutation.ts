/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ChangePasswordUserInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: changePasswordUserMutation
// ====================================================

export interface changePasswordUserMutation_changePasswordUser {
  __typename: "ChangePasswordUserOutput";
  ok: boolean;
  message: string | null;
}

export interface changePasswordUserMutation {
  changePasswordUser: changePasswordUserMutation_changePasswordUser;
}

export interface changePasswordUserMutationVariables {
  changePasswordUserInput: ChangePasswordUserInput;
}
