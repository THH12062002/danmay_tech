"use client";

import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import { useRouter } from "next/navigation";

export default function AcmeLogo() {
  const router = useRouter();
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white cursor-pointer`}
      onClick={() => {
        router.push("/");
      }}
    >
      <GlobeAltIcon className="h-12 w-12 rotate-[15deg]" />
      <p className="text-[44px]">Acme</p>
    </div>
  );
}
