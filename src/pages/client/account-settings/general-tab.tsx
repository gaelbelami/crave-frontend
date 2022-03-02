import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { Fragment, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ME_QUERY, useMe } from "../../../hooks/useMe";

import { toast, Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../../../__generated__/editProfileMutation";
import { IEditProfileForm } from "../../../interfaces/user.interface";
import { useForm } from "react-hook-form";
import { ButtonForm } from "../../../components/form-button";
import profile from "../../../images/profile.jpg";
import { IoMdCloudUpload } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import { FormError } from "../../../components/form-error";
import { BsImageFill } from "react-icons/bs";

export const EDIT_PROFILE_MUTATION = gql`
  mutation editProfileMutation($editUserProfileInput: EditUserProfileInput!) {
    editUserProfile(editUserProfileInput: $editUserProfileInput) {
      ok
      message
    }
  }
`;

export const GeneralTab = () => {
  const [uploading, setUploading] = useState(false);
  const nameRegex = /^([^0-9]*)$/;

  const usernameRegex = /^[a-z0-9_-]{3,15}$/;

  const ToastContent = () => (
    <Fragment>
      <div className=" m-1">
        <div>
          <div className="">
            <h6 className=" font-semibold font-sans">Success</h6>
          </div>
        </div>
        <div className="toastify-body">
          <span className=" text-xs font-sans">
            Your profile has been updated successfully😊
          </span>
        </div>
      </div>
    </Fragment>
  );

  const contextClass: { [key: string]: any } = {
    success: "bg-gray-700",
    error: "bg-gray-700",
    info: "bg-gray-700",
    warning: "bg-gray-700",
    default: "bg-gray-700",
    dark: "bg-white-600 font-gray-300",
  };
  const { data: userData } = useMe();

  const client = useApolloClient();

  const onCompleted = (data: editProfileMutation) => {
    const {
      editUserProfile: { ok },
    } = data;

    if (ok && userData) {
      setUploading(false);
      const {
        me: { id },
      } = userData;

      try {
        const {
          firstName,
          lastName,
          username,
          phoneNumber,
          address,
          birthdate,
          file: avatar,
          // email: newEmail,
        } = getValues();

        // if (previousEmail !== newEmail) {
        //   client.writeFragment({
        //     id: `User:${id}`,

        //     fragment: gql`
        //       fragment EditedUser on User {
        //         email
        //         verified
        //       }
        //     `,
        //     data: {
        //       email: newEmail,
        //       verified: false,
        //     },
        //   });
        // }

        client.writeFragment({
          id: `User:${id}`,

          fragment: gql`
            fragment EditedUser on User {
              firstName
              lastName
              username
              phoneNumber
              address
              birthdate
              avatar
            }
          `,
          data: {
            firstName,
            lastName,
            username,
            phoneNumber,
            address,
            birthdate,
            avatar,
          },
        });
        Swal.fire("Success?", "Profile updated successfully", "success");
        toast.success(<ToastContent />, {
          transition: Bounce,
          hideProgressBar: true,
          autoClose: 3000,
        });
      } catch (error) {
        throw new Error("Could not update cash");
      }
    }
  };
  const [editProfileMutation, { loading }] = useMutation<
    editProfileMutation,
    editProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: ME_QUERY,
      },
    ],
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isValid },
  } = useForm<IEditProfileForm>({
    mode: "onChange",
    defaultValues: {
      firstName: userData?.me.firstName,
      lastName: userData?.me.lastName,
      username: userData?.me.username,
      phoneNumber: userData?.me.phoneNumber,
      address: userData?.me.address,
      // avatar: userData?.me.avatar,
      // email: userData?.me.email,
      birthdate: new Date(userData?.me.birthdate).toLocaleDateString(),
    },
  });

  // Confirm password validation
  const password = useRef<IEditProfileForm["password"]>();
  password.current = watch("password");

  const onSubmit = async () => {
    try {
      setUploading(true);
      const {
        firstName,
        lastName,
        username,
        phoneNumber,
        address,
        // email,
        birthdate,
        file,
        // password,
      } = getValues();

      const actualFile = file![0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const request = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      const avatar = request.secure_url;
      console.log(avatar);
      editProfileMutation({
        variables: {
          editUserProfileInput: {
            firstName,
            lastName,
            username,
            phoneNumber,
            address,
            avatar,
            // email,
            birthdate,
            // ...(password !== "" && { password }),
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div>
      <div className="border-b border-gray-300">
        <h2 className=" font-extrabold text-lg mb-5 text-gray-700 ">
          Profile Details
        </h2>
      </div>

      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-5"
        >
          <div className=" inline-flex items-center mb-4">
            {!userData?.me.avatar || loading ? (
              <div className="w-28 h-28 rounded-lg shadow-md bg-gray-200 bg-center object-cover mr-2">
                <BsImageFill className=" h-16 w-auto mx-auto my-auto mt-5  object-cover object-center text-gray-500 animate-pulse" />
              </div>
            ) : (
              <img
                className="w-28 h-28 rounded-lg shadow-md bg-center object-cover mr-2"
                src={userData?.me.avatar}
                alt="profile"
                width="384"
                height="512"
              />
            )}
            <div className="items-center text-gray-500 cursor-pointer text-sm font-semibold mx-2">
              <label className="cursor-pointer inline-flex items-center border border-gray-400 rounded-lg shadow-sm px-2 py-1">
                <IoMdCloudUpload className="mr-2" />
                Upload
                <input
                  className="hidden "
                  type="file"
                  accept="image/*"
                  {...register("file")}
                />
              </label>
            </div>
            <div className="items-center text-gray-500 cursor-pointer text-sm font-semibold">
              <div className=" inline-flex items-center border border-gray-400 rounded-lg shadow-sm px-2 py-1">
                <BiReset className="mr-2" />
                Reset
              </div>
            </div>
          </div>
          <input
            {...register("firstName", {
              required: "First name is required",
              pattern: {
                value: nameRegex,
                message: "Numbers and Special characters are not allowed",
              },
              minLength: 3,
              maxLength: 30,
              validate: (value) => value !== "",
            })}
            name="firstName"
            type="text"
            placeholder="First Name"
            className="input"
          />
          {errors["firstName"] && errors["firstName"]?.message && (
            <FormError errorMessage={errors.firstName?.message} />
          )}
          {errors["firstName"] && errors["firstName"]?.type === "minLength" && (
            <FormError errorMessage="Min length 3" />
          )}
          {errors["firstName"] && errors["firstName"]?.type === "maxLength" && (
            <FormError errorMessage="Max length exceeded" />
          )}
          <input
            {...register("lastName", {
              pattern: {
                value: nameRegex,
                message: "Numbers and Special characters are not allowed",
              },
              minLength: 3,
              maxLength: 30,
              validate: (value) => value !== "",
            })}
            name="lastName"
            type="text"
            placeholder="Last Name"
            className="input"
          />
          <input
            {...register("username", {
              pattern: {
                value: usernameRegex,
                message: "Please input a valid username",
              },
              minLength: 3,
              maxLength: 30,
              validate: (value) => value !== "",
            })}
            name="username"
            type="text"
            placeholder="Username"
            className="input"
          />
          {/* <input
            {...register("email", {
              pattern: {
                value: strongRegex,
                message: "Please input a valid email!",
              },
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          /> */}
          <input
            {...register("phoneNumber")}
            name="phoneNumber"
            type="number"
            placeholder="Phone Number"
            className="input"
          />
          <input
            {...register("address")}
            name="address"
            type="text"
            placeholder="Address"
            className="input"
          />
          <input
            {...register("birthdate")}
            name="birthdate"
            type="text"
            placeholder="Birthdate"
            className="input"
          />

          <ButtonForm
            loading={uploading}
            canClick={isValid}
            actionText="Save changes"
          />
          <ToastContainer
            toastClassName={({ type }: any) =>
              contextClass[type || "sucess"] +
              " relative flex p-1 min-h-10 rounded-md justify-between overflow-hidden cursor-pointer"
            }
          />
        </form>
      </div>
    </div>
  );
};
