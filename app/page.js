import Act1Boot from "@/components/home/Act1Boot";
import Act2Curtain from "@/components/home/Act2Curtain";
import Act3ExplodedTab from "@/components/home/Act3ExplodedTab";
import Act4Portals from "@/components/home/Act4Portals";
import Act5GameStrip from "@/components/home/Act5GameStrip";
import Act6Receipt from "@/components/home/Act6Receipt";
import Act7StartingLine from "@/components/home/Act7StartingLine";
import SiteFooter from "@/components/chrome/SiteFooter";
import SiteHeader from "@/components/chrome/SiteHeader";

export default function Page() {
  return (
    <main className="relative">
      <SiteHeader />
      <Act1Boot />
      <Act2Curtain />
      <Act3ExplodedTab />
      <Act4Portals />
      <Act5GameStrip />
      <Act6Receipt />
      <Act7StartingLine />
      <SiteFooter />
    </main>
  );
}
