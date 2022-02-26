import { useApolloClient, useMutation } from "@apollo/client";
import React, { Fragment, useRef } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { ButtonForm } from "../../../components/form-button";
import { FormError } from "../../../components/form-error";
import { useMe } from "../../../hooks/useMe";
import { IChangePasswordForm } from "../../../interfaces/user.interface";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../../../__generated__/editProfileMutation";
import { EDIT_PROFILE_MUTATION } from "./general-tab";

export const SecurityTab = () => {
  const strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );

  const contextClass: { [key: string]: any } = {
    success: "bg-gray-700",
    error: "bg-gray-700",
    info: "bg-gray-700",
    warning: "bg-gray-700",
    default: "bg-gray-700",
    dark: "bg-white-600 font-gray-300",
  };

  const ToastContent = () => (
    <Fragment>
      <div className=" m-1">
        <div className="toastify-body">
          <span className=" text-xs font-sans">
            Password updated successfully 😊
          </span>
        </div>
      </div>
    </Fragment>
  );

  const onCompleted = (data: editProfileMutation) => {
    // Swal.fire("Success?", "Password updated successfully", "success");
    toast.success(<ToastContent />, {
      transition: Bounce,
      hideProgressBar: true,
      autoClose: 3000,
    });
  };
  const [editProfileMutation, { loading }] = useMutation<
    editProfileMutation,
    editProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { isValid, errors },
  } = useForm<IChangePasswordForm>({
    mode: "onChange",
  });

  // Confirm password validation
  const password = useRef<IChangePasswordForm["password"]>();
  password.current = watch("password");

  const onSubmit = () => {
    const { password } = getValues();

    editProfileMutation({
      variables: {
        editUserProfileInput: {
          ...(password !== "" && { password }),
        },
      },
    });
  };

  return (
    <div>
      <div>
        <div className="border-b border-gray-300">
          <h2 className=" font-extrabold text-lg mb-5 text-gray-700">
            Change Password
          </h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-3 pt-3">
            <input
              {...register("password", {
                minLength: 8,
                maxLength: 15,
                required: "New Password is required",
                validate: (value) => value !== "",
                pattern: {
                  value: strongRegex,
                  message:
                    "Must contain at least one lowercase, uppercase or numeric character",
                },
              })}
              type="password"
              placeholder="New Password"
              className="input"
            />
            {errors["password"]?.type === "minLength" && (
              <FormError errorMessage="Please choose a password with at least 8 characters" />
            )}
            {errors["password"]?.type === "maxLength" && (
              <FormError errorMessage="Please choose a password with no more than 15 characters" />
            )}
            {errors["password"]?.message && (
              <FormError errorMessage={errors.password?.message} />
            )}
            <input
              {...register("confirmPassword", {
                required: true,
                minLength: 8,
                maxLength: 15,
                validate: (value) => value === password.current,
              })}
              type="password"
              placeholder="Confirm Password"
              className="input"
            />
            {errors["confirmPassword"] &&
              errors["confirmPassword"]?.type === "required" && (
                <FormError errorMessage="Confirmation password is required." />
              )}
            {errors["confirmPassword"] &&
              errors["confirmPassword"]?.type === "validate" && (
                <FormError errorMessage="Passwords do not match" />
              )}
            <ButtonForm
              loading={loading}
              canClick={isValid}
              actionText="Save changes"
            />
          </div>
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
