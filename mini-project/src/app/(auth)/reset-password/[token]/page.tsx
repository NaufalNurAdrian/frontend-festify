"use client";

import * as Yup from "yup";
import { Field, Form, Formik, FormikProps } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function VerifyPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const ForgotPassSchema = Yup.object().shape({
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  interface FormValues {
    password: string;
  }

  const initialValue: FormValues = {
    password: "",
  };

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      // Kirim permintaan PATCH ke endpoint API dengan token
      await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL_BE}/users/forgot-password`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: params.token,
            newPassword: values.password,
          }),
        }
      );

      // Tampilkan pesan keberhasilan
      toast.success("Password updated successfully!");
      router.push("/login");
    } catch (error) {
      console.log(error);
      // Tangani error dan tampilkan pesan kepada user
      const message = "Failed to update password!";
      toast.error(message);
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
                Reset Password
              </h1>
              <Formik
                initialValues={initialValue}
                validationSchema={ForgotPassSchema}
                onSubmit={(values) => handleSubmit(values)}
              >
                {(props: FormikProps<FormValues>) => (
                  <Form className="w-full max-w-md flex flex-col gap-4">
                    <Field
                      formik={props}
                      name="password"
                      label="New Password:"
                      type="password"
                      placeholder="Enter your new password"
                    />
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="text-white disabled:bg-teal-300 disabled:cursor-wait bg-red hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    >
                      {isLoading ? "Loading ..." : "Reset Password"}
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
