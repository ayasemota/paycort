interface ButtonProps {
   text: string;
   border?: boolean;
   onClick?: () => void;
   type?: "button" | "submit" | "reset";
}

export default function Button({ text, border, onClick, type = "button" }: ButtonProps) {
   return (
      <button type={type} onClick={onClick} className={`py-3 px-8 rounded-lg cursor-pointer border-2 border-green-200 transition-all duration-300 ${border ? "text-green-200 hover:bg-green-200 hover:text-white" : "bg-green-200 text-white hover:bg-green-100"}`}>
         <p>{text}</p>
      </button>
   );
}