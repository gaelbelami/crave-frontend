/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateUserAccountInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createAccountMutation
// ====================================================

export interface createAccountMutation_createUserAccount {
  __typename: "CreateUserAccountOutput";
  ok: boolean;
  message: string | null;
}

export interface createAccountMutation {
  createUserAccount: createAccountMutation_createUserAccount;
}

export interface createAccountMutationVariables {
  createUserAccountInput: CreateUserAccountInput;
}
