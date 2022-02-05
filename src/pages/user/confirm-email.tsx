import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import {
  verifyEmailUser,
  verifyEmailUserVariables,
} from "../../__generated__/verifyEmailUser";

const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmailUser($verifyEmailUserInput: VerifyEmailInput!) {
    verifyEmailUser(verifyEmailUserInput: $verifyEmailUserInput) {
      ok
      message
    }
  }
`;

export const ConfirmEmail = () => {
  const client = useApolloClient();
  const {data: userData} = useMe();
  const history = useNavigate();

  const onCompleted = (data: verifyEmailUser) => {
    const {
      verifyEmailUser: { ok },
    } = data;
    if (ok && userData?.me.id) {
      // writing on the cache directly
        client.writeFragment({
            id: `User:${userData?.me.id}`,
            fragment: gql`
                fragment VerifiedUser on User {
                    verified
                }
            `,
            data: {
                verified: true
            }
        });
        history("/");
    }
  };
  const [verifyEmailUser] = useMutation<
    verifyEmailUser,
    verifyEmailUserVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    const [, code] = window.location.href.split("code=");
    verifyEmailUser({
      variables: {
        verifyEmailUserInput: {
          code,
        },
      },
    });
  });
  return (
    <div className=" mt-52 flex flex-col items-center justify-center">
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className=" text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
