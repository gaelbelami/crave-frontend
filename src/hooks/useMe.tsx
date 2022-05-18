import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../generated/meQuery";

export const ME_QUERY = gql`
  query meQuery {
    me {
      id
      firstName
      lastName
      username
      email
      address
      birthdate
      phoneNumber
      avatar
      role
      verified
    }
  }
`;

export const useMe = () => {
  return useQuery<meQuery>(ME_QUERY);
};
