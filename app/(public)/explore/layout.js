"use client";
import { is } from "date-fns/locale";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";

import React from "react";
const ExploreLayout = ({ children }) => {
  const pathName = usePathname();
  const router = useRouter();
  const isMainExplore = pathName === "/explore";
  return (
    <div className="pb-16 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {!isMainExplore && (
          <div className="mb-6">
            <Button
              varaint="ghost"
              onClick={() => router.push("/explore")}
              className="gap-2 -ml-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Explore
            </Button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default ExploreLayout;
