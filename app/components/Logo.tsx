import Image from "next/image";
export default function Logo() {
   return (
     <>
       <Image
         src="/logo.png"
         alt="Company Logo"
         width={150}
         height={50}
       />
     </>
   );
}