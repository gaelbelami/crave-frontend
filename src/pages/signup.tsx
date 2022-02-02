import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ButtonForm } from "../components/form-button";
import { FormError } from "../components/form-error";
import { createAccountMutation, createAccountMutationVariables } from "../__generated__/createAccountMutation";
import { UserRole } from "../__generated__/globalTypes";
// import logo from "../images/logo.svg";
const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccountMutation($createUserAccountInput: CreateUserAccountInput!) {
    createUserAccount(createUserAccountInput: $createUserAccountInput) {
      ok
      message
    }
  }
`;

interface ICreateAccountForm {
    firstName: string;
    lastName: string;    
    email: string;
    password: string;
    role: UserRole;
}

export default function Signup() {

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const nameRegex = /^([^0-9]*)$/;

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid},
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
        role: UserRole.client
    }
  });
  const history = useNavigate()
  const onCompleted = (data: createAccountMutation) => {
    const {createUserAccount: {ok}} = data;
    if(ok){
        alert("Account Created! Log in now");
        history("/")
    }
  }

 
  //   const onError = (error: ApolloError) => {}
  const [createAccountMutation, { loading, data: createAccountMutationResult}] = useMutation<createAccountMutation, createAccountMutationVariables>(CREATE_ACCOUNT_MUTATION, {
    onCompleted
    //   onError,
  });

  const onSubmit = () => {
      const {firstName, lastName, email, password, role } = getValues();
    if(!loading){
        createAccountMutation({
            variables: {
                createUserAccountInput: {firstName, lastName, email, password, role}
            }
        })
    }
  };

  return (
    <div className=" h-screen flex items-center text-orange-500 flex-col mt-10 lg:mt-32">
        <Helmet>
        <title>
          Signup | Crave ~ Food
        </title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex px-5 flex-col items-center">
     {/* <img src={logo} alt="" className=" w-52 mb-10"/> */}
     <h2 className="  font-extrabold mb-10 text-7xl text-purple-500 font-sans">crave</h2>
     <h4 className="w-full text-left text-3xl mb-5 font-semibold text-black">Let's get started</h4>
     <div className="w-full text-left text-black">Sign in with your email address and password</div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mt-5 w-full mb-3"
        >
            <input
            {...register("firstName", { required: "First name is required", pattern: {
                value: nameRegex,
                message: "Numbers and Special characters are not allowed",
                
            },
            minLength: 3,
            maxLength: 30,
            validate: (value) => value !== "",
         })}
            name="firstName"
            type="text"
            placeholder="Last Name"
            className="input"
            required
            />
          
            {errors['firstName'] && errors['firstName']?.message && (<FormError errorMessage={errors.firstName?.message} />)}
            {errors['firstName'] && errors['firstName']?.type ===  'minLength' && (<FormError errorMessage='Min length 3' />)}
            {errors['firstName'] && errors['firstName']?.type ===  'maxLength' && (<FormError errorMessage='Max length exceeded' />)}
          <input
            {...register("lastName", { required: "Last name is required", pattern: {
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
            required
            />
          {errors['lastName'] && errors['lastName']?.message && (<FormError errorMessage={errors.lastName?.message} />)}
            {errors['lastName'] && errors['lastName']?.type ===  'minLength' && (<FormError errorMessage='Min length 3' />)}
            {errors['lastName'] && errors['lastName']?.type ===  'maxLength' && (<FormError errorMessage='Max length exceeded' />)}
          <input
            {...register("email", { required: "Email is required", pattern: emailRegex })}
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

            {/* <select  {...register("role", {required: true})} className="input ">
                {Object.keys(UserRole).map((role, index) => (
                    <option key={index}>{role}</option>
                ))}
            </select> */}
          <ButtonForm canClick={isValid} loading={loading} actionText={"Create account"} />
          {createAccountMutationResult?.createUserAccount.message && (
            <FormError errorMessage={createAccountMutationResult?.createUserAccount.message} />
            )}
        </form>
        <div className="text-black">Already have an account? <Link to="/" className="link">Login</Link></div>
      </div>
            </div>
  );
}
