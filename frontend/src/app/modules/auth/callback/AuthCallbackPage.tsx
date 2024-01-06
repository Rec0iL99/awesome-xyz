"use client";

import { useAuthQuery } from "@/generated/graphql";
import { useSearchParams } from "next/navigation";

export const AuthCallbackPage = () => {
  const searchParams = useSearchParams();
  const githubCode = searchParams.get("code");
  const { data, error, loading } = useAuthQuery({
    skip: githubCode === null ? true : false,
    variables: {
      githubCode: githubCode!,
    },
  });

  return <div>{githubCode}</div>;
};
