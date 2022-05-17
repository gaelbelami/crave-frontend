/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { OrderStatus } from "./globalTypes";

// ====================================================
// GraphQL subscription operation: cookedOrdersSubscription
// ====================================================

export interface cookedOrdersSubscription_cookedOrders_driver {
  __typename: "User";
  email: string;
  firstName: string;
  username: string;
  avatar: string | null;
  phoneNumber: string | null;
}

export interface cookedOrdersSubscription_cookedOrders_customer {
  __typename: "User";
  email: string;
  firstName: string;
  username: string;
  avatar: string | null;
  phoneNumber: string | null;
  address: string | null;
}

export interface cookedOrdersSubscription_cookedOrders_restaurant {
  __typename: "Restaurant";
  name: string;
  address: string;
}

export interface cookedOrdersSubscription_cookedOrders {
  __typename: "Order";
  id: number;
  status: OrderStatus;
  total: number | null;
  createdAt: any;
  updateAt: any;
  driver: cookedOrdersSubscription_cookedOrders_driver | null;
  customer: cookedOrdersSubscription_cookedOrders_customer | null;
  restaurant: cookedOrdersSubscription_cookedOrders_restaurant | null;
}

export interface cookedOrdersSubscription {
  cookedOrders: cookedOrdersSubscription_cookedOrders;
}
