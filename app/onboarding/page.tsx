"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Logo from "../components/Logo";

type FormField = { name: string; label: string; type: string; };
type FormData = { name: string; email: string; password: string; };

const FORM_CONFIGS = {
   login: [
      { name: "email", label: "Email Address", type: "email" },
      { name: "password", label: "Password", type: "password" }
   ] as FormField[],
   signup: [
      { name: "name", label: "Full Name", type: "text" },
      { name: "email", label: "Email Address", type: "email" },
      { name: "password", label: "Password", type: "password" }
   ] as FormField[]
};

const INITIAL_FORM_STATE: FormData = { name: "", email: "", password: "" };

export default function OnboardingPage() {
   const searchParams = useSearchParams();
   const modeFromUrl = (searchParams.get("mode") || "login") === "login";
   const [authMode, setAuthMode] = useState(modeFromUrl);
   const [modalOpen, setModalOpen] = useState(false);
   const [form, setForm] = useState<FormData>(INITIAL_FORM_STATE);
   const inputRef = useRef<HTMLInputElement>(null);

   useEffect(() => inputRef.current?.focus(), [authMode]);

   const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

   const submitForm = (e: React.FormEvent) => {
      e.preventDefault();
      setModalOpen(true);
      setForm(INITIAL_FORM_STATE);
   };

   const toggleMode = () => setAuthMode(prev => !prev);

   const currentFields = authMode ? FORM_CONFIGS.login : FORM_CONFIGS.signup;
   const modeText = { title: authMode ? "Welcome Back 👋" : "Create Your Account 🚀", subtitle: authMode ? "Log in to continue to your dashboard." : "Sign up to start simplifying your taxes with Paycort.", button: authMode ? "Log In" : "Sign Up", toggle: authMode ? "Don't have an account?" : "Already have an account?", toggleLink: authMode ? "Sign Up" : "Log In", modalTitle: authMode ? "Welcome Back!" : "Account Created!", modalMessage: authMode ? "You have successfully logged in." : "Your account has been created successfully!" };

   return (
      <>
         <Navbar />
         <section className="min-h-[600px] flex items-center justify-center px-6 py-20 bg-[#EDFFF5]">
            <div className="max-w-[480px] w-full bg-white rounded-2xl shadow-lg border border-green-50 p-8 md:p-12 text-center flex flex-col items-center">
               <div className="mb-6"><Logo /></div>
               <h1 className="text-[28px] md:text-[24px] font-semibold mb-2">{modeText.title}</h1>
               <p className="text-gray-500 mb-8 text-sm">{modeText.subtitle}</p>
               <div className="flex justify-center gap-6 mb-8 border-b border-gray-200 w-full">
                  {["login", "signup"].map(mode => (
                     <button key={mode} onClick={() => setAuthMode(mode === "login")} className={`cursor-pointer pb-3 font-medium text-sm transition-all duration-300 ${(mode === "login" && authMode) || (mode === "signup" && !authMode) ? "text-green-200 border-b-2 border-green-200" : "text-gray-400 hover:text-gray-600"}`}>{mode === "login" ? "Log In" : "Sign Up"}</button>
                  ))}
               </div>
               <form onSubmit={submitForm} className="w-full flex flex-col gap-6 text-left">
                  {currentFields.map((field, idx) => (
                     <div key={field.name} className="flex flex-col gap-2">
                        <label htmlFor={field.name} className="font-medium text-gray-800 text-sm">{field.label}</label>
                        <input ref={idx === 0 ? inputRef : null} id={field.name} type={field.type} name={field.name} value={form[field.name as keyof FormData]} onChange={updateForm} required className="py-3 px-4 rounded-lg border-2 border-green-50 focus:border-green-200 focus:outline-none transition-all duration-300 placeholder-gray-400" />
                     </div>
                  ))}
                  <Button text={modeText.button} type="submit" />
               </form>
               <p className="text-gray-600 text-sm mt-6">{modeText.toggle} <button onClick={toggleMode} className="text-green-200 hover:text-green-100 font-medium underline hover:no-underline cursor-pointer underline-offset-2">{modeText.toggleLink}</button></p>
            </div>
         </section>
         <Footer />
         <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modeText.modalTitle} message={modeText.modalMessage} />
      </>
   );
}