import type { Metadata } from "next";
import AuthForm from "@/app/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Account",
  description:
    "Create your FlatBill account to manage monthly service charges, pay bills online, track building expenses and read notices.",
  alternates: { canonical: "/register" },
  openGraph: {
    title: "Create Account | FlatBill",
    description:
      "Join FlatBill to manage your apartment building's bills, payments and notices in one place.",
    url: "/register",
    type: "website",
  },
};

const SignUpPage = () => {
  return <AuthForm mode="register" />;
};

export default SignUpPage;