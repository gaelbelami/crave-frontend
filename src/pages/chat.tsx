import {
  useApolloClient,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft, FaSmile, FaUser } from "react-icons/fa";
import { HiChatAlt2 } from "react-icons/hi";
import { MdSend } from "react-icons/md";
import { Breadcrumb } from "../components/breadcrumb";
import { Picker, Emoji } from "emoji-mart";
import reactStringReplace from "react-string-replace";
import {
  MY_CHATS_QUERY,
  MY_MESSAGES_QUERY,
  SEND_MESSAGE_MUTATION,
  WATCH_MESSAGES_SUBSCRIPTION,
} from "../graphql/query-mutation";
import { useMe } from "../hooks/useMe";
import {
  myChatsQuery,
  myChatsQueryVariables,
  myChatsQuery_myChats_results_restaurant,
} from "../generated/myChatsQuery";
import {
  myMessagesQuery,
  myMessagesQueryVariables,
} from "../generated/myMessagesQuery";
import { sendMessage, sendMessageVariables } from "../generated/sendMessage";
import { watchMessagesSubscription } from "../generated/watchMessagesSubscription";
import { Helmet } from "react-helmet-async";
import { RiChatSmile2Fill } from "react-icons/ri";
import "react-toastify/dist/ReactToastify.css";

interface IUser {
  id: number;
  firstName: string;
  avatar: string | null;
}

