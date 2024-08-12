"use client";

import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Paths } from "@/lib/constants";
import Link from "next/link";
import { useFormState } from "react-dom";
import { loginAction } from "./_actions/login.action";

/**
 * This is an example of a form component.
 * By using the useFormState hook, you can easily create a form that handles form submissions, validation errors and api errors.
 *
 * The action function is an async function that receives the current state and the form data.
 * It returns a promise of the ActionState that can be used to check the current state of the action.
 *
 * Form components should be named as what its does and end with Form.
 * ex:
 * - login-form.tsx -> LoginForm
 * - reset-password-form.tsx -> ResetPasswordForm
 */

export function LoginForm() {
  const [state, formAction] = useFormState(loginAction, {
    status: "default",
    form: {
      email: "",
      password: "",
    },
  });

  return (
    <form action={formAction} className="grid gap-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          required
          id="email"
          placeholder="email@example.com"
          autoComplete="email"
          name="email"
          type="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <PasswordInput
          id="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="********"
        />
      </div>

      <div className="flex flex-wrap justify-between">
        <Button variant={"link"} size={"sm"} className="p-0" asChild>
          <Link href={Paths.Signup}>Not signed up? Sign up now.</Link>
        </Button>
        <Button variant={"link"} size={"sm"} className="p-0" asChild>
          <Link href={Paths.ResetPassword}>Forgot password?</Link>
        </Button>
      </div>

      {state.status === "fieldError" && (
        <ul className="bg-destructive/10 text-destructive list-disc space-y-1 rounded-lg border p-2 text-[0.8rem] font-medium">
          {Object.values(state.errors).map((err) => (
            <li className="ml-4" key={err}>
              {err}
            </li>
          ))}
        </ul>
      )}

      {state.status === "error" && (
        <p className="bg-destructive/10 text-destructive rounded-lg border p-2 text-[0.8rem] font-medium">
          {state.message}
        </p>
      )}
      <SubmitButton className="w-full" aria-label="submit-btn">
        Log In
      </SubmitButton>
      <Button variant="outline" className="w-full" asChild>
        <Link href={Paths.Homepage}>Cancel</Link>
      </Button>
    </form>
  );
}
