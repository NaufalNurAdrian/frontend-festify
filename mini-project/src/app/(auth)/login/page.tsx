"use client";

import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "@/components/context/useSession";
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
      console.log("Login data:", user); // Debugging
      setIsLoading(true);
      const base_url = process.env.NEXT_PUBLIC_BASE_URL_BE;
      const res = await fetch(`${base_url}/auth/login`, {
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
      console.error("Login error:", err); // Debugging
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
                {({ isSubmitting }) => (
                  <Form className="w-full max-w-md flex flex-col gap-4">
                    {/* Data Field */}
                    <div>
                      <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                        Username or Email
                      </label>
                      <Field
                        id="data"
                        name="data"
                        type="text"
                        placeholder="Enter your username or email"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                      <ErrorMessage name="data" component="div" className="text-red-500 text-sm" />
                    </div>
                    {/* Password Field */}
                    <div>
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                      />
                      <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                    </div>
                    <Link href="/forgotpass">
                      <div className="text-black text-sm">Forgot Password</div>
                    </Link>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="text-white disabled:bg-teal-300 disabled:cursor-wait bg-red hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      {isLoading ? "Loading ..." : "Login"}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
