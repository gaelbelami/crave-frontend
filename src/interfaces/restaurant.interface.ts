

export interface IRestaurant {
  id: number;
  coverImage: string;
  categoryName?: string;
  restaurantName: string;
  address?: string;
}


export type IRestaurantParams = Required<Pick<IRestaurant, "id">>;