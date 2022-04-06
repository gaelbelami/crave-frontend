/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditOrderInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editOrderMutation
// ====================================================

export interface editOrderMutation_editOrder {
  __typename: "EditOrderOutput";
  ok: boolean;
  message: string | null;
}

export interface editOrderMutation {
  editOrder: editOrderMutation_editOrder;
}

export interface editOrderMutationVariables {
  editOrderInput: EditOrderInput;
}
