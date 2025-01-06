"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function VerifyPage({ params }: { params: { token: string } }) {
  const router = useRouter();
  const onVerify = async () => {
    try {
      const res = await fetch(
        `http://localhost:8000/api/auth/verify/${params.token}`,
        {
          method: "PATCH",
        }
      );
      const result = await res.json();
      if (!res.ok) throw result;
      toast.success(result.message);
      router.push("/login");
    } catch (err) {
      console.log(err);
      toast.error("Cannot Verify User");
      router.push("/");
    }
  };

  useEffect(() => {
    onVerify();
  }, [onVerify]);

  return <div className="flex justify-center min-h-screen items-center"></div>;
}
