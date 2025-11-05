import Link from "next/link";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Image from "next/image";
import LogoSpat from "@/public/logo-spat.png";

export default function LandingPage() {
   return (
      <>
         <Navbar />

         <section className="mx-auto min-h-[600px] flex flex-col items-center justify-center"
            style={{
               backgroundImage: "url(/banner-bg.png)",
               backgroundSize: "cover",
               backgroundRepeat: "no-repeat",
               backgroundPosition: "center",
            }}>
            <div className="container px-6 py-16 flex flex-col gap-6 lg:items-center lg:text-center lg:justify-center">
               <h1 className="text-[36px] md:text-[52px] lg:max-w-[70%]">Understand Your Taxes. Before They <span className="text-green-100">Understand</span> You.</h1>
               <p className="lg:max-w-[40%]">A smart AI tool that helps Nigerians see, track, and plan their taxes in real time powered by clarity, not confusion.</p>
               <Link href="/Waitlist"><Button text="Join Early Access" /></Link>
            </div>
         </section>

         <section className="pt-[88px] px-6 container mx-auto flex gap-7 justify-between items-center">
            <div className="flex">
               <Image src={LogoSpat} alt="Logo Spat" className="h-full" />
            </div>
            <div className="grid gap-8 bg-[#EDFFF5] rounded-lg p-4 lg:p-[82px] relative">
               <p>Paycort is building Nigeria’s first smart, people-friendly tax companion — made for freelancers, creators, traders, and small business owners.</p>
               <p>We believe understanding taxes shouldn’t be stressful or reserved for accountants. Paycort helps you learn, track, and plan your taxes automatically, so you stay compliant without the confusion.</p>
               <p>Our mission is simple:
                  Make taxes clear, easy, and empowering for every Nigerian who earns.</p>
               <p>Join other Nigerians waiting to experience a simpler, smarter way to handle taxes — powered by AI, designed for you.</p>
               <p className="text-[130px] text-[#E2F3EA] font-bold absolute bottom-0 right-0">ABOUT US</p>
            </div>
         </section>
         <Footer />
      </>
   );
}