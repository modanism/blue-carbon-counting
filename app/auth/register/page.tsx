"use client";

import { auth } from "@/lib/firebase/config";
import { useToast } from "@chakra-ui/react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";

const Register = () => {
  const router = useRouter();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e: React.SyntheticEvent) {
    setIsLoading(true);
    e.preventDefault();
    const target = e.target as typeof e.target & {
      username: { value: string };
      email: { value: string };
      password: { value: string };
    };
    const username = target.username.value;
    const email = target.email.value;
    const password = target.password.value;
    console.log("EMAIL : ", email);
    console.log("PASSWORD : ", password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setIsLoading(false);

        // Signed up
        const user = userCredential.user;
        updateProfile(auth.currentUser!, {
          displayName: username,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            // An error occurred
            // ...
          });
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        router.replace("/auth/login");

        // ...
      })
      .catch((error) => {
        setIsLoading(false);
        const errorCode = error.code;
        const errorMessage = error.message;
        toast({
          title: `Error ${errorCode}`,
          description: errorMessage,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        // ..
      });
  }

  return (
    <main className="flex flex-col items-center px-[112px] bg-[#EFF2F6] py-[200px]">
      <section className="bg-[#FAFAFA] w-[30vw] py-[20px] px-[40px] rounded-[20px]">
        <h1 className="text-neutral-10 text-[30px] font-[700] text-center mb-[50px]">
          Register
        </h1>

        <form
          className="flex flex-col items-start gap-[30px] mb-[10px]"
          onSubmit={handleSubmit}
        >
          <div className="w-full flex flex-col gap-[10px]">
            <label className="text-neutral-7 text-[16px] font-[500] text-start w-full">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="w-full rounded-[10px] border-2 border-slate-500 px-[7px] pb-[3px] text-neutral-7 text-[16px]"
            />
          </div>
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
          <div className="w-full flex items-center justify-center min-h-[100px]">
            {isLoading ? (
              <Spinner color="#486284" />
            ) : (
              <button
                className="w-full pt-[8px] pb-[11px] px-[22px] transition bg-neutral-10 rounded-[30px]"
                type="submit"
              >
                <p className="text-[16px] text-[#FAFAFA]">Register</p>
              </button>
            )}
          </div>
        </form>
        <div className="w-full flex flex-wrap items-center justify-center gap-[5px]">
          <p className="text-neutral-7 text-center text-[16px] font-[500]">
            {"Already have an account?"}
          </p>
          <Link
            href="/auth/login"
            className="text-neutral-10 text-center text-[16px] font-[500]"
          >
            Login here
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Register;
