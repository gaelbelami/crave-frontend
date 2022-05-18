/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditUserProfileInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: editProfileMutation
// ====================================================

export interface editProfileMutation_editUserProfile {
  __typename: "EditUserProfileOutput";
  ok: boolean;
  message: string | null;
}

export interface editProfileMutation {
  editUserProfile: editProfileMutation_editUserProfile;
}

export interface editProfileMutationVariables {
  editUserProfileInput: EditUserProfileInput;
}
