"use client";
import Link from "next/link";
import Button from "../components/Button";
import Logo from "./Logo";

export default function Navbar() {
   const scrollToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      const aboutSection = document.getElementById("about");
      if (aboutSection) {
         aboutSection.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <nav className="py-6 px-8 flex items-center justify-between sticky top-0 bg-white border-b border-green-100 border-border z-50">
         <Link href="/"><Logo /></Link>
         <div className="hidden lg:flex gap-10">
            <Link href="/" className="hover:text-green-200 transition-colors duration-300">Home</Link>
            <a href="#about" onClick={scrollToAbout} className="hover:text-green-200 transition-colors duration-300 cursor-pointer">About Us</a>
            <Link href="/Works" className="hover:text-green-200 transition-colors duration-300">How it Works</Link>
         </div>
         <div className="flex gap-6">
            <Link href="/onboarding?mode=signup" className="hidden md:flex"><Button text="Sign Up" border={true} /></Link>
            <Link href="/onboarding?mode=login"><Button text="Log in" /></Link>
         </div>
      </nav>
   );
}