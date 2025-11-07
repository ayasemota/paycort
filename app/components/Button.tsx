import Link from "next/link";

interface ButtonProps {
   text: string;
   border?: boolean;
   href?: string;
   onClick?: () => void;
   type?: "button" | "submit";
}

export default function Button({ text, border, href, onClick, type = "button" }: ButtonProps) {
   const classes = `py-3 px-8 rounded-lg cursor-pointer border transition-all duration-300 ${border
      ? "text-green-200 hover:bg-green-200 hover:text-white"
      : "bg-green-200 text-white hover:bg-green-100"
      }`;

   if (href) {
      return (
         <Link href={href}>
            <button className={classes} type="button">
               <p>{text}</p>
            </button>
         </Link>
      );
   }

   return (
      <button onClick={onClick} type={type} className={classes}>
         <p>{text}</p>
      </button>
   );
}
