import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { validateRequest } from "@/lib/auth/validate-request";
import { APP_TITLE, Paths } from "@/lib/constants";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Login",
  description: "Login Page",
};

export default async function LoginPage() {
  const { user } = await validateRequest();

  if (user) redirect(Paths.Home);

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>{APP_TITLE} Log In</CardTitle>
        <CardDescription>
          Log in to your account to access your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
