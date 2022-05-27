import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet-async";
import { ME_QUERY, useMe } from "../../../hooks/useMe";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../../../generated/editProfileMutation";
import { IEditProfileForm } from "../../../interfaces/user.interface";
import { Controller, useForm } from "react-hook-form";
import { ButtonForm } from "../../../components/form-button";
import { IoMdCloudUpload } from "react-icons/io";
import { BiReset } from "react-icons/bi";
import { FormError } from "../../../components/form-error";
import { BsImageFill } from "react-icons/bs";
import { EDIT_PROFILE_MUTATION } from "../../../graphql/query-mutation";
import ToastAutoClose from "../../../components/toast";
import { nameRegex, usernameRegex } from "../../../utils/regex";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { IoCalendarNumber } from "react-icons/io5";
import { BASE_URL } from "../../../constants/constants";

export const GeneralTab = () => {
  const [uploading, setUploading] = useState(false);

  const [calendar, setCalendar] = useState(false);

  const [calendarValue, onChange] = useState(new Date());

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
        typeState: 2,
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
        // Swal.fire("Success?", "Profile updated successfully", "success");
      } catch (error) {
        throw new Error("Could not update profile");
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
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
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
        await fetch(BASE_URL, {
          method: "POST",
          body: formBody,
        })
      ).json();
      const avatar = request.secure_url;
      editProfileMutation({
        variables: {
          editUserProfileInput: {
            firstName,
            lastName,
            username,
            phoneNumber,
            address,
            avatar,
            birthdate: calendarValue.toLocaleDateString(),
          },
        },
      });
    } catch (error) {}
  };

  const showCalendar = () => {
    setCalendar(!calendar);
  };

  return (
    <div>
      <title>Profile Details</title>

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
          {/* <div className=" inline-flex items-center">
            <input
              {...register("birthdate")}
              name="birthdate"
              type="text"
              placeholder="Birthdate"
              className="input"
            />
            <IoCalendarNumber
              onClick={showCalendar}
              className=" ml-4 text-3xl text-gray-600"
            />
          </div> */}

          <div className="relative">
            <div className=" flex items-center">
              <span className=" border border-gray-300 px-5 py-3  rounded-lg shadow-inner font-semibold text-gray-500 grow">
                {getValues().birthdate}
              </span>
              <IoCalendarNumber
                onClick={showCalendar}
                className=" ml-4 text-3xl text-gray-600"
              />
            </div>
            {calendar && (
              <Fragment>
                <div className="absolute right-0">
                  <Controller
                    control={control}
                    name="birthdate"
                    render={({ field: { value } }) => (
                      <Calendar
                        className={`rounded-md`}
                        onChange={onChange}
                        // value={calendarValue}
                        maxDate={new Date()}
                        onClickDay={() =>
                          setValue(
                            "birthdate",
                            calendarValue.toLocaleDateString()
                          )
                        }
                      />
                    )}
                  />
                </div>
              </Fragment>
            )}
          </div>

          {/* {calendar && <Calendar onChange={onChange} value={calendarValue} />} */}

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
