"use client";

import { PasswordInput } from "@/components/password-input";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormState } from "react-dom";
import { loginAction } from "./_actions/login.action";

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
        {/* <Button variant={"link"} size={"sm"} className="p-0" asChild>
          <Link href={Paths.ResetPassword}>Forgot password?</Link>
        </Button> */}
      </div>

      {state.status === "fieldError" && (
        <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
          {Object.values(state.errors).map((err) => (
            <li className="ml-4" key={err}>
              {err}
            </li>
          ))}
        </ul>
      )}

      {state.status === "error" && (
        <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
          {state.message}
        </p>
      )}
      <SubmitButton className="w-full" aria-label="submit-btn">
        Log In
      </SubmitButton>
      {/* <Button variant="outline" className="w-full" asChild>
        <Link href={Paths.Home}>Cancel</Link>
      </Button> */}
    </form>
  );
}
