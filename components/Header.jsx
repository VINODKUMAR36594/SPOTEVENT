import React from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedOut, SignInButton, SignUpButton,SignIn, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";
const Header = () => {
  return (
    <>
      <nav className="fixed top-0 right-0 left-0 bg-background/80 backdrop-blur-xl z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex ietms-center justify-between">
          {/* logo */}
          <Link href="/" className="felx items-center">
          <Image
            src="/spott.png"
            alt="Spot Logo"
            width={500}
            height={500}
            className="w-full h-11"
            priority
          />
          {/* pro badge */}
          </Link>
          {/* Search and location for desktpop */}

          {/* right action */}
          <div className="flex items-center">
             <SignedOut>
                <SignInButton mode="modal">
                  <Button size="sm">Sign In</Button>
                </SignInButton>
              </SignedOut>
              {/* Show the user button when the user is signed in */}
              <SignedIn>
                <UserButton/>
              </SignedIn>
          </div>
        </div>
        {/* mobile section */}
      </nav>
      {/* Modals */}
    </>
  );
};

export default Header;
