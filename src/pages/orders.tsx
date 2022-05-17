import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { GiHotMeal } from "react-icons/gi";
import { MdWatchLater } from "react-icons/md";
import { useParams } from "react-router-dom";
import {
  EDIT_ORDER_MUTATION,
  GET_ORDERS_QUERY,
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
import {
  getOrdersMutation,
  getOrdersMutationVariables,
} from "../__generated__/getOrdersMutation";
import { OrderStatus } from "../__generated__/globalTypes";
import { orderUpdatesSubscription } from "../__generated__/orderUpdatesSubscription";

const Orders = () => {
  const { id } = useParams() as { id: string };
  const { data: userData } = useMe();

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
  const { data: getOrdersData } = useQuery<
    getOrdersMutation,
    getOrdersMutationVariables
  >(GET_ORDERS_QUERY, {
    variables: {
      getOrdersInput: {
        page: 1,
        // status: OrderStatus.Cooked,
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

  const hours = new Date(data?.getOrder.order?.createdAt).getHours();
  const minutes = new Date(data?.getOrder.order?.createdAt).getMinutes();
  const time = `${hours} : ${minutes}`;
  return (
    <div className="min-h-screen">
      <div className="md:page-container ">
        <Helmet>
          <title>Orders Details | Crave Eats</title>
        </Helmet>
        <div className="mt-10 flex items-center justify-center flex-col gap-10">
          {getOrdersData?.getOrders.ok && userData?.me.role === "client" && (
            <div className="mb-20 mt-10 flex flex-col w-full items-center">
              <p className=" inline-flex items-center  font-bold text-2xl text-gray-600 mb-10 ">
                <MdWatchLater className="mr-2" />
                Previous Orders
              </p>
              {getOrdersData.getOrders.orders?.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-200 hover:shadow-md rounded-lg w-full md:w-8/12 xl:w-6/12 hover:bg-gray-300 delay-50 duration-100 mb-8"
                >
                  <div className="grid grid-cols-3 text-gray-800 items-center px-5 pt-5">
                    <div className="col-span-2 flex flex-row gap-3 ">
                      <div className="inline-flex items-center ">
                        <GiHotMeal className=" text-3xl text-white bg-teal-600 rounded-full p-1" />

                        <p className=" font-bold ml-2">
                          {data?.getOrder.order?.restaurant?.name}
                        </p>
                      </div>
                    </div>
                    <p className="flex justify-end font-bold">
                      {" "}
                      Order #{order.id}{" "}
                    </p>

                    {/* <div className="flex justify-end">
              <button className="rounded-full hover:bg-gray-700 delay-50 duration-100 p-1"></button>
            </div> */}
                  </div>

                  <div className="my-2">
                    <div className="text-gray-800 font-light p-2 rounded-lg mt-3 mx-3">
                      <p className="font-semibold">Status: {order.status}</p>{" "}
                      <span className="font-semibold">Driver:</span> Not yet
                      <p className="font-semibold">
                        Order Time:{" "}
                        <span className=" font-bold">
                          {new Date(order.createdAt).toLocaleString()}
                        </span>
                      </p>
                    </div>
                    <div className=" flex justify-between mx-5 mt-2 mb-3">
                      <span className=" font-bold text-xl text-teal-600">
                        ${order.total}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
