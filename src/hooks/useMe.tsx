import { gql, useQuery } from "@apollo/client";
import { meQuery } from "../__generated__/meQuery";


const ME_QUERY = gql`
  query meQuery {
    me {
      id
      firstName
      lastName
      username
      email
      role
      verified
    }
  }
`;

export const useMe = () => {
    return useQuery<meQuery>(ME_QUERY);
}