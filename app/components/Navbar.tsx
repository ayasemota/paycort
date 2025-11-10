"use client";
import Link from "next/link";
import Button from "../components/Button";
import Logo from "./Logo";

export default function Navbar() {
   const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
      e.preventDefault();
      const section = document.getElementById(sectionId);
      if (section) {
         const navbarHeight = 80;
         const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
         window.scrollTo({ top: elementPosition - navbarHeight, behavior: "smooth" });
      }
   };

   return (
      <nav className="py-6 px-8 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md border-b border-green-100/30 z-50 shadow-sm">
         <Link href="/"><Logo /></Link>
         <div className="hidden lg:flex gap-10">
            <Link href="/" className="hover:text-green-200 transition-colors duration-300">Home</Link>
            <a href="#about" onClick={(e) => scrollToSection(e, "about")} className="hover:text-green-200 transition-colors duration-300 cursor-pointer">About Us</a>
            <a href="#works" onClick={(e) => scrollToSection(e, "works")} className="hover:text-green-200 transition-colors duration-300 cursor-pointer">How it Works</a>
         </div>
         <div className="flex gap-6">
            <Link href="/onboarding?mode=signup" className="hidden sm:flex"><Button text="Sign Up" border={true} /></Link>
            <Link href="/onboarding?mode=login"><Button text="Log in" /></Link>
         </div>
      </nav>
   );
}