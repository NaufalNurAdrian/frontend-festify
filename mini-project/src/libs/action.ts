"use server"

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export default async function action(tags: string) {
    revalidateTag(tags)
}

export const deleteCookie = (key: string) => {
    cookies().delete(key)
}

export const getToken = () => {
    return cookies().get("token");
  };