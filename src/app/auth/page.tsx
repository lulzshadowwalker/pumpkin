import { LoginForm } from "./components/login-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/logo.png";
import sample from "@/assets/sample.png";

export default async function Auth() {
  const session = await auth();
  if (session) redirect("/");

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
              <Image src={logo} alt="Logo" width={36} height={36} />
            Pumpkin
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={sample}
          fill
          alt="f this :D"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
