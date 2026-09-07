import type { Metadata } from "next";
import AboutHero from "@/sections/About/AboutHero";
import MissionVision from "@/sections/About/MissionVision";
import Founder from "@/sections/About/Founder"
import TeamMembers from "@/sections/About/TeamMembers";
import Affiliations from "@/sections/About/Affiliations";

export const metadata: Metadata = {
  title: "About Us | VR Tax CPA LLC — Reliable Partners in Your Growth",
  description:
    "Learn about VR Tax CPA LLC — delivering reliable, accurate, and strategic tax, accounting, and advisory services led by Vethavalli Ramakrishnan, CPA.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <MissionVision />
      <Founder/>
      {/* <TeamMembers /> */}
      {/* <Affiliations /> */}
    </>
  );
}
