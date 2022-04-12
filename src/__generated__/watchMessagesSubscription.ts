/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: watchMessagesSubscription
// ====================================================

export interface watchMessagesSubscription_watchMessages_message_sender {
  __typename: "User";
  id: number;
  lastName: string;
  username: string;
  avatar: string | null;
}

export interface watchMessagesSubscription_watchMessages_message {
  __typename: "Message";
  id: number;
  createdAt: any;
  updateAt: any;
  content: string;
  see: boolean;
  sender: watchMessagesSubscription_watchMessages_message_sender;
  chatId: number;
}

export interface watchMessagesSubscription_watchMessages {
  __typename: "CreateMessageOutput";
  message: watchMessagesSubscription_watchMessages_message;
}

export interface watchMessagesSubscription {
  watchMessages: watchMessagesSubscription_watchMessages;
}
