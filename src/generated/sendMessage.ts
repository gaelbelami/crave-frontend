/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateMessageInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: sendMessage
// ====================================================

export interface sendMessage_sendMessage_realTimeMessage_sender {
  __typename: "User";
  id: number;
  lastName: string;
  username: string;
  avatar: string | null;
}

export interface sendMessage_sendMessage_realTimeMessage {
  __typename: "Message";
  id: number;
  content: string;
  see: boolean;
  sender: sendMessage_sendMessage_realTimeMessage_sender;
  chatId: number;
}

export interface sendMessage_sendMessage {
  __typename: "CreateMessageOutput";
  ok: boolean;
  realTimeMessage: sendMessage_sendMessage_realTimeMessage;
}

export interface sendMessage {
  sendMessage: sendMessage_sendMessage;
}

export interface sendMessageVariables {
  createMessageInput: CreateMessageInput;
}
