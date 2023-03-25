import { EmailForm } from "@frontend/components/EmailForm";
import { SignUpForm } from "@frontend/components/SignUpForm";
import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const Signup: NextPage = () => {
  return <SignUpForm/>;
};

export default Signup;