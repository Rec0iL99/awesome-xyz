import { Button } from "@/components/Button";
// import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export const GitHubAuthButtonController: React.FC = () => {
  return (
    <Link href="https://github.com/login/oauth/authorize?client_id=14eeade489907b3fa661">
      <Button>
        {/* <GitHubLogoIcon /> */}
        Register / Login with GitHub
      </Button>
    </Link>
  );
};
