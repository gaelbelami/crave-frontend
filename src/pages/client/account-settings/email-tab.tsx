import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TiWarning } from "react-icons/ti";
import { ButtonForm } from "../../../components/form-button";
import { ModalConfirm } from "../../../components/modal-confirm";
import ToastAutoClose from "../../../components/toast";
import { EDIT_PROFILE_MUTATION } from "../../../graphql/query-mutation";
import { ME_QUERY, useMe } from "../../../hooks/useMe";
import { IEditProfileForm } from "../../../interfaces/user.interface";
import {
  editProfileMutation,
  editProfileMutationVariables,
} from "../../../generated/editProfileMutation";
import "react-toastify/dist/ReactToastify.css";
import { FormError } from "../../../components/form-error";
import { hideEmail } from "../../../utils/utils";
import { emailRegex } from "../../../utils/regex";

export const Emailtab = () => {
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
      const {
        me: { id, email: previousEmail },
      } = userData;

      try {
        const { email: newEmail } = getValues();

        if (previousEmail !== newEmail) {
          client.writeFragment({
            id: `User:${id}`,

            fragment: gql`
              fragment EditedUser on User {
                email
                verified
              }
            `,
            data: {
              email: newEmail,
              verified: false,
            },
          });
        }
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
  });

  const onSubmit = async () => {
    try {
      const { email } = getValues();

      if (userData?.me.verified === true) {
        editProfileMutation({
          variables: {
            editUserProfileInput: {
              email,
            },
          },
        });
      }
    } catch (error) {}
  };

  const slicedEmail = hideEmail(userData?.me.email!);

  let [isOpen, setIsOpen] = useState(false);

  const onClick = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="border-b border-gray-300">
        <h2 className=" font-extrabold text-lg mb-5 text-gray-700">
          Change Email Address
        </h2>
      </div>

      <div className=" font-semibold text-sm flex items-center mt-1 bg-amber-200 rounded-lg p-1 opacity-75">
        <TiWarning className="mr-2" />
        This action is irreversible. Please be certain before continuing.
      </div>

      <form onSubmit={handleSubmit(onClick)}>
        <div className="grid gap-3 pt-3">
          <input
            {...register("email", {
              required: "New Password is required",
              validate: (value) => value !== "",
              pattern: {
                value: emailRegex,
                message: "Please input a valid email!",
              },
            })}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
          />
          {errors["email"] && errors["email"]?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
        </div>
        <div className=" space-x-2">
          <ButtonForm
            loading={loading}
            canClick={isValid}
            actionText="Save changes"
          />
        </div>

        {!userData?.me.verified && (
          <div className="mt-4 p-4 mb-2 text-sm font-semibold text-gray-600 bg-red-100 rounded-lg">
            In order to verify your email {slicedEmail}, please check the link
            sent to your email box. By clicking on the link, you will be
            verified.
          </div>
        )}

        {isOpen && (
          <ModalConfirm
            handleSubmit={() => onSubmit()}
            setIsOpen={setIsOpen}
            isOpen={isOpen}
            title="Change Password"
            body={`Are you sure you want to change your email ${slicedEmail}`}
          />
        )}
      </form>
    </div>
  );
};
