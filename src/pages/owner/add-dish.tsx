import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useFieldArray, useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { ButtonForm } from "../../components/form-button";
import {
  createDishMutation,
  createDishMutationVariables,
} from "../../generated/createDishMutation";
import { MdAddCircle } from "react-icons/md";
import { FormError } from "../../components/form-error";
import { IAddDishForm } from "../../interfaces/add-dish.interface";
import {
  CREATE_DISH_MUTATION,
  MY_RESTAURANT_QUERY,
} from "../../graphql/query-mutation";

export const AddDish = () => {
  const { restaurantId } = useParams() as { restaurantId: string };
  const history = useNavigate();
  const [uploading, setUploading] = useState(false);

  const {
    getValues,
    register,
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<IAddDishForm>({
    mode: "onChange",
  });
  const { fields, remove, append } = useFieldArray({
    control,
    name: "options.choices",
  });
  const onCompleted = (data: createDishMutation) => {
    const {
      createDish: { ok },
    } = data;
    if (ok) {
      setUploading(false);
      history(-1);
    }
  };
  const [createDishMutation, { data }] = useMutation<
    createDishMutation,
    createDishMutationVariables
  >(CREATE_DISH_MUTATION, {
    onCompleted,
    refetchQueries: [
      {
        query: MY_RESTAURANT_QUERY,
        variables: {
          myRestaurantInput: {
            id: +restaurantId,
          },
        },
      },
    ],
  });

  const onSubmit = async () => {
    try {
      setUploading(true);
      const { name, price, description, file, ...options } = getValues();
      const actualFile = file[0];
      const formBody = new FormData();
      formBody.append("file", actualFile);
      const request = await (
        await fetch("http://localhost:4000/uploads/", {
          method: "POST",
          body: formBody,
        })
      ).json();
      const photo = request.secure_url;
      console.log(photo);
      const optionsObj = options.options.choices?.map((option) => ({
        name: option.name,
        extra: +option.extra,
      }));
      console.log(optionsObj);
      createDishMutation({
        variables: {
          createDishInput: {
            name,
            price: +price,
            description,
            photo,
            restaurantId: +restaurantId,
            options: optionsObj,
          },
        },
      });
    } catch (error) {}
  };

  const onAddOptionClick = () => {
    append({ name: "", extra: undefined });
  };

  const onDeleteClick = (idToDelete: number) => {
    remove(idToDelete);
  };

  const nameRegex = /^([^0-9]*)$/;
  return (
    <div className=" min-h-screen">
      <title>Create Dish | Crave ~ Food</title>

      <div className="mt-10 flex flex-col justify-center items-center border border-gray-400 rounded-lg shadow-md pt-8 pb-5">
        <h2 className=" text-xl font-extrabold text-slate-700 md:text-2xl mb-2">
          Add Dish
        </h2>
        <h2 className=" justify-start items-start text-left">
          Add a dish to your restaurant
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          action=""
          className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5 px-3"
        >
          <input
            {...register("name", {
              required: "Dish name is required",
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
            placeholder="Dish Name"
            className="input"
            required
          />
          <input
            type="number"
            className="input"
            min={0}
            placeholder="Price Name"
            {...register("price", { required: "Price is required" })}
          />
          <input
            type="text"
            className="input"
            placeholder="Description"
            {...register("description", {
              required: "Description is required",
            })}
          />
          <div>
            <input
              className=" file:bg-gradient-to-b file:from-teal-400 file:to-teal-500 file:px-6 file:py-3 file:border-none file:rounded-lg  file:cursor-pointer file:shadow-lg file:shadow-blue-600/50 bg-gradient-to-br from-gray-200 to-gray-300 file:mr-5 rounded-lg cursor-pointer"
              type="file"
              accept="image/*"
              {...register("file", { required: true })}
            />
          </div>
          <div className=" my-5">
            <div className=" mb-5 inline-flex justify-between w-full">
              <span className=" inline-flex items-center font-medium text-lg">
                Dish Options
              </span>
              <span
                onClick={onAddOptionClick}
                className="inline-flex items-center cursor-pointer text-sm font-semibold text-white bg-teal-600 shadow-md px-3  py-1 rounded-xl"
              >
                <MdAddCircle className="mr-2" />
                Add Dish Option
              </span>
            </div>
            {fields.map((field, index) => (
              <div key={field.id} className=" mt-5  flex flex-wrap">
                <input
                  {...register(`options.choices.${index}.name` as const)}
                  className=" py-1 px-2 md:py-2 md:px-4 text-sm md:text-base focus:border-teal-500 border-2 rounded-lg md:mr-3 focus:outline-none "
                  type="text"
                  placeholder="Option Name"
                />
                <input
                  {...register(`options.choices.${index}.extra` as const)}
                  className=" py-1 px-2 md:py-2 md:px-4 text-sm md:text-base focus:border-teal-500 border-2 rounded-lg focus:outline-none "
                  type="number"
                  min={0}
                  placeholder="Option Extra price"
                />
                <span
                  onClick={() => onDeleteClick(index)}
                  className="cursor-pointer shadow-md items-center inline-flex justify-self-center text-white rounded-xl font-semibold bg-red-500 py-2 px-2 ml-2"
                >
                  <AiFillDelete className="mx-2" />
                </span>
                {/* <span className="py-1 px-2 md:py-2 md:px-4 cursor-pointer shadow-md items-center justify-center inline-flex text-white rounded-xl font-semibold bg-teal-500 ml-2">
                  <MdAddCircle className="mr-2" />
                  Choice
                </span> */}
              </div>
            ))}
          </div>
          <ButtonForm
            canClick={isValid}
            loading={uploading}
            actionText="Create Dish"
          />
          {data?.createDish.message && (
            <FormError errorMessage={data.createDish.message} />
          )}
        </form>
      </div>
    </div>
  );
};
