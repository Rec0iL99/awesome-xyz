"use client";

import { useSearchParams } from "next/navigation";

export const AuthCallbackPage = () => {
  const searchParams = useSearchParams();
  const githubCode = searchParams.get("code");

  return <div>{githubCode}</div>;
};
