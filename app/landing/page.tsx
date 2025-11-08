"use client";
import { useState } from "react";
import Image from "next/image";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import LogoSpat from "@/public/logo-spat.png";

export default function LandingPage() {
   const [formData, setFormData] = useState({ firstName: "", lastName: "", phone: "", email: "" });
   const [showModal, setShowModal] = useState(false);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setShowModal(true);
      setFormData({ firstName: "", lastName: "", phone: "", email: "" });
   };

   const scrollToWaitlist = () => {
      const waitlistSection = document.getElementById("waitlist");
      if (waitlistSection) {
         waitlistSection.scrollIntoView({ behavior: "smooth" });
      }
   };

   const inputFields = [
      { name: "firstName", label: "First Name", type: "text" },
      { name: "lastName", label: "Last Name", type: "text" },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "email", label: "Email Address", type: "email" }
   ];

   const aboutTexts = [
      "Paycort is building Nigeria's first smart, people-friendly tax companion – made for freelancers, creators, traders, and small business owners.",
      "We believe understanding taxes shouldn't be stressful or reserved for accountants. Paycort helps you learn, track, and plan your taxes automatically, so you stay compliant without the confusion.",
      "Our mission is simple: Make taxes clear, easy, and empowering for every Nigerian who earns.",
      "Join other Nigerians waiting to experience a simpler, smarter way to handle taxes – powered by AI, designed for you."
   ];

   return (
      <>
         <Navbar />
         <section className="mx-auto min-h-[600px] flex flex-col items-center justify-center" style={{ backgroundImage: "url(/banner-bg.png)", backgroundSize: "cover", backgroundRepeat: "no-repeat", backgroundPosition: "center" }}>
            <div className="container px-6 py-16 flex flex-col gap-6 lg:items-center lg:text-center lg:justify-center">
               <h1 className="text-[36px] md:text-[52px] lg:max-w-[70%]">Understand Your Taxes. Before They <span className="text-green-100 italic">Understand</span> You.</h1>
               <p className="lg:max-w-[40%]">A smart AI tool that helps Nigerians see, track, and plan their taxes in real time powered by clarity, not confusion.</p>
               <div className="w-full"><Button text="Join Early Access" onClick={scrollToWaitlist} /></div>
            </div>
         </section>
         <section id="about" className="pt-[88px] px-6 container mx-auto max-w-[1200px]">
            <div className="flex flex-col lg:flex-row gap-7">
               <div className="w-full lg:w-auto lg:shrink-0"><Image src={LogoSpat} alt="Logo Spat" className="w-full lg:w-auto lg:h-full object-contain" /></div>
               <div className="bg-[#EDFFF5] rounded-lg overflow-hidden flex-1 lg:relative py-8 lg:py-0">
                  <p className="text-[30px] lg:text-[130px] text-black lg:text-[#E2F3EA] font-bold lg:absolute lg:bottom-0 lg:right-0 text-center lg:text-left leading-24">ABOUT US</p>
                  <div className="grid gap-8 p-4 lg:p-[82px]">
                     {aboutTexts.map((text, index) => (<p key={index}>{text}</p>))}
                  </div>
               </div>
            </div>
         </section>
         <section id="waitlist" className="py-[88px] px-6 container mx-auto flex items-center justify-center">
            <div className="max-w-[1200px] w-full bg-[#C8E6D7] rounded-2xl p-8 md:p-16">
               <h1 className="text-[32px] md:text-[42px] mb-12">Join the <span className="italic text-green-100">Waitlist</span> now!</h1>
               <form onSubmit={handleSubmit} className="grid w-full md:grid-cols-2 gap-8">
                  {inputFields.map((field) => (
                     <div key={field.name} className="flex flex-col gap-3">
                        <label className="font-medium text-black">{field.label}</label>
                        <input type={field.type} name={field.name} placeholder={field.label} value={formData[field.name as keyof typeof formData]} onChange={handleChange} required className="py-4 px-6 rounded-lg border-2 border-green-100 focus:outline-none focus:border-green-200 transition-colors duration-300 max-w-[90%] sm:max-w-full" />
                     </div>
                  ))}
                  <div className="md:col-span-2 mt-4">
                     <Button text="Join Early Access" type="submit" />
                  </div>
               </form>
            </div>
         </section>
         <Footer />
         <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Thank You!" message="You have successfully joined our waitlist. We'll notify you when we launch!" />
      </>
   );
}