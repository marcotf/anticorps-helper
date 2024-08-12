import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { validateRequest } from "@/lib/auth/validate-request";
import { APP_TITLE } from "@/lib/constants";
import { LoginForm } from "./login-form";

export const metadata = {
  title: "Login",
  description: "Login Page",
};

export default async function LoginPage() {
  // const { user } = await validateRequest();

  // if (user) redirect(Paths.Gateway);

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
