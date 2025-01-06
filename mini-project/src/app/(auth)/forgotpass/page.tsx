"use client";

import * as Yup from "yup";
import { Formik, Form, FormikProps } from "formik";
import { toast } from "react-toastify";
import { useState } from "react";
import { Input } from "@/components/form/input";
import Image from "next/image";
import axios from "axios";

const ForgotPassSchema = Yup.object().shape({
  data: Yup.string().required("Username or Email is required!"),
});

interface FormValues {
  data: string;
}

export default function ForgotPass() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const initialValue: FormValues = {
    data: "",
  };

  return (
    <div className="container mx-auto flex flex-col h-screen">
      <div className="text-center text-3xl font-extrabold text-red pt-10">
        Festify.
      </div>
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
        {/* Right Section */}
        <div className="flex-1 flex items-center justify-center">
          <div className="container mx-auto p-5 w-[500px]">
            <div className="flex flex-col items-center justify-center border shadow-lg p-8 rounded-lg bg-white">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Forgot Password
              </h1>
              <Formik
                initialValues={initialValue}
                validationSchema={ForgotPassSchema}
                onSubmit={async (values, actions) => {
                  setIsLoading(true);
                  try {
                    await axios.post(
                      "http://localhost:8000/api/users/verify-forgot",
                      values
                    );
                    // Tampilkan notifikasi keberhasilan
                    toast.success("Email sent successfully!");

                    // Reset form setelah berhasil
                    actions.resetForm();
                  } catch (error) {
                    console.log(error);
                    // Tangani error

                    toast.error("error");
                  } finally {
                    setIsLoading(false);
                  }
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
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="text-white disabled:bg-teal-300 disabled:cursor-wait bg-red hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                      >
                        {isLoading ? "Loading ..." : "Submit"}
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
