import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = {
  title: "Bug report — DinoDash",
  description: "Spotted something broken? Tell us about it.",
};

export default function BugReportPage() {
  return (
    <ComingSoonPage
      eyebrow="something broken?"
      title="bug report"
      subtitle="describe what happened, and we'll chase it down."
      description="a proper bug report form is coming soon. until then, please open an issue on the project repository — include your browser version and a short list of steps to reproduce."
      cta={{ label: "back to home", href: "/" }}
    />
  );
}
