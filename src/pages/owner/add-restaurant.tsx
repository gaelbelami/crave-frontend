import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonForm } from "../../components/form-button";
import { FormError } from "../../components/form-error";
import { MY_RESTAURANTS_QUERY } from "../../graphql/query-mutation";
import { IAddRestaurantFormProps } from "../../interfaces/add-restaurant.interface";
import { nameRegex } from "../../utils/regex";
import { allCategoriesQuery } from "../../generated/allCategoriesQuery";
import {
  createRestaurantMutation,
  createRestaurantMutationVariables,
} from "../../generated/createRestaurantMutation";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurantMutation(
    $createRestaurantInput: CreateRestaurantInput!
  ) {
    createRestaurant(createRestaurantInput: $createRestaurantInput) {
      restaurantId
      message
      ok
    }
  }
`;

const CATEGORIES_QUERY = gql`
  query allCategoriesQuery {
    allCategories {
      ok
      message
      categories {
        id
        name
        coverImage
        slug
        restaurantCount
      }
    }
  }
`;

export const Addrestaurant = () => {
  const history = useNavigate();
  const [uploading, setUploading] = useState(false);

  const { data: allCategories } =
    useQuery<allCategoriesQuery>(CATEGORIES_QUERY);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { isValid },
  } = useForm<IAddRestaurantFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: createRestaurantMutation) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      setUploading(false);
      history("/");
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurantMutation,
    createRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: MY_RESTAURANTS_QUERY,
      },
    ],
  });

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const request = await (
        await fetch("https://crave-eat-backend.herokuapp.com/upload", {
          method: "POST",
          body: formBody,
        })
      ).json();
      const coverImage = request.secure_url;

      createRestaurantMutation({
        variables: {
          createRestaurantInput: {
            name,
            categoryName,
            address,
            coverImage,
          },
        },
      });
    } catch (error) {}
  };
  return (
    <div className=" min-h-screen">
      <title>Create Restaurant | Crave ~ Food</title>

      <div className="mt-10 flex flex-col justify-center items-center border border-gray-400 pt-8 pb-5 rounded-lg">
        <h2 className="text-xl font-bold text-slate-700 md:text-2xl mb-2">
          Add Restaurant
        </h2>
        <form
          className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5 px-3"
          onSubmit={handleSubmit(onSubmit)}
        >
          <input
            {...register("name", {
              required: "Restaurant name is required",
              pattern: {
                value: nameRegex,
                message: "Numbers and Special characters are not allowed",
              },
              minLength: 3,
              maxLength: 30,
              validate: (value) => value !== "",
            })}
            name="name"
            type="text"
            placeholder="Restaurant Name"
            className="input"
            required
          />
          <input
            {...register("address")}
            name="address"
            type="text"
            placeholder="Address"
            className="input"
          />
          <select
            {...register("categoryName", {
              required: "Category name is required",
            })}
            placeholder="Category name"
            className="input appearance-none"
            name="categoryName"
          >
            {allCategories?.allCategories.categories?.map((category) => (
              <option key={category.id}>{category.name}</option>
            ))}
          </select>
          <div>
            <input
              className=" text-gray-500 file:bg-gradient-to-b file:from-teal-400 file:to-teal-500 file:px-6 file:py-3 file:border-none file:rounded-lg  file:cursor-pointer file:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-200 to-gray-300 file:mr-5 rounded-lg cursor-pointer"
              type="file"
              accept="image/*"
              {...register("file", { required: true })}
            />
          </div>
          <ButtonForm
            loading={uploading}
            canClick={isValid}
            actionText="Create Restaurant"
          />
          {data?.createRestaurant.message && (
            <FormError errorMessage={data.createRestaurant.message} />
          )}
        </form>
      </div>
    </div>
  );
};
