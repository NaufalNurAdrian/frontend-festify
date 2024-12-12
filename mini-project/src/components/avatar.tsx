"use client";

import { useSession } from "@/components/context/useSession";
import { deleteCookie } from "@/libs/action";
import { useRouter } from "next/navigation";
import AvatarModal from "./avatarModal";

export const Avatar = () => {
  const router = useRouter();
  const { user, isAuth, setIsAuth } = useSession();
  const onLogout = () => {
    deleteCookie("token");
    setIsAuth(false);
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {isAuth ? (
        <AvatarModal user={user} onLogout={onLogout} />
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/register")}
            className="flex rounded-full items-center border px-4 py-1 border-black hover:bg-red hover:text-white hover:border-red whitespace-nowrap"
          >
            Register
          </button>
          <button
            onClick={() => router.push("/login")}
            className=" bg-red text-white px-4 py-1 rounded-full hover:bg-codgray whitespace-nowrap"
          >
            Login
          </button>
        </div>
      )}
    </>
  );
};