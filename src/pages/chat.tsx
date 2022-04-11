import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaSmile, FaUser } from "react-icons/fa";
import { MdSend } from "react-icons/md";
import { Breadcrumb } from "../components/breadcrumb";
import {
  MY_CHATS_QUERY,
  MY_MESSAGES_QUERY,
  SEND_MESSAGE_MUTATION,
} from "../graphql/query-mutation";
import { useMe } from "../hooks/useMe";
import {
  myChatsQuery,
  myChatsQueryVariables,
} from "../__generated__/myChatsQuery";
import {
  myMessagesQuery,
  myMessagesQueryVariables,
} from "../__generated__/myMessagesQuery";
import {
  sendMessage,
  sendMessageVariables,
} from "../__generated__/sendMessage";

interface IUser {
  id: number;
  firstName: string;
  // avatar: string;
}
export const Chat = () => {
  const page = 1;
  const { data: me } = useMe();
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);
  const { register, handleSubmit, getValues } = useForm({ mode: "onSubmit" });
  const [chatId, setChatId] = useState(0);
  const { data } = useQuery<myChatsQuery, myChatsQueryVariables>(
    MY_CHATS_QUERY,
    {
      variables: {
        myChatsInput: {
          page,
        },
      },
    }
  );

  const [myMessagesQuery, { data: messages }] = useLazyQuery<
    myMessagesQuery,
    myMessagesQueryVariables
  >(MY_MESSAGES_QUERY, {});

  const onClick = (chatId: number, user1Name: IUser, user2Name: IUser) => {
    myMessagesQuery({
      variables: {
        myMessagesInput: {
          page,
          chatId,
        },
      },
    });

    if (user1Name.id !== me?.me.id) {
      setName(user1Name.firstName);
    } else {
      setName(user2Name.firstName);
    }

    setChatId(chatId);

    setOpen(true);
  };

  const [sendMessage] = useMutation<sendMessage, sendMessageVariables>(
    SEND_MESSAGE_MUTATION,
    {}
  );

  const onSend = () => {
    const { content } = getValues();
    sendMessage({
      variables: {
        createMessageInput: {
          chatId,
          content,
        },
      },
    });
    console.log(content);
  };

  return (
    <div className=" bg-gray-100 ">
      <div className="flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto">
        <div className="pr-10 lg:pr-10 w-full mb-60">
          <Breadcrumb step1="Home" step2="Chat" />
          <div className="max-h-full h-full flex flex-row">
            {/* Left Sidebar start */}

            <aside className="w-full lg:w-2/6 bg-white  rounded-lg mr-5 shadow-md">
              <div className="max-w-full h-full w-full flex flex-col">
                <div className="flex p-10 justify-between">
                  <div className="text-4xl font-bold  text-gray-600">Chats</div>

                  {/* Switcher start */}

                  <div>
                    <button className=" text-gray-500 text-sm p-2.5"></button>
                  </div>
                </div>
                {/* Users section start */}
                <div className=" flex-1 overflow-scroll scrollbar-hide ">
                  <div className="w-full space-y-5">
                    {data?.myChats!.results?.map((chat) => (
                      <div
                        key={chat.id}
                        onClick={() => onClick(chat.id, chat.user1, chat.user2)}
                        className="cursor-pointer flex px-10 hover:bg-teal-50 py-2 "
                      >
                        {chat.user1.id === me?.me.id ? (
                          chat.user2.avatar ? (
                            <img
                              className="w-12 h-12 mr-4 rounded-full shadow-md bg-gray-500 bg-center object-cover"
                              src={`${chat.user2.avatar}`}
                              alt="profile"
                              width="384"
                              height="512"
                            />
                          ) : (
                            <div className="  flex items-center w-12 h-12 mr-4 rounded-full shadow-md bg-gray-300 bg-center object-cover">
                              <FaUser className=" mx-auto text-gray-500" />
                            </div>
                          )
                        ) : chat.user1.avatar ? (
                          <img
                            className="w-12 h-12 mr-4 rounded-full shadow-md bg-gray-500 bg-center object-cover"
                            src={`${chat.user1.avatar}`}
                            alt="profile"
                            width="384"
                            height="512"
                          />
                        ) : (
                          <div className="  flex items-center w-12 h-12 mr-4 rounded-full shadow-md bg-gray-300 bg-center object-cover">
                            <FaUser className=" mx-auto text-gray-500" />
                          </div>
                        )}

                        <div className="flex flex-col flex-1">
                          <div className="flex justify-between items-center">
                            <div className="text-gray-800 text-base font-semibold">
                              {chat.user1.id === me?.me.id
                                ? chat.user2.firstName
                                : chat.user1.firstName}
                            </div>
                            <div className="text-gray-700 text-xs"> 17:31</div>
                          </div>
                          <h5 className=" text-xs text-gray-800">
                            How are you today?
                          </h5>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            {/* Left Sidebar end */}

            {/* Right section star */}
            <section className=" relative max-h-full h-full bg-white shadow-md rounded-lg w-full flex flex-col lg:flex hidden">
              {/* All message start */}

              {open ? <div> Hello</div> : <div> Goobye</div>}

              {/* Header message Start */}

              <div className="grid grid-cols-2 border-b">
                <div className="py-6 pl-10">
                  <div className="cursor-pointer flex">
                    <div className="mr-4 relative w-12 h-12 bg-gray-300 rounded-full">
                      <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0"></div>
                    </div>
                    <div className=" flex flex-col flex-1">
                      <div className="flex">
                        <div className="text-gray-800 text-base font-semibold">
                          {name}
                        </div>
                      </div>
                      <h5 className=" text-xs text-gray-800">Online</h5>
                    </div>
                  </div>
                </div>
                <div className="justify-end flex pr-10"></div>
              </div>

              {/* Header message End */}

              <div className="flex-1 overflow-scroll scrollbar-hide p-10 space-y-5">
                {/* Left Message Start */}
                {messages?.myMessages.results?.map((message, index) =>
                  message.sender.id !== me?.me.id ? (
                    <div key={index} className="flex justify-start">
                      <div className=" w-14 mr-5">
                        {message.sender.id !== me?.me.id &&
                        message.sender.avatar ? (
                          <img
                            className="w-12 h-12 mr-2 rounded-full shadow-md bg-gray-500 bg-center object-cover"
                            src={`${message.sender.avatar}`}
                            alt="profile"
                            width="384"
                            height="512"
                          />
                        ) : (
                          <div className="  flex items-center w-12 h-12 mr-2 rounded-full shadow-md bg-gray-300 bg-center object-cover">
                            <FaUser className=" mx-auto text-gray-500" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col space-y-5 text-left">
                        <div>
                          <span className="bg-gray-100 text-gray-900 px-4 py-3 text-base rounded-bl-full rounded-r-full inline-flex max-w-screen-xl ">
                            {message.content}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Left Message End
                    // Right message Start

                    <div key={index} className="flex justify-end">
                      <div className="space-y-5 text-right">
                        <div className=" bg-teal-600 text-white px-4 py-3 text-base rounded-l-full rounded-br-full inline-block max-w-xl">
                          {message.content}
                        </div>
                      </div>
                    </div>
                  )
                )}

                {/* Right Message End */}
              </div>
              {/* All message end */}
              <form action="" onSubmit={handleSubmit(onSend)}>
                <div className="flex-none p-5">
                  <div>
                    <div className="relative flex">
                      <span className="absolute inset-y-0 flex-items-center">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                        >
                          <FaSmile />
                        </button>
                      </span>

                      <input
                        type="text"
                        placeholder="Type here ..."
                        {...register("content", {
                          minLength: 1,
                          maxLength: 150,
                        })}
                        className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-12 bg-gray-100 rounded-full py-3 pr-5"
                      />
                      <div className="ml-5">
                        <button className=" inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-white bg-teal-600 hover:bg-teal-400 focus:outline-none">
                          <MdSend />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </section>
            {/* Right start end*/}
          </div>
        </div>
      </div>
    </div>
  );
};
