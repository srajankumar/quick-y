import { Button } from "./ui/button";
import Link from "next/link";

const Login = () => {
  return (
    <div className="fixed flex top-5 right-5">
      <div className="flex gap-5 min-w-4xl">
        <Link href="/register">
          <Button variant={"ghost"}>Sign Up</Button>
        </Link>
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
