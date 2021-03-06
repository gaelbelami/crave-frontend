import { gql, useApolloClient, useMutation } from "@apollo/client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { VERIFY_EMAIL_MUTATION } from "../../graphql/query-mutation";
import { useMe } from "../../hooks/useMe";
import {
  verifyEmailUser,
  verifyEmailUserVariables,
} from "../../generated/verifyEmailUser";

export const ConfirmEmail = () => {
  const client = useApolloClient();
  const { data: userData } = useMe();
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
          verified: true,
        },
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
      
        <title>Verify Email | Crave ~ Food</title>
    
      <h2 className="text-lg mb-1 font-medium">Confirming email...</h2>
      <h4 className=" text-gray-700 text-sm">
        Please wait, don't close this page...
      </h4>
    </div>
  );
};
