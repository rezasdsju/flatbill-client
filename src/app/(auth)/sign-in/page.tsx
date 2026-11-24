import type { Metadata } from "next";
import AuthForm from "@/app/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Sign In",
  description:
    "Sign in to FlatBill to view your bills, pay service charges online, check building expenses and read notices.",
  alternates: { canonical: "/sign-in" },
  robots: { index: false },
  openGraph: {
    title: "Sign In | FlatBill",
    description:
      "Sign in to manage your apartment building's bills, payments and notices.",
    url: "/sign-in",
    type: "website",
  },
};

const SigninPage = () => {
  return <AuthForm mode="sign-in" />;
};

export default SigninPage;