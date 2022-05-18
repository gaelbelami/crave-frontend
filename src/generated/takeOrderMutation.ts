/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TakeOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: takeOrderMutation
// ====================================================

export interface takeOrderMutation_takeOrder {
  __typename: "TakeOrderOutput";
  ok: boolean;
  message: string | null;
}

export interface takeOrderMutation {
  takeOrder: takeOrderMutation_takeOrder;
}

export interface takeOrderMutationVariables {
  takeOrderInput: TakeOrderInput;
}
