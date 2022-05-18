/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurantsQuery
// ====================================================

export interface myRestaurantsQuery_myRestaurants_results_category {
  __typename: "Category";
  name: string;
}

export interface myRestaurantsQuery_myRestaurants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: myRestaurantsQuery_myRestaurants_results_category | null;
  address: string;
  isPromoted: boolean;
}

export interface myRestaurantsQuery_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  message: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: myRestaurantsQuery_myRestaurants_results[];
}

export interface myRestaurantsQuery {
  myRestaurants: myRestaurantsQuery_myRestaurants;
}

export interface myRestaurantsQueryVariables {
  myRestaurantsInput: MyRestaurantsInput;
}
