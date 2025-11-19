"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { waitlistService } from "../lib/firebaseServices";
import Button from "../components/Button";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Modal from "../components/Modal";
import LogoSpat from "@/public/logo-spat.svg";

export default function LandingPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "success" as "success" | "error",
    title: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => [...prev, entry.target.id]);
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const showModal = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    setModalState({ isOpen: true, type, title, message });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const emailExists = await waitlistService.checkEmail(formData.email);
      if (emailExists) {
        showModal(
          "error",
          "Already Registered",
          "This email is already on our waitlist. We'll notify you when we launch!"
        );
        setIsSubmitting(false);
        return;
      }
      const result = await waitlistService.add(formData);
      if (result.success) {
        showModal(
          "success",
          "Welcome Aboard! 🎉",
          "You've successfully joined our waitlist. We'll notify you as soon as we launch!"
        );
        setFormData({ firstName: "", lastName: "", phone: "", email: "" });
      } else {
        showModal(
          "error",
          "Oops! Something Went Wrong",
          "We couldn't process your request. Please try again in a moment."
        );
      }
    } catch (error) {
      showModal(
        "error",
        "Connection Error",
        "Unable to connect to our servers. Please check your internet and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToWaitlist = () => {
    const waitlistSection = document.getElementById("waitlist");
    if (waitlistSection) {
      const navbarHeight = 80;
      const elementPosition =
        waitlistSection.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - navbarHeight,
        behavior: "smooth",
      });
    }
  };

  const inputFields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "phone", label: "Phone Number", type: "tel" },
    { name: "email", label: "Email Address", type: "email" },
  ];

  const aboutTexts = [
    "Paycort is building Nigeria's first smart, people-friendly tax companion – made for freelancers, creators, traders, and small business owners.",
    "We believe understanding taxes shouldn't be stressful or reserved for accountants. Paycort helps you learn, track, and plan your taxes automatically, so you stay compliant without the confusion.",
    "Our mission is simple: Make taxes clear, easy, and empowering for every Nigerian who earns.",
    "Join other Nigerians waiting to experience a simpler, smarter way to handle taxes – powered by AI, designed for you.",
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Sign Up & Connect",
      description:
        "Create your account in minutes and securely link your income sources. We use bank-level encryption to keep your data safe.",
    },
    {
      step: "02",
      title: "AI Tracks & Calculates",
      description:
        "Our smart AI automatically monitors your earnings, categorizes transactions, and calculates your tax obligations in real-time.",
    },
    {
      step: "03",
      title: "Stay Compliant & Informed",
      description:
        "Get timely reminders, tax-saving tips, and insights. File with confidence knowing you're always compliant with Nigerian tax laws.",
    },
  ];

  return (
    <>
      <Navbar />
      <section
        className="mx-auto min-h-[500px] sm:min-h-[600px] flex flex-col items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage: "url(/banner-bg.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/10"></div>
        <div className="container px-4 sm:px-6 py-12 sm:py-16 flex flex-col gap-4 sm:gap-6 lg:items-center lg:text-center lg:justify-center relative z-10">
          <h1 className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[52px] lg:max-w-[70%] animate-fadeInUp leading-tight">
            Understand Your Taxes Before They{" "}
            <span className="text-green-100 font-(family-name:--font-play-fair-display) italic">
              Understand
            </span>{" "}
            You.
          </h1>
          <p className="text-sm sm:text-base max-w-[75vw] lg:max-w-[40%] animate-fadeInUp stagger-1">
            A smart AI tool that helps Nigerians see, track, and plan their
            taxes in real time powered by clarity, not confusion.
          </p>
          <div className="w-full animate-fadeInUp stagger-2">
            <Button text="Join The Waitlist" onClick={scrollToWaitlist} />
          </div>
      </div>
        <div className="hidden lg:block">
          <div className="absolute top-22 right-24">
            <Image src="/money.svg" alt="Money Image" width={70} height={70} />
          </div>
          <div className="absolute top-10 left-18">
            <Image src="/money.svg" alt="Money Image" width={70} height={70} />
          </div>
          <div className="absolute bottom-12 right-36">
            <Image src="/money.svg" alt="Money Image" width={70} height={70} />
          </div>
          <div className="absolute bottom-26 left-40">
            <Image src="/money.svg" alt="Money Image" width={70} height={70} />
          </div>
        </div>
      </section>
      <section
        id="about"
        ref={(el) => {
          sectionRefs.current["about"] = el;
        }}
        className={`pt-[60px] sm:pt-[88px] px-4 sm:px-6 container mx-auto max-w-[1200px] scroll-mt-20 transition-all duration-1000 ${
          visibleSections.includes("about") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-5 sm:gap-7">
          <div
            className={`hidden lg:flex transition-all duration-1000 ${
              visibleSections.includes("about") ? "animate-slideInLeft" : ""
            }`}
          >
            <Image
              src={LogoSpat}
              alt="Logo Spat"
              className="w-full lg:w-auto lg:h-full object-contain"
            />
          </div>
          <div
            className={`bg-[#EDFFF5] rounded-lg overflow-hidden flex-1 lg:relative py-6 sm:py-8 lg:py-0 transition-all duration-1000 ${
              visibleSections.includes("about") ? "animate-slideInRight" : ""
            }`}
          >
            <h2 className="text-[24px] sm:text-[30px] lg:text-[130px] text-black lg:text-[#E2F3EA] font-bold lg:absolute lg:-bottom-8 lg:right-0 text-center lg:text-left leading-tight px-4 sm:px-0">
              ABOUT US
            </h2>
            <div className="grid gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6 lg:p-[82px] text-sm sm:text-base">
              {aboutTexts.map((text, index) => (
                <p
                  key={index}
                  className={`transition-all duration-700 ${
                    visibleSections.includes("about") ? "animate-fadeInUp" : ""
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        id="works"
        ref={(el) => {
          sectionRefs.current["works"] = el;
        }}
        className={`pt-[60px] sm:pt-[88px] scroll-mt-20 transition-all duration-1000 ${
          visibleSections.includes("works") ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="py-8 sm:py-10 px-4 sm:px-6 bg-[#EDFFF5]">
          <div className="container mx-auto max-w-[1200px]">
            <h2
              className={`text-[28px] sm:text-[32px] md:text-[42px] font-semibold text-center mb-3 sm:mb-4 transition-all duration-800 ${
                visibleSections.includes("works") ? "animate-fadeInUp" : ""
              }`}
            >
              How It Works
            </h2>
            <p
              className={`text-center text-gray-600 mb-8 sm:mb-12 max-w-[600px] mx-auto transition-all duration-800 text-sm sm:text-base px-4 ${
                visibleSections.includes("works")
                  ? "animate-fadeInUp stagger-1"
                  : ""
              }`}
            >
              Getting started with Paycort is simple. Follow these three easy
              steps to take control of your taxes.
            </p>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              {howItWorksSteps.map((item, index) => (
                <div
                  key={index}
                  className={`bg-white rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-green-100/20 group ${
                    visibleSections.includes("works")
                      ? "animate-scaleIn"
                      : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="text-[40px] sm:text-[48px] font-bold text-green-200/20 group-hover:text-green-200/40 transition-colors duration-300 mb-3 sm:mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-[18px] sm:text-[22px] font-semibold mb-3 sm:mb-4 text-black group-hover:text-green-200 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section
        id="waitlist"
        ref={(el) => {
          sectionRefs.current["waitlist"] = el;
        }}
        className={`py-[60px] sm:py-[88px] px-4 sm:px-6 container mx-auto flex items-center justify-center scroll-mt-20 transition-all duration-1000 ${
          visibleSections.includes("waitlist")
            ? "opacity-100 animate-fadeInUp"
            : "opacity-0"
        }`}
      >
        <div className="max-w-[1200px] w-full bg-[#C8E6D7] rounded-2xl p-6 sm:p-8 md:p-16 hover:shadow-xl transition-shadow duration-300">
          <h1 className="text-[28px] sm:text-[32px] md:text-[42px] mb-8 sm:mb-12">
            Join the <span className="text-green-100">Waitlist</span> now!
          </h1>
          <form
            onSubmit={handleSubmit}
            className="grid sm:grid-cols-2 gap-6 sm:gap-8"
          >
            {inputFields.map((field, index) => (
              <div
                key={field.name}
                className={`flex flex-col gap-2 sm:gap-3 ${
                  visibleSections.includes("waitlist") ? "animate-fadeInUp" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <label className="font-medium text-black text-sm sm:text-base">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="py-3 sm:py-4 px-4 sm:px-6 rounded-lg border-2 border-green-100 focus:outline-none focus:border-green-200 bg-white focus:scale-[1.02] transition-all duration-300 w-full disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                />
              </div>
            ))}
            <div
              className={`sm:col-span-2 mt-2 sm:mt-4 ${
                visibleSections.includes("waitlist")
                  ? "animate-fadeInUp stagger-4"
                  : ""
              }`}
            >
              <Button
                text={isSubmitting ? "Submitting..." : "Join The Waitlist"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </section>
      <Footer />
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />
    </>
  );
}