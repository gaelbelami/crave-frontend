/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyChatsInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myChatsQuery
// ====================================================

export interface myChatsQuery_myChats_results_restaurant {
  __typename: "Restaurant";
  id: number;
  name: string;
}

export interface myChatsQuery_myChats_results_user1 {
  __typename: "User";
  id: number;
  firstName: string;
  avatar: string | null;
}

export interface myChatsQuery_myChats_results_user2 {
  __typename: "User";
  id: number;
  firstName: string;
  avatar: string | null;
}

export interface myChatsQuery_myChats_results {
  __typename: "Chat";
  id: number;
  restaurant: myChatsQuery_myChats_results_restaurant;
  user1: myChatsQuery_myChats_results_user1;
  user2: myChatsQuery_myChats_results_user2;
}

export interface myChatsQuery_myChats {
  __typename: "MyChatsOutput";
  ok: boolean;
  message: string | null;
  results: myChatsQuery_myChats_results[] | null;
}

export interface myChatsQuery {
  myChats: myChatsQuery_myChats;
}

export interface myChatsQueryVariables {
  myChatsInput: MyChatsInput;
}
