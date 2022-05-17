/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetOrdersInput, OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL query operation: getOrdersMutation
// ====================================================

export interface getOrdersMutation_getOrders_orders_customer {
  __typename: "User";
  email: string;
  firstName: string;
  username: string;
  avatar: string | null;
  phoneNumber: string | null;
  address: string | null;
}

export interface getOrdersMutation_getOrders_orders_restaurant {
  __typename: "Restaurant";
  name: string;
  address: string;
}

export interface getOrdersMutation_getOrders_orders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  createdAt: any;
  updateAt: any;
  customer: getOrdersMutation_getOrders_orders_customer | null;
  restaurant: getOrdersMutation_getOrders_orders_restaurant | null;
}

export interface getOrdersMutation_getOrders {
  __typename: "GetOrdersOutput";
  message: string | null;
  ok: boolean;
  totalPages: number | null;
  totalResults: number | null;
  orders: getOrdersMutation_getOrders_orders[] | null;
}

export interface getOrdersMutation {
  getOrders: getOrdersMutation_getOrders;
}

export interface getOrdersMutationVariables {
  getOrdersInput: GetOrdersInput;
}
