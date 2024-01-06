import { Button as RadixButton } from "@radix-ui/themes";

export const Button: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <RadixButton>{children}</RadixButton>;
};
