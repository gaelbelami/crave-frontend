import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ImLocation } from "react-icons/im";
import { IoIosChatbubbles } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Dish } from "../../components/dish";
import {
  CREATE_CHAT_MUTATION,
  CREATE_ORDER_MUTATION,
  RESTAURANT_QUERY,
} from "../../graphql/query-mutation";
import { useMe } from "../../hooks/useMe";
import {
  createChatMutation,
  createChatMutationVariables,
} from "../../__generated__/createChatMutation";
import {
  createOrderMutation,
  createOrderMutationVariables,
} from "../../__generated__/createOrderMutation";
import { CreateOrderItemInput } from "../../__generated__/globalTypes";

import {
  restaurantQuery,
  restaurantQueryVariables,
} from "../../__generated__/restaurantQuery";

export const Restaurant = () => {
  const { data: userData } = useMe();
  const location = useLocation();
  const restaurantId: any = location.state;
  const history = useNavigate();
  const { data, loading } = useQuery<restaurantQuery, restaurantQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        restaurantInput: {
          restaurantId: +restaurantId,
        },
      },
    }
  );

  const [createChatMutation] = useMutation<
    createChatMutation,
    createChatMutationVariables
  >(CREATE_CHAT_MUTATION, {
    onCompleted: (data: createChatMutation) => {
      if (data.findOrCreateChat.ok) {
        history(`/chats`);
      }
    },
  });

  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);

  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };

  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [
      { dishId, quantity: 0, options: [] },
      ...current,
    ]);
    console.log("Add item to chart");
  };

  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) =>
      current.filter((dish) => dish.dishId !== dishId)
    );
  };

  const addOptionToItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);
    if (oldItem) {
      const hasOption = Boolean(
        oldItem.options?.find((aOption) => aOption.name === optionName)
      );
      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [
          {
            dishId,
            quantity: oldItem.quantity,
            options: [{ name: optionName }, ...oldItem.options!],
          },
          ...current,
        ]);
      }
    }
  };

  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected) {
      return;
    }

    const oldItem = getItem(dishId);

    if (oldItem) {
      removeFromOrder(dishId);
      setOrderItems((current) => [
        {
          dishId,
          quantity: 0,
          options: oldItem.options?.filter(
            (option) => option.name !== optionName
          ),
        },
        ...current,
      ]);
      return;
    }
  };

  const triggerCancelOrder = () => {
    setOrderStarted(false);
    setOrderItems([]);
  };

  const onCompleted = (data: createOrderMutation) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (ok) {
      history(`/orders/${orderId}`);
    }
  };

  const [createOrderMutation, { loading: placingOrder }] = useMutation<
    createOrderMutation,
    createOrderMutationVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted,
  });

  const [orderStarted, setOrderStarted] = useState(false);

  const triggerStartOrder = () => {
    setOrderStarted(true);
    console.log("start order");
  };

  const triggerConfirmOrder = () => {
    if (placingOrder) {
      return;
    }
    if (orderItems.length === 0) {
      Swal.fire("Warning", "You can't place an empty order", "warning");
      return;
    }
    const ok = window.confirm("You are about to place an order");
    if (ok) {
      createOrderMutation({
        variables: {
          createOrderInput: {
            restaurantId,
            items: orderItems,
          },
        },
      });
    }
  };

  const onStartChat = () => {
    try {
      createChatMutation({
        variables: {
          createChatInput: {
            friendId: data?.restaurant.restaurant?.owner.id!,
            restaurantId,
          },
        },
      });
      console.log(data?.restaurant.restaurant?.owner.id!);
    } catch (error) {}
  };

  return (
    <div className="min-h-screen">
      {!data || loading ? (
        <div className=" page-container bg-gray-200 animate-pulse mt-5 bg-center bg-cover py-48">
          <div className=" ml-8 bg-white w-3/12 py-8 rounded-md shadow-md">
            <div className="flex">
              <div className="ml-4 text-4xl mb-3 py-5 px-10 bg-gray-200 animate-pulse font-mono font-semibold "></div>
              <div className="flex-grow"></div>
            </div>

            <div className="flex  mb-5">
              <div className="flex-none bg-gray-200 animate-pulse  shadow-md py-2 px-5 rounded-2xl ml-4 "></div>
              <div className="flex-grow"></div>
            </div>
            <div className="flex">
              <div className=" ml-4 text-sm py-2 px-5 bg-gray-200 animate-pulse"></div>
              <div className="flex-grow"></div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className=" page-container mt-5 bg-center bg-cover py-28 shadow-md"
          style={{
            backgroundImage: `url(${data?.restaurant.restaurant?.coverImage})`,
          }}
        >
          <div className=" ml-8 bg-white md:w-2/5   py-6 rounded-md shadow-md">
            <h4 className="uppercase ml-4 text-4xl mb-4 text-gray-700 font-extrabold">
              {data?.restaurant.restaurant?.name}
            </h4>
            <Link
              to={`/category/${data?.restaurant.restaurant?.category?.slug}`}
              state={data?.restaurant.restaurant?.category}
            >
              <div className="flex  mb-5">
                <h4 className="capitalize flex-none text-xs font-bold shadow-md bg-gray-200 py-1 px-2 rounded-2xl ml-4 ">
                  {data?.restaurant.restaurant?.category?.name}
                </h4>
                <div className="flex-grow"></div>
              </div>
            </Link>
            <div className="flex justify-between">
              <span className="lowercase  text-gray-500 inline-flex items-center text-xs font-semibold ml-4">
                <ImLocation />
                &nbsp; {data?.restaurant.restaurant?.address}
              </span>
              <span
                onClick={onStartChat}
                className="cursor-pointer text-white inline-flex items-center text-sm font-semibold px-4 py-2 bg-teal-600 mr-4 rounded-md  "
              >
                <IoIosChatbubbles className="mr-1" />
                Message
              </span>
            </div>
          </div>
        </div>
      )}
      {data?.restaurant.restaurant?.menu.length !== 0 ? (
        <div className="page-container">
          <div className="mt-10 flex flex-col  items-end">
            <div className="flex">
              {!orderStarted && (
                <button
                  onClick={triggerStartOrder}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Start Order
                </button>
              )}
              {orderStarted && (
                <div>
                  <button
                    onClick={triggerConfirmOrder}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-teal-600 text-base font-medium text-white hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Confirm Order
                  </button>
                  <button
                    onClick={triggerCancelOrder}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel Order
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="md:grid md:grid-cols-2 gap-x-6 gap-y-10 mt-10">
            {data?.restaurant.restaurant?.menu.map(
              ({ id, name, price, description, photo, options }) => (
                <div key={id}>
                  <Dish
                    dishId={id}
                    name={name}
                    description={description}
                    price={price}
                    photo={photo}
                    isCustomer={true}
                    options={options}
                    orderStarted={orderStarted}
                    addItemToOrder={addItemToOrder}
                    removeFromOrder={removeFromOrder}
                    isSelected={isSelected(id)}
                    addOptionToItem={addOptionToItem}
                    removeOptionFromItem={removeOptionFromItem}
                    getItem={getItem(id)}
                  />
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="mx-auto text-center mt-20 text-3xl font-sans font-bold items-center justify-items-center text-gray-700">
          No dish for this restaurant yet 😥.
        </div>
      )}
    </div>
  );
};
