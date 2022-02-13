/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateDishInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createDishMutation
// ====================================================

export interface createDishMutation_createDish {
  __typename: "CreateDishOutput";
  ok: boolean;
  message: string | null;
}

export interface createDishMutation {
  createDish: createDishMutation_createDish;
}

export interface createDishMutationVariables {
  createDishInput: CreateDishInput;
}
