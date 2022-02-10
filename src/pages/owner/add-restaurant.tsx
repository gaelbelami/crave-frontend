import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ButtonForm } from "../../components/form-button";
import { FormError } from "../../components/form-error";
import { allCategoriesQuery } from "../../__generated__/allCategoriesQuery";
import {
  createRestaurantMutation,
  createRestaurantMutationVariables,
} from "../../__generated__/createRestaurantMutation";
import { MY_RESTAURANTS_QUERY } from "./home-owner";

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

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

const nameRegex = /^([^0-9]*)$/;

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
  } = useForm<IFormProps>({
    mode: "onChange",
  });

  const onCompleted = (data: createRestaurantMutation) => {
    const {
      createRestaurant: { ok, restaurantId },
    } = data;
    if (ok) {
      setUploading(false);
      history("/")
    }
  };
  const [createRestaurantMutation, { data }] = useMutation<
    createRestaurantMutation,
    createRestaurantMutationVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
    refetchQueries: [{
      query: MY_RESTAURANTS_QUERY
    }]
  });

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { file, name, categoryName, address } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const request = await (
        await fetch("http://localhost:4000/uploads/", {
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
    <div className="mt-20 flex flex-col justify-center items-center">
      <Helmet>
        <title>Create Restaurant | Crave ~ Food</title>
      </Helmet>
      <h2 className="font-semibold text-2xl mb-2">Add Restaurant</h2>
      <form
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
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
          className=" file:bg-gradient-to-b file:from-orange-400 file:to-orange-500 file:px-6 file:py-3 file:border-none file:rounded-lg  file:cursor-pointer file:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-200 to-gray-300 file:mr-5 rounded-lg cursor-pointer"
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
        {data?.createRestaurant.message && <FormError errorMessage={data.createRestaurant.message} /> }
      </form>
    </div>
  );
};
