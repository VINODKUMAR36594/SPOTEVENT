import React from "react";
import Image from "next/image";
import Link from "next/link";
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
        </div>
        {/* mobile section */}
      </nav>
      {/* Modals */}
    </>
  );
};

export default Header;
