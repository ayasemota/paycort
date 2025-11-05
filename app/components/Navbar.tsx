import Link from "next/link";
import Button from "../components/Button";
import Logo from "./Logo";

export default function Navbar() {
   return (
      <>
         <nav className="py-6 px-8 flex items-center justify-between sticky top-0 bg-white border-b border-green-100 border-border">
            <Link href="/">
               <Logo />
            </Link>
            <div className="hidden lg:flex gap-10">
               <Link href="/">Home</Link>
               <Link href="/About">About Us</Link>
               <Link href="/Works">How it Works</Link>
            </div>
            <div className="flex gap-6">
               <Link href="/Onboarding" className="hidden md:flex">
                  <Button text="Sign Up" border={true} />
               </Link>
               <Link href="/Onboarding"><Button text="Log in" /></Link>
            </div>
         </nav>
      </>
   );
}
