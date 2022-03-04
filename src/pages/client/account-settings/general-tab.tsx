import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { ME_QUERY, useMe } from "../../../hooks/useMe";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../../../__generated__/editProfileMutation";
import { IEditProfileForm } from "../../../interfaces/user.interface";
import { useForm } from "react-hook-form";
import { ButtonForm } from "../../../components/form-button";
import { IoMdCloudUpload } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import { FormError } from "../../../components/form-error";
import { BsImageFill } from "react-icons/bs";
import { EDIT_PROFILE_MUTATION } from "../../../graphql/query-mutation";
import ToastAutoClose from "../../../components/toast";

export const GeneralTab = () => {
  const [uploading, setUploading] = useState(false);
  const nameRegex = /^([^0-9]*)$/;

  const usernameRegex = /^[a-z0-9_-]{3,15}$/;

  const { data: userData } = useMe();

  const client = useApolloClient();

  const onCompleted = (data: editProfileMutation) => {
    const {
      editUserProfile: { ok, message },
    } = data;

    if (ok === true && message) {
      ToastAutoClose({
        typeState: 0,
        message,
        title: "Success",
      });
    } else if (message) {
      ToastAutoClose({
        typeState: 1,
        message,
        title: "Error",
      });
    }

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
        } = getValues();
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
      birthdate: new Date(userData?.me.birthdate).toLocaleDateString(),
    },
  });

  const onSubmit = async () => {
    try {
      setUploading(true);
      const {
        firstName,
        lastName,
        username,
        phoneNumber,
        address,
        birthdate,
        file,
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
            birthdate,
          },
        },
      });
    } catch (error) {}
  };

  return (
    <div>
      <Helmet>
        <title>Profile Details</title>
      </Helmet>
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
        </form>
      </div>
    </div>
  );
};
