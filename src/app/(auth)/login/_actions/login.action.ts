"use server";

// import { lucia } from "@/lib/auth";
import { Paths } from "@/lib/constants";
import { handleFieldError } from "@/lib/utils";
import { redirect } from "next/navigation";
import { z } from "zod";

type DefaultState = {
  status: "default";
};

type FieldErrorState = {
  status: "fieldError";
  errors: {
    email?: string | null;
    password?: string | null;
  };
};

type ErrorState = {
  status: "error";
  message: string;
};

type SuccessState = {
  status: "success";
};

type LoginActionState = (
  | DefaultState
  | FieldErrorState
  | ErrorState
  | SuccessState
) & {
  form: LoginInput;
};

const loginSchema = z.object({
  email: z.string().email("Veuillez entrer un e-mail valide."),
  password: z
    .string()
    .min(8, "Mot de passe trop court. Minimum 8 caractères.")
    .max(255),
});
type LoginInput = z.infer<typeof loginSchema>;

export async function loginAction(
  state: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const obj = Object.fromEntries(formData.entries());

  const parsed = loginSchema.safeParse(obj);
  if (!parsed.success) {
    return {
      ...state,
      status: "fieldError",
      errors: handleFieldError(parsed.error),
    };
  }

  let redirectPath = Paths.Gateway; // Constant value
  try {
    // const { user, session } = await api.auth.login.mutate(parsed.data); // Call the API
    // // Handle frontend session logic
    // const sessionCookie = lucia.createSessionCookie(session.id);
    // cookies().set(
    //   sessionCookie.name,
    //   sessionCookie.value,
    //   sessionCookie.attributes,
    // );
    // // Change redirect path if needed
    // if (!user.emailVerified) redirectPath = Paths.VerifyEmail;
  } catch (error) {
    return { ...state, status: "error", message: (error as Error).message };
  }

  return redirect(redirectPath);
}
