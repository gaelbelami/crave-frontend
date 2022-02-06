/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SearchRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: searchRestaurantMutation
// ====================================================

export interface searchRestaurantMutation_searchRestaurant_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface searchRestaurantMutation_searchRestaurant_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: searchRestaurantMutation_searchRestaurant_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface searchRestaurantMutation_searchRestaurant {
  __typename: "SearchRestaurantOutput";
  ok: boolean;
  message: string | null;
  totalPages: number | null;
  totalResults: number | null;
  restaurants: searchRestaurantMutation_searchRestaurant_restaurants[] | null;
}

export interface searchRestaurantMutation {
  searchRestaurant: searchRestaurantMutation_searchRestaurant;
}

export interface searchRestaurantMutationVariables {
  searchRestaurantInput: SearchRestaurantInput;
}
