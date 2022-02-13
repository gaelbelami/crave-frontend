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

export const DISH_FRAGMENT =gql`
fragment DishParts on Dish {
    id
    name
    price
    photo
    description
    options {
        name
        extra
        choices {
            name
            extra
        }
    }
}
`