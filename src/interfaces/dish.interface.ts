import { CreateOrderItemInput } from "../generated/globalTypes";
import { restaurantQuery_restaurant_restaurant_menu_options } from "../generated/restaurantQuery";

export interface IDishProp {
  dishId: number;
  name: string;
  description: string;
  price: number;
  photo: string;
  isCustomer?: boolean;
  options?: restaurantQuery_restaurant_restaurant_menu_options[] | null;
  orderStarted?: boolean;
  addItemToOrder?: (dishId: number) => void;
  removeFromOrder?: (dishId: number) => void;
  addOptionToItem?: (dishId: number, optionName: string) => void;
  removeOptionFromItem?: (dishId: number, optionName: string) => void;
  getItem?: CreateOrderItemInput;
  isSelected?: boolean;
}
