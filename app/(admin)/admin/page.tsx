"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Preloader from "@/app/components/preloader";

export default function AdminRedirect() {
  const router = useRouter();

  useEffect(() => {
    const isAuth = sessionStorage.getItem("adminAuth");
    if (isAuth) {
      router.replace("/admin/dashboard");
    } else {
      router.replace("/admin/login");
    }
  }, [router]);

  return <Preloader />;
}
