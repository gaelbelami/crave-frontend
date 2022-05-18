import { useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { FaHamburger, FaPenSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { ButtonForm } from "../components/form-button";
import { FormError } from "../components/form-error";
import { LOCALSTORAGE_TOKEN } from "../constants/constants";
import { LOGIN_MUTATION } from "../graphql/query-mutation";
import { ILoginForm } from "../interfaces/user.interface";
import { emailRegex } from "../utils/regex";
import { loginMutation, loginMutationVariables } from "../generated/loginMutation";
import { RiLoginBoxFill, RiShoppingCartFill } from "react-icons/ri";
import { GiHotMeal } from "react-icons/gi";
import { MdDeliveryDining } from "react-icons/md";

export default function Login() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<ILoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: loginMutation) => {
    const {
      loginUser: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCALSTORAGE_TOKEN, token);
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
    <div className=" h-screen flex items-center flex-col  justify-center  bg-cyan-50">

        <title>Login | Crave ~ Food</title>


      <div className="w-full  grid grid-cols-2">
        <div className="flex justify-center my-auto pb-80">
          <div className="relative flex flex-col items-center w-full ">
            <div className="relative w-full max-w-lg mt-14">
              <div className=" absolute top-0 -left-4 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur opacity-70 animate-blob "></div>
              <div className=" absolute top-0 -right-4 w-72 h-72 bg-green-300 rounded-full mix-blend-multiply filter blur opacity-70 animate-blob animation-delay-2000"></div>
              <div className=" absolute top-0 bottom-4 left-20 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur opacity-70 animate-blob animation-delay-4000"></div>
            </div>
            <div className="absolute top-0 bg-gray-100  rounded-lg opacity-70 pt-20 pb-16 px-14  max-w-2xl">
              <p className=" font-sans font-semibold text-3xl ">
                It’s all here. All in one place.
              </p>
              <div className=" border-b border-gray-400 my-5"></div>
              <p className="text-xl ">
                Discover local, on-demand delivery or Pickup from restaurants,
                nearby grocery and convenience stores, and more.
              </p>
              <div className="grid grid-cols-3 justify-items-center mt-4">
                <span className=" flex flex-col text-6xl mt-4 text-teal-900  justify-center items-center">
                  <RiShoppingCartFill />
                  <div className="mt-2  text-sm font-semibold font-sans">
                    Customer
                  </div>
                </span>
                <span className="text-7xl text-teal-900 flex flex-col  justify-center items-center">
                  <GiHotMeal />
                  <div className="mt-3  text-sm font-semibold font-sans">
                    Restaurant
                  </div>
                </span>
                <span className="text-7xl mt-2.5 flex flex-col  text-teal-900  justify-center items-center">
                  <MdDeliveryDining />
                  <div className="text-sm font-semibold font-sans">
                    Delivery
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-screen-sm flex px-5 flex-col items-center  justify-center mx-auto">
          <span className="italic font-extrabold text-7xl inline-flex items-center text-teal-600 mb-10">
            cr
            <FaHamburger className="w-11 h-11 mt-5 mx-1" />
            ve
          </span>
          <h4 className="w-full text-left text-3xl mb-5 font-semibold font-sans">
            Welcome Back
          </h4>
          <div className="w-full text-left text-black">
            Sign in with your email address and password
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 mt-5 w-full mb-3"
          >
            <input
              {...register("email", {
                required: "Email is required",
                pattern: emailRegex,
              })}
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
            <ButtonForm
              canClick={isValid}
              loading={loading}
              actionText={"Login"}
            />
            {loginMutationResult?.loginUser.message && (
              <FormError
                errorMessage={loginMutationResult?.loginUser.message}
              />
            )}
          </form>
          <div className="text-black">
            New to Crave?{" "}
            <Link to="/signup" className="link">
              Create account
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-28 items-center flex flex-col">
        <div className="font-sans font-semibold text-gray-500 text-lg">
          Business Partners Authentication
        </div>
        <div className="flex space-x-5 mt-3">
          <div className="cursor-pointer flex py-2 px-4 rounded-lg border font-semibold shadow-md border-teal-600 text-teal-600">
            <RiLoginBoxFill className=" text-2xl mr-2" />
            Login
          </div>
          <div className="cursor-pointer flex py-2 px-4 rounded-lg border font-semibold shadow-md border-teal-600 text-teal-600">
            <FaPenSquare className=" text-2xl mr-2" /> Register
          </div>
        </div>
      </div>
    </div>
  );
}
