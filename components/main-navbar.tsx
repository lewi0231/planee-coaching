"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Logo } from "./logo";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

const AuthButton = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <Button onClick={() => signOut()}>Sign Out</Button>
      </>
    );
  }

  return (
    <>
      <Button onClick={() => signIn()}>Sign In</Button>
    </>
  );
};

const MainNavbar = () => {
  return (
    <nav className="h-16 w-[95vw] py-4 flex flex-col justify-center items-between m-auto pl-4">
      <div className=" flex justify-between py-2 w-full items-center">
        <Logo />

        <div>
          <Link href="/projects">Projects</Link>
        </div>
        <div>
          {/* <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar> */}
          <AuthButton />
        </div>
      </div>
      <Separator />
    </nav>
  );
};

export default MainNavbar;
