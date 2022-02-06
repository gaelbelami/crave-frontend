import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { ButtonForm } from "../components/form-button";
import { FormError } from "../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../constants/constants";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
// import logo from "../images/logo.svg";
const LOGIN_MUTATION = gql`
  mutation loginMutation($loginUserInput: LoginUserInput!) {
    loginUser(loginUserInput: $loginUserInput) {
      ok
      message
      token
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid},
  } = useForm<ILoginForm>({
    mode: "onChange"
  });

  const onCompleted = (data: loginMutation) => {
    const {
      loginUser: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token)
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };
  //   const onError = (error: ApolloError) => {}
  const [loginMutation, { data: loginMutationResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
    //   onError, 
  });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginUserInput: {
            email,
            password,
          },
        },
      });
    }
  };

  return (
    <div className=" h-screen flex items-center text-orange-500 flex-col mt-10 lg:mt-32">
      <Helmet>
        <title>
          Login | Crave ~ Food
        </title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex px-5 flex-col items-center">
     {/* <img src={logo} alt="" className=" w-52 mb-10"/> */}
     <h2 className="  font-extrabold mb-10 text-7xl text-purple-500 font-sans">crave</h2>
     <h4 className="w-full text-left text-3xl mb-5 font-semibold text-black">Welcome Back</h4>
     <div className="w-full text-left text-black">Sign in with your email address and password</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
          <input
            {...register("email", { required: "Email is required", pattern: emailRegex})}
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            required
            />
          {errors.email?.message && (
            <FormError errorMessage={errors.email?.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage="Please enter a valid email" />
          )}
          <input
            {...register("password", {
              required: "Password is required",
              minLength: 8,
            })}
            name="password"
            type="password"
            placeholder="Password"
            className="input"
            required
            />

          {errors.password?.message && (
            <FormError errorMessage={errors.password?.message} />
            )}
          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must  be more than 10 chars." />
            )}
          <ButtonForm canClick={isValid} loading={loading} actionText={"Login"} />
          {loginMutationResult?.loginUser.message && (
            <FormError errorMessage={loginMutationResult?.loginUser.message} />
            )}
        </form>
        <div className="text-black">New to Crave? <Link to="/signup" className="link">Create account</Link></div>
      </div>
            </div>
  );
}
