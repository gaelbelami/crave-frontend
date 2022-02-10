/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: myRestaurantsQuery
// ====================================================

export interface myRestaurantsQuery_myRestaurants_restaurants_category {
  __typename: "Category";
  name: string;
}

export interface myRestaurantsQuery_myRestaurants_restaurants {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: myRestaurantsQuery_myRestaurants_restaurants_category | null;
  address: string;
  isPromoted: boolean;
}

export interface myRestaurantsQuery_myRestaurants {
  __typename: "MyRestaurantsOutput";
  ok: boolean;
  message: string | null;
  restaurants: myRestaurantsQuery_myRestaurants_restaurants[];
}

export interface myRestaurantsQuery {
  myRestaurants: myRestaurantsQuery_myRestaurants;
}
