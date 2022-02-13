/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyRestaurantInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myRestaurantQuery
// ====================================================

export interface myRestaurantQuery_myRestaurant_restaurant_category {
  __typename: "Category";
  name: string;
}

export interface myRestaurantQuery_myRestaurant_restaurant_menu_options_choices {
  __typename: "DishChoice";
  name: string;
  extra: number | null;
}

export interface myRestaurantQuery_myRestaurant_restaurant_menu_options {
  __typename: "DishOption";
  name: string;
  extra: number | null;
  choices: myRestaurantQuery_myRestaurant_restaurant_menu_options_choices[] | null;
}

export interface myRestaurantQuery_myRestaurant_restaurant_menu {
  __typename: "Dish";
  id: number;
  name: string;
  price: number;
  photo: string;
  description: string;
  options: myRestaurantQuery_myRestaurant_restaurant_menu_options[] | null;
}

export interface myRestaurantQuery_myRestaurant_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
  coverImage: string;
  category: myRestaurantQuery_myRestaurant_restaurant_category | null;
  address: string;
  isPromoted: boolean;
  menu: myRestaurantQuery_myRestaurant_restaurant_menu[];
}

export interface myRestaurantQuery_myRestaurant {
  __typename: "MyRestaurantOutput";
  ok: boolean;
  message: string | null;
  restaurant: myRestaurantQuery_myRestaurant_restaurant | null;
}

export interface myRestaurantQuery {
  myRestaurant: myRestaurantQuery_myRestaurant;
}

export interface myRestaurantQueryVariables {
  myRestaurantInput: MyRestaurantInput;
}
