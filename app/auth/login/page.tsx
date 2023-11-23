"use client";

import { auth } from "@/lib/firebase/config";
import { useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

const Login = () => {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.SyntheticEvent) {
    setIsLoading(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value; // typechecks!
    const password = target.password.value; // typechecks!

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        setIsLoading(false);
        const user = userCredential.user;
        toast({
          title: "Sign in successful!",
          description: `Welcome ${user.displayName}`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.replace("/");

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast({
          title: `Error ${errorCode}`,
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        setIsLoading(false);

        // ..
      });
  }

  return (
    <main className="flex min-h-screen flex-col items-center px-[112px] bg-[#EFF2F6] py-[200px]">
      <section className="bg-[#FAFAFA] w-[30vw] py-[20px] px-[40px] rounded-[20px]">
        <h1 className="text-neutral-10 text-[30px] font-[700] text-center mb-[50px]">
          Login
        </h1>

        <form
          className="flex flex-col items-start gap-[30px] mb-[10px]"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col gap-[10px]">
            <label className="text-neutral-7 text-[16px] font-[500] text-start w-full">
              Email
            </label>
            <input
              type="text"
              name="email"
              className="w-full rounded-[10px] border-2 border-slate-500 px-[7px] pb-[3px] text-neutral-7 text-[16px]"
            />
          </div>
          <div className="w-full flex flex-col gap-[10px] mb-[50px]">
            <label className="text-neutral-7 text-[16px] font-[500] text-start w-full ">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full rounded-[10px] border-2 border-slate-500 px-[7px] pb-[3px] text-neutral-7 text-[16px]"
            />
          </div>
          <div className="w-full min-h-[100px] flex items-center justify-center ">
            {isLoading ? (
              <Spinner color="#486284" />
            ) : (
              <button
                className="w-full pt-[8px] pb-[11px] px-[22px] transition bg-neutral-10 rounded-[30px]"
                type="submit"
              >
                <p className="text-[16px] text-[#FAFAFA]">Login</p>
              </button>
            )}
          </div>
        </form>
        <div className="w-full flex flex-wrap items-center justify-center gap-[5px]">
          <p className="text-neutral-7 text-center text-[16px] font-[500]">
            {"Don't have an account?"}
          </p>
          <Link
            href="/auth/register"
            className="text-neutral-10 text-center text-[16px] font-[500]"
          >
            Sign up here
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Login;
