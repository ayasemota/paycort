interface ButtonProps {
   text: string;
   border?: boolean;
}

export default function Button({ text, border }: ButtonProps) {
   return (
      <>
         <button className={`py-3 px-8 rounded-lg cursor-pointer border-2 border-green-200 ${border ? "text-green-200" : "bg-green-200 text-white"}`}>
            <p>{text}</p>
         </button>
      </>
   );
}
