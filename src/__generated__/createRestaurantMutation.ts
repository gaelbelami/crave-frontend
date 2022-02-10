/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createRestaurantMutation
// ====================================================

export interface createRestaurantMutation_createRestaurant {
  __typename: "CreateRestaurantOutput";
  message: string | null;
  ok: boolean;
  restaurantId: number;
}

export interface createRestaurantMutation {
  createRestaurant: createRestaurantMutation_createRestaurant;
}

export interface createRestaurantMutationVariables {
  createRestaurantInput: CreateRestaurantInput;
}
