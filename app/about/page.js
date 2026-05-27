import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = {
  title: "About — DinoDash",
  description: "What DinoDash is, and who it's for.",
};

export default function AboutPage() {
  return (
    <ComingSoonPage
      eyebrow="who we are"
      title="about"
      subtitle="what dinodash is, why it exists, and who it's for."
      description="DinoDash is a chrome new tab that runs on its own. no servers, no tracking, no funny business — just a dino, a city, and a number going up. a longer story is coming here soon."
      cta={{ label: "read the docs", href: "/docs" }}
    />
  );
}
