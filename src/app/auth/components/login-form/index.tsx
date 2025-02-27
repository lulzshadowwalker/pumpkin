"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
  return (
    <section className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Get back into your account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Continue with your preferred oauth provider
        </p>
      </div>
      <div className="grid gap-6">
        <Button type="submit" className="w-full" onClick={async () => signIn("discord", { redirectTo: "/" })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" fill="none" viewBox="0 0 24 24" > <path fill="#FFF" d="M18.59 5.89c-1.23-.57-2.54-.99-3.92-1.23-.17.3-.37.71-.5 1.04-1.46-.22-2.91-.22-4.34 0-.14-.33-.34-.74-.51-1.04-1.38.24-2.69.66-3.92 1.23-2.48 3.74-3.15 7.39-2.82 10.98 1.65 1.23 3.24 1.97 4.81 2.46.39-.53.73-1.1 1.03-1.69-.57-.21-1.11-.48-1.62-.79.14-.1.27-.21.4-.31 3.13 1.46 6.52 1.46 9.61 0 .13.11.26.21.4.31-.51.31-1.06.57-1.62.79.3.59.64 1.16 1.03 1.69 1.57-.49 3.17-1.23 4.81-2.46.39-4.17-.67-7.78-2.82-10.98zm-9.75 8.78c-.94 0-1.71-.87-1.71-1.94s.75-1.94 1.71-1.94 1.72.87 1.71 1.94c0 1.06-.75 1.94-1.71 1.94m6.31 0c-.94 0-1.71-.87-1.71-1.94s.75-1.94 1.71-1.94 1.72.87 1.71 1.94c0 1.06-.75 1.94-1.71 1.94" ></path> </svg>
          Discord
        </Button>

        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button variant="outline" className="w-full" onClick={async () => signIn("google", { redirectTo: "/" })}>
          <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 20 20" > <g id="Page-1" fill="none" fillRule="evenodd" stroke="none" strokeWidth="1"> <g id="Dribbble-Light-Preview" fill="#000" transform="translate(-300 -7399)" > <g id="icons" transform="translate(56 160)"> <path id="google-[#178]" d="M263.822 7247.004h-9.61c0 1 0 2.998-.007 3.998h5.569c-.213.999-.97 2.398-2.039 3.103-.001-.001-.002.006-.004.005-1.421.938-3.297 1.151-4.69.871-2.183-.433-3.91-2.016-4.612-4.027.004-.003.007-.031.01-.033-.439-1.248-.439-2.918 0-3.917.565-1.837 2.345-3.513 4.53-3.972 1.759-.373 3.743.031 5.202 1.396.194-.19 2.685-2.622 2.872-2.82-4.985-4.515-12.966-2.926-15.953 2.903l-.006.011a9.77 9.77 0 0 0 .01 8.964l-.01.008a10.18 10.18 0 0 0 6.48 5.165c3.01.79 6.843.25 9.41-2.072l.003.003c2.175-1.958 3.529-5.296 2.845-9.586" ></path> </g> </g> </g> </svg>
          Google
        </Button>
      </div>
      <p className="text-center text-sm text-muted-foreground">
        © 2025 Pumpkin. All rights reserved.
      </p>
    </section>
  )
}
