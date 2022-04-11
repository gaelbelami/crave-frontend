/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { MyMessagesInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: myMessagesQuery
// ====================================================

export interface myMessagesQuery_myMessages_results_sender {
  __typename: "User";
  id: number;
  lastName: string;
  username: string;
  avatar: string | null;
}

export interface myMessagesQuery_myMessages_results {
  __typename: "Message";
  content: string;
  see: boolean;
  sender: myMessagesQuery_myMessages_results_sender;
}

export interface myMessagesQuery_myMessages {
  __typename: "MyMessagesOutput";
  ok: boolean;
  message: string | null;
  results: myMessagesQuery_myMessages_results[] | null;
}

export interface myMessagesQuery {
  myMessages: myMessagesQuery_myMessages;
}

export interface myMessagesQueryVariables {
  myMessagesInput: MyMessagesInput;
}
