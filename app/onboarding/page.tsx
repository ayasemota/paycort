import { Suspense } from "react";
import Onboarding from "./Onboarding";

export default function OnboardingPage() {
   return (
      <Suspense fallback={<div>Loading...</div>}>
         <Onboarding />
      </Suspense>
   );
}