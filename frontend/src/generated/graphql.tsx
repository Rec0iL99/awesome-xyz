import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  githubUser?: Maybe<GitHubUserResponse>;
  isRegistered: Scalars["Boolean"]["output"];
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

export type GitHubUserResponse = {
  __typename?: "GitHubUserResponse";
  avatarUrl: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  githubProfile: Scalars["String"]["output"];
  name: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  logout: Scalars["Boolean"]["output"];
  register: UserResponse;
};

export type MutationRegisterArgs = {
  options: RegisterUserInput;
};

export type Query = {
  __typename?: "Query";
  auth: AuthResponse;
  hello: Scalars["String"]["output"];
};

export type QueryAuthArgs = {
  githubCode: Scalars["String"]["input"];
};

export type RegisterUserInput = {
  avatarUrl: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  githubProfile: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type User = {
  __typename?: "User";
  avatarUrl: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  email: Scalars["String"]["output"];
  githubProfile: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  name: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  username: Scalars["String"]["output"];
};

export type UserResponse = {
  __typename?: "UserResponse";
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type AuthQueryVariables = Exact<{
  githubCode: Scalars["String"]["input"];
}>;

export type AuthQuery = {
  __typename?: "Query";
  auth: {
    __typename?: "AuthResponse";
    isRegistered: boolean;
    githubUser?: {
      __typename?: "GitHubUserResponse";
      username: string;
      name: string;
      githubProfile: string;
      avatarUrl: string;
    } | null;
    user?: { __typename?: "User"; id: number; username: string } | null;
  };
};

export const AuthDocument = gql`
  query Auth($githubCode: String!) {
    auth(githubCode: $githubCode) {
      isRegistered
      githubUser {
        username
        name
        githubProfile
        avatarUrl
      }
      user {
        id
        username
      }
    }
  }
`;

/**
 * __useAuthQuery__
 *
 * To run a query within a React component, call `useAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthQuery({
 *   variables: {
 *      githubCode: // value for 'githubCode'
 *   },
 * });
 */
export function useAuthQuery(
  baseOptions: Apollo.QueryHookOptions<AuthQuery, AuthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AuthQuery, AuthQueryVariables>(AuthDocument, options);
}
export function useAuthLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AuthQuery, AuthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AuthQuery, AuthQueryVariables>(
    AuthDocument,
    options
  );
}
export function useAuthSuspenseQuery(
  baseOptions?: Apollo.SuspenseQueryHookOptions<AuthQuery, AuthQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSuspenseQuery<AuthQuery, AuthQueryVariables>(
    AuthDocument,
    options
  );
}
export type AuthQueryHookResult = ReturnType<typeof useAuthQuery>;
export type AuthLazyQueryHookResult = ReturnType<typeof useAuthLazyQuery>;
export type AuthSuspenseQueryHookResult = ReturnType<
  typeof useAuthSuspenseQuery
>;
export type AuthQueryResult = Apollo.QueryResult<AuthQuery, AuthQueryVariables>;
