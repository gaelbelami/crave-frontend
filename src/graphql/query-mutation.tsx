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
        owner {
          id
        }
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

export const CREATE_DISH_MUTATION = gql`
  mutation createDishMutation($createDishInput: CreateDishInput!) {
    createDish(createDishInput: $createDishInput) {
      ok
      message
    }
  }
`;

export const MY_RESTAURANTS_QUERY = gql`
  query myRestaurantsQuery($myRestaurantsInput: MyRestaurantsInput!) {
    myRestaurants(myRestaurantsInput: $myRestaurantsInput) {
      ok
      message
      totalPages
      totalResults
      results {
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

export const MY_RESTAURANT_QUERY = gql`
  query myRestaurantQuery($myRestaurantInput: MyRestaurantInput!) {
    myRestaurant(myRestaurantInput: $myRestaurantInput) {
      ok
      message
      restaurant {
        id
        name
        coverImage
        category {
          name
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
        orders {
          id
          createdAt
          total
        }
      }
    }
  }
`;

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmailUser($verifyEmailUserInput: VerifyEmailInput!) {
    verifyEmailUser(verifyEmailUserInput: $verifyEmailUserInput) {
      ok
      message
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation loginMutation($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      ok
      message
      token
    }
  }
`;

export const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation(
    $createUserAccountInput: CreateUserAccountInput!
  ) {
    createUserAccount(createUserAccountInput: $createUserAccountInput) {
      ok
      message
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation createOrderMutation($createOrderInput: CreateOrderInput!) {
    createOrder(createOrderInput: $createOrderInput) {
      ok
      message
      orderId
    }
  }
`;

export const GET_ORDER_QUERY = gql`
  query getOrderQuery($getOrderInput: GetOrderInput!) {
    getOrder(getOrderInput: $getOrderInput) {
      ok
      message
      order {
        id
        status
        total
        createdAt
        updateAt
        driver {
          email
          firstName
          username
          avatar
          phoneNumber
        }
        customer {
          email
          firstName
          username
          avatar
          phoneNumber
        }
        restaurant {
          name
        }
      }
    }
  }
`;

export const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdatesSubscription(
    $orderUpdatesInput: OrderUpdatesInput!
  ) {
    orderUpdates(orderUpdatesInput: $orderUpdatesInput) {
      id
      status
      total
      createdAt
      updateAt
      driver {
        email
        firstName
        username
        avatar
        phoneNumber
      }
      customer {
        email
        firstName
        username
        avatar
        phoneNumber
      }
      restaurant {
        name
      }
    }
  }
`;

export const PENDING_ORDERS_SUBSCRIPTION = gql`
  subscription pendingOrdersSubscription {
    pendingOrders {
      id
      status
      total
      createdAt
      updateAt
      driver {
        email
        firstName
        username
        avatar
        phoneNumber
      }
      customer {
        email
        firstName
        username
        avatar
        phoneNumber
      }
      restaurant {
        name
      }
    }
  }
`;

export const EDIT_ORDER_MUTATION = gql`
  mutation editOrderMutation($editOrderInput: EditOrderInput!) {
    editOrder(editOrderInput: $editOrderInput) {
      ok
      message
    }
  }
`;

export const COOKED_ORDERS_SUBSCRIPTION = gql`
  subscription cookedOrdersSubscription {
    cookedOrders {
      id
      status
      total
      createdAt
      updateAt
      driver {
        email
        firstName
        username
        avatar
        phoneNumber
      }
      customer {
        email
        firstName
        username
        avatar
        phoneNumber
        address
      }
      restaurant {
        name
        address
      }
    }
  }
`;

export const TAKE_ORDER_MUTATION = gql`
  mutation takeOrderMutation($takeOrderInput: TakeOrderInput!) {
    takeOrder(takeOrderInput: $takeOrderInput) {
      ok
      message
    }
  }
`;

export const GET_ORDERS_QUERY = gql`
  query getOrdersMutation($getOrdersInput: GetOrdersInput!) {
    getOrders(getOrdersInput: $getOrdersInput) {
      message
      ok
      totalPages
      totalResults
      orders {
        id
        status
        total
        createdAt
        updateAt
        customer {
          email
          firstName
          username
          avatar
          phoneNumber
          address
        }
        restaurant {
          name
          address
        }
      }
    }
  }
`;

export const MY_CHATS_QUERY = gql`
  query myChatsQuery($myChatsInput: MyChatsInput!) {
    myChats(myChatsInput: $myChatsInput) {
      ok
      message
      results {
        id
        restaurant {
          id
          name
        }
        user1 {
          id
          firstName
          avatar
        }
        user2 {
          id
          firstName
          avatar
        }
      }
    }
  }
`;

export const MY_MESSAGES_QUERY = gql`
  query myMessagesQuery($myMessagesInput: MyMessagesInput!) {
    myMessages(myMessagesInput: $myMessagesInput) {
      ok
      # message
      results {
        id
        content
        see
        sender {
          id
          lastName
          username
          avatar
        }
        chatId
      }
    }
  }
`;

export const SEND_MESSAGE_MUTATION = gql`
  mutation sendMessage($createMessageInput: CreateMessageInput!) {
    sendMessage(createMessageInput: $createMessageInput) {
      ok
      realTimeMessage {
        id
        content
        see
        sender {
          id
          lastName
          username
          avatar
        }
        chatId
      }
    }
  }
`;

export const WATCH_MESSAGES_SUBSCRIPTION = gql`
  subscription watchMessagesSubscription {
    watchMessages {
      ok
      realTimeMessage {
        id
        createdAt
        updateAt
        content
        see
        sender {
          id
          lastName
          username
          avatar
        }
        chatId
      }
    }
  }
`;

export const CREATE_CHAT_MUTATION = gql`
  mutation createChatMutation($createChatInput: CreateChatInput!) {
    findOrCreateChat(createChatInput: $createChatInput) {
      message
      ok
      chat {
        id
        user2 {
          lastName
          avatar
        }
      }
    }
  }
`;
