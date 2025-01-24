"use client";

import React from "react";
import { TextInput } from "@/lib/form/input/text.input";
import { useForm } from "react-hook-form";
import SubmitButton from "@/lib/form/buttons/submit";
import { ErrorBlock } from "@/lib/form/notification/error";

export type LoginFormValues = {
  email: string;
  password: string;
};

const LoginForm = ({
  onSubmit,
}: {
  onSubmit: (data: LoginFormValues) => Promise<void>;
}) => {
  const { register, handleSubmit, formState } = useForm<LoginFormValues>();

  const disabled = formState.isSubmitting || formState.isSubmitSuccessful;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-12">
      <div className="flex flex-col mb-8 md:grid-cols-2">
        <div className="mb-5 bg-gray-800 p-6 rounded-lg shadow-md">
          <TextInput<LoginFormValues>
            {...{
              register,
              name: "email",
              type: "email",
              label: "Account Email",
              required: true,
              placeholder: "example@mail.com",
              disabled,
            }}
          />
          <ErrorBlock error={formState.errors.password} />

          <TextInput<LoginFormValues>
            {...{
              register,
              name: "password",
              type: "password",
              label: "Password",
              required: true,
              placeholder: "Your secure password",
              disabled,
            }}
          />
          <ErrorBlock error={formState.errors.password} />
        </div>
        <SubmitButton {...{ disabled, text: "Login" }} />
      </div>
    </form>
  );
};

export default LoginForm;
