import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { GiHotMeal } from "react-icons/gi";
import { MdWatchLater } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  EDIT_ORDER_MUTATION,
  GET_ORDER_QUERY,
  ORDER_SUBSCRIPTION,
} from "../graphql/query-mutation";
import { useMe } from "../hooks/useMe";
import {
  editOrderMutation,
  editOrderMutationVariables,
} from "../__generated__/editOrderMutation";
import {
  getOrderQuery,
  getOrderQueryVariables,
} from "../__generated__/getOrderQuery";
import { OrderStatus } from "../__generated__/globalTypes";
import { orderUpdatesSubscription } from "../__generated__/orderUpdatesSubscription";

const Order = () => {
  const { id } = useParams() as { id: string };
  const { data: userData } = useMe();
  const [editOrderMutation] = useMutation<
    editOrderMutation,
    editOrderMutationVariables
  >(EDIT_ORDER_MUTATION, {});
  const { data, subscribeToMore } = useQuery<
    getOrderQuery,
    getOrderQueryVariables
  >(GET_ORDER_QUERY, {
    variables: {
      getOrderInput: {
        id: +id,
      },
    },
  });

  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          orderUpdatesInput: {
            id: +id,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: orderUpdatesSubscription } }
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);
  const onButtonClick = (newStatus: OrderStatus) => {
    editOrderMutation({
      variables: {
        editOrderInput: {
          id: +id,
          status: newStatus,
        },
      },
    });
  };
  const hours = new Date(data?.getOrder.order?.createdAt).getHours();
  const minutes = new Date(data?.getOrder.order?.createdAt).getMinutes();
  const time = `${hours} : ${minutes}`;
  return (
    <div className="page-container ">
      <Helmet>
        <title>Order Details | Crave Eats</title>
      </Helmet>
      <div className="mt-10 flex items-center justify-center flex-col gap-10">
        <p className=" font-bold text-2xl text-gray-600 justify-center items-center">
          Current Orders
        </p>
        <div className="bg-gray-200 hover:shadow-md rounded-lg w-4/12 hover:bg-gray-300 delay-50 duration-100 ">
          <div className="grid grid-cols-3 text-gray-800 items-center px-5 pt-5">
            <div className="col-span-2 flex flex-row gap-3 ">
              <div className="inline-flex items-center ">
                <GiHotMeal className=" text-3xl text-white bg-teal-600 rounded-full p-1" />

                <p className=" font-bold ml-2">
                  {data?.getOrder.order?.restaurant?.name}
                </p>
              </div>
            </div>
            <p className="flex justify-end font-bold"> Order #{id} </p>

            {/* <div className="flex justify-end">
              <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1"></button>
            </div> */}
          </div>

          <div className="">
            <div className="text-gray-800 font-light p-2 rounded-lg mt-3 mx-3">
              <div className="font-semibold">
                Status:{" "}
                <span className=" text-cyan-700 font-bold">
                  {data?.getOrder.order?.status}
                </span>
              </div>
              <span className="font-semibold">Driver:</span> Not yet
              <p className="font-semibold">
                Order Time: <span className=" font-bold">{time}</span>
              </p>
            </div>
            <div className=" flex justify-between mx-5 mt-2 mb-3">
              {userData?.me.role === "owner" && (
                <>
                  {data?.getOrder.order?.status === OrderStatus.Pending && (
                    <button
                      onClick={() => onButtonClick(OrderStatus.Cooking)}
                      className="font-semibold border border-gray-600 hover:bg-teal-600 hover:text-white hover:border-none rounded-xl py-1 px-2  text-gray-600"
                    >
                      Accept Order
                    </button>
                  )}
                  {data?.getOrder.order?.status === OrderStatus.Cooking && (
                    <button
                      onClick={() => onButtonClick(OrderStatus.Cooked)}
                      className="font-semibold border border-gray-600 hover:bg-teal-600 hover:text-white hover:border-none rounded-xl py-1 px-2  text-gray-600"
                    >
                      Order Cooked
                    </button>
                  )}
                </>
              )}
              {userData?.me.role === "client" &&
                data?.getOrder.order?.status === OrderStatus.Pending && (
                  <button
                    onClick={() => onButtonClick(OrderStatus.Cancelled)}
                    className="font-semibold border border-gray-600 hover:bg-teal-600 hover:text-white hover:border-none rounded-xl py-1 px-2  text-gray-600"
                  >
                    Cancel Order
                  </button>
                )}
              <span className=" font-bold text-xl text-teal-600">
                ${data?.getOrder.order?.total}
              </span>
            </div>
          </div>
        </div>
        <p className=" inline-flex items-center font-bold text-2xl text-gray-600  ">
          <MdWatchLater className="mr-2" />
          Previous Orders
        </p>
        <div className="bg-gray-200 hover:shadow-md rounded-lg w-4/12 hover:bg-gray-300 delay-50 duration-100 ">
          <div className="grid grid-cols-3 text-gray-800 items-center px-5 pt-5">
            <div className="col-span-2 flex flex-row gap-3 ">
              <div className="inline-flex items-center ">
                <GiHotMeal className=" text-3xl text-white bg-teal-600 rounded-full p-1" />

                <p className=" font-bold ml-2">
                  {data?.getOrder.order?.restaurant?.name}
                </p>
              </div>
            </div>
            <p className="flex justify-end font-bold"> Order #{id} </p>

            {/* <div className="flex justify-end">
              <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1"></button>
            </div> */}
          </div>

          <div className="">
            <div className="text-gray-800 font-light p-2 rounded-lg mt-3 mx-3">
              <p className="font-semibold">
                Status: {data?.getOrder.order?.status}
              </p>{" "}
              <span className="font-semibold">Driver:</span> Not yet
              <p className="font-semibold">
                Order Time: <span className=" font-bold">{time}</span>
              </p>
            </div>
            <div className=" flex justify-between mx-5 mt-2 mb-3">
              {userData?.me.role === "client" && (
                <button className="font-semibold border border-gray-600 hover:bg-teal-600 hover:text-white hover:border-none rounded-xl py-1 px-2  text-gray-600">
                  re-order
                </button>
              )}
              <span className=" font-bold text-xl text-teal-600">
                ${data?.getOrder.order?.total}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
