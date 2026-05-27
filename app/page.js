import Act1Boot from "@/components/Act1Boot";
import Act2Curtain from "@/components/Act2Curtain";
import Act3Portals from "@/components/Act3Portals";
import Act4GameStrip from "@/components/Act4GameStrip";
import Act5ExplodedTab from "@/components/Act5ExplodedTab";
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
      <Act5ExplodedTab />
      <Act3Portals />
      <Act4GameStrip />
      <Act6Receipt />
      <Act7StartingLine />
      <SiteFooter />
    </main>
  );
}