export const Chat = () => {
  const client = useApolloClient();
  const { data: me } = useMe();

  const page = 1;

  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [chatId, setChatId] = useState(0);
  const [selectedChat, setSelectedChat] = useState(0);

  const [open, setOpen] = useState(false);
  const [emojis, setEmojis] = useState<any[]>([]);
  const [emojiPickerVisible, setShowEmojiPicker] = useState(false);

  const [side, setSide] = useState(false);
  const [openChat, setChatComponent] = useState(false);

  const { register, handleSubmit, getValues, setValue } = useForm({
    mode: "onSubmit",
  });

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

  const [myMessagesQuery, { data: messages, subscribeToMore }] = useLazyQuery<
    myMessagesQuery,
    myMessagesQueryVariables
  >(MY_MESSAGES_QUERY);

  useEffect(() => {
    if (messages?.myMessages.ok) {
      subscribeToMore({
        document: WATCH_MESSAGES_SUBSCRIPTION,
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: watchMessagesSubscription } }
        ) => {
          if (!data) return prev;
          const newFeedItem = data.watchMessages.realTimeMessage;
          return Object.assign({}, prev, {
            myMessages: {
              // ok: messages.myMessages.ok,
              results: [newFeedItem, ...prev.myMessages.results!],
            },
          });
        },
      });
    }
  }, [messages]);

  const onClick = (
    chatId: number,
    sender: IUser,
    receiver: IUser,
    restaurant: myChatsQuery_myChats_results_restaurant
  ) => {
    myMessagesQuery({
      variables: {
        myMessagesInput: {
          page,
          chatId,
        },
      },
    });

    if (sender.id !== me?.me.id) {
      setName(sender.firstName);
      setAvatar(sender.avatar!);
    } else {
      setName(restaurant.name);
      setAvatar(receiver.avatar!);
    }

    setChatComponent(true);

    setChatId(chatId);

    setOpen(true);
    if (chatId) {
      setSelectedChat(chatId);
    }
  };
  const onCompleted = (data: sendMessage) => {
    const {
      sendMessage: { ok, realTimeMessage },
    } = data;

    if (ok) {
      const queryResult = client.readQuery({
        query: MY_MESSAGES_QUERY,
        variables: {
          myMessagesInput: {
            page,
            chatId,
          },
        },
      });
      console.log(queryResult);
      client.writeQuery({
        query: MY_MESSAGES_QUERY,
        variables: {
          myMessagesInput: {
            page,
            chatId,
          },
        },
        data: {
          myMessages: {
            ok: queryResult.myMessages.ok,
            results: [...queryResult.myMessages.results, realTimeMessage],
          },
        },
      });
    }
  };

  const [sendMessage] = useMutation<sendMessage, sendMessageVariables>(
    SEND_MESSAGE_MUTATION,
    {
      onCompleted,
    }
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
    setValue("content", "");
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!emojiPickerVisible);
  };

  const addEmoji = ({ colons }: any) => {
    const { content } = getValues();
    setEmojis(colons);
    setValue("content", (content + " " + emojis).trim());
  };

  const handleDocumentClick = (event: any) => {
    let isEmojiClassFound = false;
    event &&
      event.path &&
      event.path.forEach((elem: any) => {
        if (elem && elem.classList) {
          const data = elem.classList.value;
          if (data.includes("emoji")) {
            isEmojiClassFound = true;
          }
        }
      });
    if (isEmojiClassFound === false && event.target.id !== "emojis-btn")
      setShowEmojiPicker(false);
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick, false);
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleSide = () => {
    setSide(!side);
  };

  return (
    <div className=" bg-gray-100 ">
      <title>Chat | Crave ~ Eat</title>

      <div className="flex flex-1 overflow-hidden h-screen max-w-screen-2xl m-auto">
        <div className="w-full mb-48">
          <Breadcrumb step1="Home" step2="Chat" />
          <div className="max-h-full h-full flex flex-row">
            {/* Left Sidebar start */}

            {side &&
              data?.myChats?.results?.length &&
              data?.myChats?.results?.length > 0 && (
                <aside
                  className={`w-full lg:w-2/6 bg-white md:block  rounded-lg md:mr-5 shadow-md ${
                    openChat === true && "hidden"
                  }`}
                >
                  <div className="max-w-full h-full w-full flex flex-col">
                    <div className="flex py-4 px-3 md:p-5 justify-between">
                      <div className="md:text-2xl font-bold font-sans text-teal-600">
                        Chats
                      </div>

                      {/* Switcher start */}

                      <div>
                        <button className=" text-gray-500 text-sm p-2.5"></button>
                      </div>
                    </div>
                    {/* Users section start */}
                    <div className=" flex-1 overflow-scroll scrollbar-hide ">
                      <div className="w-full">
                        {data?.myChats!.results?.map((chat) => (
                          <div
                            key={chat.id}
                            onClick={() =>
                              onClick(
                                chat.id,
                                chat.user1,
                                chat.user2,
                                chat.restaurant
                              )
                            }
                            className={`cursor-pointer flex md:px-10 px-2 hover:bg-teal-50 py-4 ${
                              selectedChat === chat.id &&
                              "bg-gray-200 hover:bg-gray-200"
                            }`}
                          >
                            {chat.user1.id === me?.me.id ? (
                              chat.user2.avatar ? (
                                <img
                                  className=" w-10 h-10 md:w-12 md:h-12 mr-4 rounded-full shadow-md bg-gray-100 bg-center object-cover"
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
                                <div className="text-gray-800 text-base font-semibold mt-2">
                                  {chat.user1.id === me?.me.id
                                    ? chat.restaurant.name
                                    : chat.user1.firstName}
                                </div>
                                <div className="text-xl mt-2 mr-3 text-teal-600">
                                  <RiChatSmile2Fill />
                                </div>
                              </div>
                              <h5 className=" text-xs text-gray-800">
                                {/* {chatId === chat.id &&
                              messages?.myMessages.results!.map(
                                (message) =>
                                  message.chatId === chat.id && <div>{}</div>
                              )} */}
                              </h5>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </aside>
              )}

            {/* Left Sidebar end */}

            {/* Right section star */}
            {open && side === true ? (
              <section
                className={` relative max-h-full h-full  bg-white shadow-md rounded-lg w-full flex flex-col lg:flex ${
                  openChat === false && "hidden"
                }`}
              >
                {/* All message start */}

                {/* Header message Start */}

                <div className=" border-b">
                  <div className="py-2 px-3 md:py-6 md:pl-10 inline-flex items-center ">
                    <div onClick={() => setChatComponent(false)}>
                      <FaArrowLeft className="block md:hidden mr-5" />
                    </div>
                    <div className="cursor-pointer  inline-flex items-center">
                      {avatar ? (
                        <span className="relative">
                          <img
                            className=" w-10 h-10 md:w-12 md:h-12 mr-2 rounded-full shadow-md bg-gray-100 bg-center object-cover"
                            src={`${avatar}`}
                            alt="profile"
                            width="384"
                            height="512"
                          />
                          <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-2"></div>{" "}
                        </span>
                      ) : (
                        <div className="relative  flex items-center w-12 h-12 mr-2 rounded-full shadow-md bg-gray-300 bg-center object-cover">
                          <FaUser className=" mx-auto text-gray-500" />

                          <div className="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0"></div>
                        </div>
                      )}
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
                </div>

                {/* Header message End */}

                <div className="flex-1 overflow-scroll scrollbar-hide  p-5 md:p-10 space-y-5">
                  {/* Left Message Start */}
                  {messages?.myMessages.results?.map((message, index) =>
                    message.sender.id !== me?.me.id ? (
                      <div key={index} className="flex justify-start">
                        <div className=" w-14 md:mr-5">
                          {message.sender.id !== me?.me.id &&
                          message.sender.avatar ? (
                            <img
                              className=" w-10 h-10 md:w-12 md:h-12 md:mr-2 rounded-full shadow-md bg-gray-100 bg-center object-cover"
                              src={`${message.sender.avatar}`}
                              alt="profile"
                              width="384"
                              height="512"
                            />
                          ) : (
                            <div className="  flex items-center w-10 h-10 md:w-12 md:h-12 md:mr-2 rounded-full shadow-md bg-gray-300 bg-center object-cover">
                              <FaUser className=" mx-auto text-gray-500" />
                            </div>
                          )}
                        </div>
                        <div className="flex flex-col ">
                          <div className="space-y-5 text-left">
                            <div className="bg-gray-100 text-gray-900 px-4 py-3 text-sm  md:text-base rounded-bl-full rounded-r-full font-sans inline-flex max-w-screen-xl ">
                              {reactStringReplace(
                                message.content,
                                /:(.+?):/g,
                                (match, i) => (
                                  <span className="items-center mx-1">
                                    <Emoji
                                      key={i}
                                      emoji={match}
                                      set="apple"
                                      size={16}
                                    />
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // Left Message End
                      // Right message Start

                      <div key={index} className="flex justify-end">
                        <div className="space-y-5 text-right">
                          <div className=" bg-gradient-to-br from-teal-600 to-cyan-600 text-white px-4 py-3 text-sm md:text-base rounded-l-full rounded-br-full font-sans inline-flex items-center  max-w-xl">
                            {reactStringReplace(
                              message.content,
                              /:(.+?):/g,
                              (match, i) => (
                                <Emoji
                                  key={i}
                                  emoji={match}
                                  set="apple"
                                  size={16}
                                />
                              )
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  )}

                  {/* Right Message End */}
                  <span ref={messagesEndRef} />
                </div>

                {/* All message end */}
                <form action="" onSubmit={handleSubmit(onSend)}>
                  <div className="flex-none p-5">
                    <div>
                      <div className="relative flex">
                        <span className="absolute inset-y-0 flex-items-center">
                          {emojiPickerVisible && (
                            <div className=" bottom-14 z-1 absolute">
                              <Picker
                                onClick={(emojiTag) => addEmoji(emojiTag)}
                                showPreview={false}
                                showSkinTones={false}
                                skin={2}
                                set="apple"
                              />
                            </div>
                          )}
                          <button
                            id="emojis-btn"
                            onClick={toggleEmojiPicker}
                            type="button"
                            className="inline-flex items-center justify-center rounded-full h-10 w-10 md:h-12 md:w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
                          >
                            <FaSmile />
                          </button>
                        </span>

                        <input
                          type="text"
                          placeholder="Type here ..."
                          {...register("content", {
                            minLength: 2,
                            maxLength: 150,
                            validate: (value) => value !== "",
                          })}
                          className="w-full  focus:placeholder-gray-400 text-gray-600 placeholder-gray-400 pl-10 md:pl-12 bg-gray-100 rounded-full py-2 pr-2 hover:ring-1 hover:ring-teal-600 focus:outline-teal-600 focus:outline-1"
                        />

                        <div className="ml-2 md:ml-5 inline-flex items-center justify-center">
                          <button className="  inline-flex items-center justify-center rounded-full md:h-12 md:w-12 h-8 w-8 transition duration-500 ease-in-out text-white bg-teal-600 hover:bg-teal-400 focus:outline-none">
                            <MdSend />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </section>
            ) : (
              side === false && (
                <div className=" bg-white rounded-lg shadow-md w-full  flex flex-col items-center justify-center">
                  <HiChatAlt2 className=" text-8xl text-teal-600 text-opacity-50" />
                  <h5
                    onClick={toggleSide}
                    className=" text-md font-semibold text-teal-600 text-opacity-50 cursor-pointer"
                  >
                    Start a conversation
                  </h5>
                </div>
              )
            )}

            {/* Right start end*/}
          </div>
        </div>
      </div>
    </div>
  );
};
