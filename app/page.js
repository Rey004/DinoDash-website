import Act1Boot from "@/components/Act1Boot";
import Act2Curtain from "@/components/Act2Curtain";
import Act3ExplodedTab from "@/components/Act3ExplodedTab";
import Act4Portals from "@/components/Act4Portals";
import Act5GameStrip from "@/components/Act5GameStrip";
import Act6Receipt from "@/components/Act6Receipt";
import Act7StartingLine from "@/components/Act7StartingLine";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

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
