"use client";

import React, { useEffect } from "react";
import LoginForm, { LoginFormValues } from "./login.form";
import { gql, useMutation } from "@apollo/client";
import jwtStorage from "../../../storage/jwt-storage";
import { useRouter, useSearchParams } from "next/navigation";

// TODO it should be used from the shared lib
const LOGIN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      accessToken
    }
  }
`;

const LoginComponent = () => {
  const [login, { loading, error }] = useMutation(LOGIN);
  const callbackUrl = useSearchParams().get("callbackUrl");
  const router = useRouter();

  useEffect(() => {
    if (jwtStorage.getJwt()) {
      router.push("/");
    }
  }, []);

  const onSubmit = async ({ email, password }: LoginFormValues) => {
    const result = await login({
      variables: {
        signInInput: {
          email,
          password,
        },
      },
    });
    const { accessToken } = result.data.signIn;
    jwtStorage.setJwt(accessToken);
    if (callbackUrl) {
      router.push(callbackUrl);
    } else {
      router.push("/game");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-whit px-4">
      <h1 className="text-4xl font-bold mb-8 mt-12">Login</h1>
      <div className="grid grid-cols-4 gap-4">
        <div className="hidden md:block" />
        <div className="col-span-3 md:col-span-2">
          {error && <div className="mb-4 text-red-500">{error.message}</div>}
          <LoginForm onSubmit={onSubmit} />
          {loading && <div className="mt-4 text-blue-500">Loading...</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
