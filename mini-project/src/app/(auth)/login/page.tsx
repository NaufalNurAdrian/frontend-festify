"use client";

import * as Yup from "yup";
import { Formik, Form, FormikProps } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/context/useSession";
import { Input } from "@/components/form/input";
import Image from "next/image";
import Link from "next/link";

const LoginSchema = Yup.object().shape({
  data: Yup.string().required("Username or Email is required!"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

interface FormValues {
  data: string;
  password: string;
}

export default function Login() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { setIsAuth, setUser } = useSession();

  const initialValue: FormValues = {
    data: "",
    password: "",
  };

  const handleLogin = async (user: FormValues) => {
    try {
      console.log(user);
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) throw result;
      localStorage.setItem("token", result.token);
      localStorage.setItem("role", "CUSTOMER");
      setIsAuth(true);
      setUser(result.user);
      router.push("/");
      toast.success(result.message);
    } catch (err) {
      console.log(err);
      toast.error("Cannot Login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col h-screen">
      <div className="text-center text-3xl font-extrabold text-red pt-10">
        Festify.
      </div>
      <div className="flex flex-row h-full">
        {/* Left Section */}
        <div className="md:flex-1  flex-col items-center justify-center hidden lg:flex">
          <div>
            <Image src="/auth.png" alt="login image" width={500} height={500} />
          </div>
          <div>
            <h1 className="text-2xl font-bold mt-4">Welcome</h1>
          </div>
        </div>
        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="container mx-auto p-5 w-[500px]">
            <div className="flex flex-col items-center justify-center border shadow-lg p-8 rounded-lg bg-white">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign In</h1>
              <Formik
                initialValues={initialValue}
                validationSchema={LoginSchema}
                onSubmit={(values, actions) => {
                  handleLogin(values);
                  actions.resetForm();
                }}
              >
                {(props: FormikProps<FormValues>) => {
                  return (
                    <Form className="w-full max-w-md flex flex-col gap-4">
                      <Input
                        formik={props}
                        name="data"
                        label="Username Or Email :"
                        placeholder="username or email"
                      />
                      <Input
                        formik={props}
                        name="password"
                        label="Password :"
                        type="password"
                      />
                      <Link href="/forgotpass">
                        <div className="text-black text-sm">
                          Forgot Password
                        </div>
                      </Link>
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="text-white disabled:bg-teal-300 disabled:cursor-wait bg-red hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                      >
                        {isLoading ? "Loading ..." : "Login"}
                      </button>
                    </Form>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
