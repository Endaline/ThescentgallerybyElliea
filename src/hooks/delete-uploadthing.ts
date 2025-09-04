"use server";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function deleteFile(key: string) {
  const success = (await utapi.deleteFiles(key)).success;

  return {
    success,
  };
}
