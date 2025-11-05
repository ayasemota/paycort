import Link from "next/link";
import Button from "./components/Button";
import Logo from "./components/Logo";

export default function NotFound() {
   return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4">
         <div className="flex flex-col items-center gap-8 text-center max-w-[600px]">
            <Logo />
            <div className="flex flex-col gap-4">
               <h1 className="text-[120px] md:text-[180px] font-bold text-main text-green-200 leading-none">404!</h1>
               <h2 className="text-h2 font-bold text-black">Page Not Found</h2>
               <p className="text-body text-brown">The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track!</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
               <Link href="/"><Button text="Go Home" /></Link>
            </div>
         </div>
      </div>
   );
}