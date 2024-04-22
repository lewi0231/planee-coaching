import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="group flex text-xl leading-snug h-full">
      <span className="font-bold transition group-hover:-translate-y-1 h-full">
        Plan-
      </span>
      <span className=" font-light transition group-hover:-translate-y-1 h-full">
        ee
      </span>
    </Link>
  );
};
