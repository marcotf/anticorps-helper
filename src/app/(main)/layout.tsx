import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

const MainLayout = async ({ children }: { children: ReactNode }) => {
  const { user } = await validateRequest();

  if (!user) {
    redirect(Paths.Login);
  }

  return <main className="container pt-4">{children}</main>;
};

export default MainLayout;
