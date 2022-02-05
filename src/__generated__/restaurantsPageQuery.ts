/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { RestaurantsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: restaurantsPageQuery
// ====================================================

export interface restaurantsPageQuery_allCategories_categories {
  __typename: "Category";
  id: number;
  name: string;
  coverImage: string;
  slug: string;
  restaurantCount: number;
}

export interface restaurantsPageQuery_allCategories {
  __typename: "AllCategoriesOutput";
  ok: boolean;
  message: string | null;
  categories: restaurantsPageQuery_allCategories_categories[] | null;
}

export interface restaurantsPageQuery_getAllRestaurnants_results_category {
  __typename: "Category";
  id: number;
  name: string;
}

export interface restaurantsPageQuery_getAllRestaurnants_results {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: restaurantsPageQuery_getAllRestaurnants_results_category | null;
  isPromoted: boolean;
  address: string;
}

export interface restaurantsPageQuery_getAllRestaurnants {
  __typename: "RestaurantsOutput";
  ok: boolean;
  message: string | null;
  totalPages: number | null;
  totalResults: number | null;
  results: restaurantsPageQuery_getAllRestaurnants_results[] | null;
}

export interface restaurantsPageQuery {
  allCategories: restaurantsPageQuery_allCategories;
  getAllRestaurnants: restaurantsPageQuery_getAllRestaurnants;
}

export interface restaurantsPageQueryVariables {
  restaurantsInput: RestaurantsInput;
}
