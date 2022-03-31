import { useMutation } from "@apollo/client";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { ButtonForm } from "../../../components/form-button";
import { FormError } from "../../../components/form-error";
import ToastAutoClose from "../../../components/toast";
import { CHANGE_PASSWORD_USER } from "../../../graphql/query-mutation";
import { IChangePasswordForm } from "../../../interfaces/user.interface";
import { passwordRegex } from "../../../utils/regex";
import {
  changePasswordUserMutationVariables,
  changePasswordUserMutation,
} from "../../../__generated__/changePasswordUserMutation";

export const SecurityTab = () => {
  const onCompleted = (data: changePasswordUserMutation) => {
    const {
      changePasswordUser: { ok, message },
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
  };

  const [changePasswordUserMutation, { data: changePasswordResult, loading }] =
    useMutation<
      changePasswordUserMutation,
      changePasswordUserMutationVariables
    >(CHANGE_PASSWORD_USER, {
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
    const { oldPassword, password, confirmPassword } = getValues();

    changePasswordUserMutation({
      variables: {
        changePasswordUserInput: {
          oldPassword,
          password,
          confirmPassword,
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
              {...register("oldPassword", {
                minLength: 8,
                maxLength: 15,
                required: "Old Password is required",
                validate: (value) => value !== "",
                pattern: {
                  value: passwordRegex,
                  message:
                    "Must contain at least one lowercase, uppercase or numeric character",
                },
              })}
              type="password"
              placeholder="Old Password"
              className="input"
            />
            {errors["oldPassword"]?.message && (
              <FormError errorMessage={errors.oldPassword?.message} />
            )}
            <input
              {...register("password", {
                minLength: 8,
                maxLength: 15,
                required: "New Password is required",
                validate: (value) => value !== "",
                pattern: {
                  value: passwordRegex,
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
            {changePasswordResult?.changePasswordUser.ok === false &&
              changePasswordResult?.changePasswordUser.message && (
                <FormError
                  errorMessage={
                    changePasswordResult?.changePasswordUser.message
                  }
                />
              )}
          </div>
        </form>
        <div className="mt-2 text-gray-700">
          <span className="text-sm font-semibold">Password requirements:</span>

          <li className="text-sm font-semibold">
            Minimum 8 characters long - the more, the better
          </li>
          <li className="text-sm font-semibold">
            At least one lowercase character
          </li>
          <li className="text-sm font-semibold">
            At least one number, symbol, or whitespace character
          </li>
        </div>
      </div>
    </div>
  );
};
