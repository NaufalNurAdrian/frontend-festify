"use client";

import * as Yup from "yup";
import { Formik, Form, Field, FormikProps } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import Image from "next/image";

// Schema validasi menggunakan Yup
const RegisterSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm password is required"),
  referralCode: Yup.string().optional(), // Optional field
});

// Tipe untuk Form Values
interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  referralCode?: string; // Optional
}

export default function Register() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValue: FormValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  };

  const handleAdd = async (user: FormValues) => {
    try {
      setIsLoading(true);
      const res = await fetch("http://localhost:8000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Failed to register.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto flex flex-col h-screen">
      <div className="text-center text-3xl font-extrabold text-red pt-10">Festify.</div>
      <div className="flex flex-row h-full">
        {/* Left Section */}
        <div className="md:flex-1 flex-col items-center justify-center hidden lg:flex">
          <div>
            <Image src="/auth.png" alt="login image" width={500} height={500} />
          </div>
          <div>
            <h1 className="text-2xl font-bold mt-4">Welcome</h1>
          </div>
        </div>

        {/* Form Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="container mx-auto p-5 w-[500px]">
            <div className="flex flex-col items-center justify-center border shadow-lg p-8 rounded-lg bg-white">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">Sign Up</h1>
              <Formik
                initialValues={initialValue}
                validationSchema={RegisterSchema}
                onSubmit={(values, actions) => {
                  handleAdd(values);
                  actions.resetForm();
                }}
              >
                {(props: FormikProps<FormValues>) => {
                  const { handleChange, values, touched, errors } = props;
                  return (
                    <Form className="w-full max-w-md flex flex-col gap-4">
                      {/* Username Field */}
                      <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                          Username
                        </label>
                        <Field
                          id="username"
                          name="username"
                          type="text"
                          onChange={handleChange}
                          value={values.username}
                          className="block w-full border-gray-300 rounded-lg shadow-lg border my-2 p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your username"
                        />
                        {touched.username && errors.username && (
                          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                        )}
                      </div>

                      {/* Email Field */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <Field
                          id="email"
                          name="email"
                          type="email"
                          onChange={handleChange}
                          value={values.email}
                          className="block w-full border-gray-300 rounded-lg shadow-lg border my-2 p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your email"
                        />
                        {touched.email && errors.email && (
                          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                        )}
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
                          onChange={handleChange}
                          value={values.password}
                          className="block w-full border-gray-300 rounded-lg shadow-lg border my-2 p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter your password"
                        />
                        {touched.password && errors.password && (
                          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <Field
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          onChange={handleChange}
                          value={values.confirmPassword}
                          className="block w-full border-gray-300 rounded-lg shadow-lg border my-2 p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Confirm your password"
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>

                      {/* Referral Code Field */}
                      <div>
                        <label htmlFor="referralCode" className="block text-sm font-medium text-gray-700">
                          Referral Code (Optional)
                        </label>
                        <Field
                          id="referralCode"
                          name="referralCode"
                          type="text"
                          onChange={handleChange}
                          value={values.referralCode}
                          className="block w-full border-gray-300 rounded-lg shadow-lg border my-2 p-2 text-sm focus:ring-teal-500 focus:border-teal-500"
                          placeholder="Enter referral code"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-red text-white py-2 rounded-lg font-medium disabled:bg-teal-400 disabled:cursor-wait hover:bg-teal-700 focus:ring-4 focus:ring-teal-300"
                      >
                        {isLoading ? "Loading ..." : "Register"}
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
