"use client";
import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Button from "../components/Button";
import Logo from "../components/Logo";

export default function Onboarding() {
   const searchParams = useSearchParams();
   const mode = searchParams.get("mode") || "login";
   const [isLogin, setIsLogin] = useState(mode === "login");
   const [showModal, setShowModal] = useState(false);
   const [formData, setFormData] = useState({ name: "", email: "", password: "" });
   const firstInputRef = useRef<HTMLInputElement>(null);

   useEffect(() => {
      setIsLogin(mode === "login");
   }, [mode]);

   useEffect(() => {
      firstInputRef.current?.focus();
   }, [isLogin]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      setFormData({ ...formData, [e.target.name]: e.target.value });

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      setShowModal(true);
      setFormData({ name: "", email: "", password: "" });
   };

   const loginFields = [
      { name: "email", label: "Email Address", type: "email" },
      { name: "password", label: "Password", type: "password" }
   ];

   const signupFields = [
      { name: "name", label: "Full Name", type: "text" },
      { name: "email", label: "Email Address", type: "email" },
      { name: "password", label: "Password", type: "password" }
   ];

   const fields = isLogin ? loginFields : signupFields;

   return (
      <>
         <Navbar />
         <section className="min-h-[600px] flex items-center justify-center px-6 py-20 bg-[#EDFFF5]">
            <div className="max-w-[480px] w-full bg-white rounded-2xl shadow-lg border border-green-50 p-8 md:p-12 text-center flex flex-col items-center">
               <div className="mb-6">
                  <Logo />
               </div>
               <h1 className="text-[28px] md:text-[24px] font-semibold mb-2">
                  {isLogin ? "Welcome Back 👋" : "Create Your Account 🚀"}
               </h1>
               <p className="text-gray-500 mb-8 text-sm">
                  {isLogin
                     ? "Log in to continue to your dashboard."
                     : "Sign up to start simplifying your taxes with Paycort."}
               </p>

               <div className="flex justify-center gap-6 mb-8 border-b border-gray-200 w-full">
                  {["login", "signup"].map((type) => (
                     <button
                        key={type}
                        onClick={() => setIsLogin(type === "login")}
                        className={`cursor-pointer pb-3 font-medium text-sm transition-all duration-300 ${(type === "login" && isLogin) || (type === "signup" && !isLogin)
                           ? "text-green-200 border-b-2 border-green-200"
                           : "text-gray-400 hover:text-gray-600"
                           }`}
                     >
                        {type === "login" ? "Log In" : "Sign Up"}
                     </button>
                  ))}
               </div>


               <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6 text-left">
                  {fields.map((field, idx) => (
                     <div key={field.name} className="flex flex-col gap-2">
                        <label htmlFor={field.name} className="font-medium text-gray-800 text-sm">
                           {field.label}
                        </label>
                        <input
                           ref={idx === 0 ? firstInputRef : null}
                           id={field.name}
                           type={field.type}
                           name={field.name}
                           value={formData[field.name as keyof typeof formData]}
                           onChange={handleChange}
                           required
                           className="py-3 px-4 rounded-lg border-2 border-green-50 focus:border-green-200 focus:outline-none transition-all duration-300 placeholder-gray-400"
                        />
                     </div>
                  ))}
                  <Button
                     text={isLogin ? "Log In" : "Sign Up"}
                     type="submit"
                     onClick={() => { }}
                  />
               </form>

               <p className="text-gray-600 text-sm mt-6">
                  {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
                  <button
                     onClick={() => setIsLogin(!isLogin)}
                     className="text-green-200 hover:text-green-100 font-medium underline hover:no-underline cursor-pointer underline-offset-2"
                  >
                     {isLogin ? "Sign Up" : "Log In"}
                  </button>
               </p>
            </div>
         </section>
         <Footer />
         <Modal
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            title={isLogin ? "Welcome Back!" : "Account Created!"}
            message={
               isLogin
                  ? "You have successfully logged in."
                  : "Your account has been created successfully!"
            }
         />
      </>
   );
}