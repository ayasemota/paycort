import Link from "next/link";

interface ButtonProps {
  text: string;
  border?: boolean;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  href?: string;
}

export default function Button({ text, border, onClick, type = "button", href }: ButtonProps) {
  const baseClasses = `py-2 sm:py-3 px-4 sm:px-8 rounded-lg cursor-pointer border-2 border-green-200 transition-all duration-300 text-sm sm:text-base whitespace-nowrap ${border ? "text-green-200 hover:bg-green-200 hover:text-white" : "bg-green-200 text-white hover:border-green-100 hover:bg-green-100"}`;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClasses}>
      {text}
    </button>
  );
}