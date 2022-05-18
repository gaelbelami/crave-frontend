/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateChatInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: createChatMutation
// ====================================================

export interface createChatMutation_findOrCreateChat_chat_user2 {
  __typename: "User";
  lastName: string;
  avatar: string | null;
}

export interface createChatMutation_findOrCreateChat_chat {
  __typename: "Chat";
  id: number;
  user2: createChatMutation_findOrCreateChat_chat_user2;
}

export interface createChatMutation_findOrCreateChat {
  __typename: "CreateChatOutput";
  message: string | null;
  ok: boolean;
  chat: createChatMutation_findOrCreateChat_chat | null;
}

export interface createChatMutation {
  findOrCreateChat: createChatMutation_findOrCreateChat;
}

export interface createChatMutationVariables {
  createChatInput: CreateChatInput;
}
