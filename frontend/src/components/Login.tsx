import { Button } from "./ui/button";
import Link from "next/link";

const Login = () => {
  return (
    <div className="fixed top-5 right-5">
      <Link href="/login">
        <Button>Doctor / Pharmasist</Button>
      </Link>
    </div>
  );
};

export default Login;
