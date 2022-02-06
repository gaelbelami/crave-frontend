import { gql } from "@apollo/client";



export const RESTAURANT_FRAGMENT = gql`
fragment RestaurantQuery on Restaurant {
    id
    name
    coverImage
    category {
        name
    }
    address
    isPromoted
}
`;