/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum OrderStatus {
  Cancelled = "Cancelled",
  Cooked = "Cooked",
  Cooking = "Cooking",
  Delivered = "Delivered",
  Pending = "Pending",
  PickedUp = "PickedUp",
}

export enum UserRole {
  client = "client",
  delivery = "delivery",
  owner = "owner",
}

export interface CategoryInput {
  page?: number | null;
  categorySlug: string;
}

export interface ChangePasswordUserInput {
  password: string;
  oldPassword: string;
  confirmPassword: string;
}

export interface CreateChatInput {
  friendId: number;
  restaurantId: number;
}

export interface CreateDishInput {
  name: string;
  price: number;
  photo: string;
  description: string;
  options?: DishOptionInputType[] | null;
  restaurantId: number;
}

export interface CreateMessageInput {
  content: string;
  see?: boolean | null;
  chatId: number;
}

export interface CreateOrderInput {
  restaurantId: number;
  items: CreateOrderItemInput[];
}

export interface CreateOrderItemInput {
  dishId: number;
  options?: OrderItemOptionInputType[] | null;
  quantity: number;
}

export interface CreateRestaurantInput {
  name: string;
  address: string;
  coverImage: string;
  categoryName: string;
}

export interface CreateUserAccountInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: UserRole;
}

export interface DishChoiceInputType {
  name: string;
  extra?: number | null;
}

export interface DishOptionInputType {
  name: string;
  choices?: DishChoiceInputType[] | null;
  extra?: number | null;
}

export interface EditOrderInput {
  id: number;
  status: OrderStatus;
}

export interface EditUserProfileInput {
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  avatar?: string | null;
  phoneNumber?: string | null;
  address?: string | null;
  birthdate?: any | null;
  email?: string | null;
  password?: string | null;
}

export interface GetOrderInput {
  id: number;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface MyChatsInput {
  page?: number | null;
}

export interface MyMessagesInput {
  page?: number | null;
  chatId: number;
}

export interface MyRestaurantInput {
  id: number;
}

export interface MyRestaurantsInput {
  page?: number | null;
}

export interface OrderItemOptionInputType {
  name: string;
  choice?: string | null;
}

export interface OrderUpdatesInput {
  id: number;
}

export interface RestaurantInput {
  restaurantId: number;
}

export interface RestaurantsInput {
  page?: number | null;
}

export interface SearchRestaurantInput {
  page?: number | null;
  query: string;
}

export interface VerifyEmailInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
