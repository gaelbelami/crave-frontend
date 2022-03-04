import { gql } from "@apollo/client";

export const RESTAURANTS_QUERY = gql`
  query restaurantsPageQuery($restaurantsInput: RestaurantsInput!) {
    allCategories {
      ok
      message
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }

    getAllRestaurnants(restaurantsInput: $restaurantsInput) {
      ok
      message
      totalPages
      totalResults
      results {
        id
        name
        coverImage
        category {
          id
          name
        }
        isPromoted
        address
      }
    }
  }
`;

export const RESTAURANT_QUERY = gql`
  query restaurantQuery($restaurantInput: RestaurantInput!) {
    restaurant(restaurantInput: $restaurantInput) {
      ok
      message
      restaurant {
        id
        name
        coverImage
        category {
          name
          slug
        }
        address
        isPromoted
        menu {
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
      }
    }
  }
`;

export const SEARCH_RESTAURANT = gql`
  query searchRestaurantQuery($searchRestaurantInput: SearchRestaurantInput!) {
    searchRestaurant(searchRestaurantInput: $searchRestaurantInput) {
      ok
      message
      totalPages
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const CHANGE_PASSWORD_USER = gql`
  mutation changePasswordUserMutation(
    $changePasswordUserInput: ChangePasswordUserInput!
  ) {
    changePasswordUser(changePasswordUserInput: $changePasswordUserInput) {
      ok
      message
    }
  }
`;

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation($editUserProfileInput: EditUserProfileInput!) {
    editUserProfile(editUserProfileInput: $editUserProfileInput) {
      ok
      message
    }
  }
`;

export const CATEGORY_QUERY = gql`
  query categoryQuery($categoryInput: CategoryInput!) {
    category(categoryInput: $categoryInput) {
      ok
      message
      totalPages
      totalResults
      restaurants {
        id
        name
        coverImage
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;
