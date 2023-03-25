import { LoginForm } from "@frontend/components/LoginForm";
import { SignUpForm } from "@frontend/components/SignUpForm";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const Signup: NextPage = () => {
  const router = useRouter();
  const {email} = router.query;
  console.log(router.query.email)
  return <LoginForm/>;
};

export default Signup;