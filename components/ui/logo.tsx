import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import nexgenLogo from "@/public/logo.svg";

export function BrandMark({ className }: { className?: string }) {
  return (
    <Image
      src={nexgenLogo}
      alt=""
      aria-hidden
      width={32}
      height={32}
      unoptimized
      className={cn("h-9 w-9", className)}
    />
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <BrandMark className="transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105" />
      <span
        className="font-display text-xl font-bold tracking-tight sm:text-2xl"
        style={{ fontFamily: "var(--font-space-grotesk)" }}
      >
        <span className="bg-clip-text text-blue-600">Nex</span>
        <span className="text-crimson-500">Gen</span>
        <span className="text-gold-500">Ads</span>
      </span>
    </Link>
  );
}

export default Logo;
