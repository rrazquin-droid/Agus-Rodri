import { MobileRedirect } from "@/components/MobileRedirect";
import { LandingDesktop } from "@/components/LandingDesktop";

export default function HomePage() {
  return (
    <>
      <MobileRedirect to="/dashboard" />
      <LandingDesktop />
    </>
  );
}
