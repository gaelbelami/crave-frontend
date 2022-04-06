/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createOrderMutation
// ====================================================

export interface createOrderMutation_createOrder {
  __typename: "CreateOrderOutput";
  ok: boolean;
  message: string | null;
  orderId: number | null;
}

export interface createOrderMutation {
  createOrder: createOrderMutation_createOrder;
}

export interface createOrderMutationVariables {
  createOrderInput: CreateOrderInput;
}
