import ComingSoonPage from "@/components/ComingSoonPage";

export const metadata = {
  title: "Feedback — DinoDash",
  description: "Share what you'd like to see in DinoDash next.",
};

export default function FeedbackPage() {
  return (
    <ComingSoonPage
      eyebrow="tell us"
      title="feedback"
      subtitle="vote on the next theme, suggest a feature, or just say hi."
      description="the feedback form is on its way. for now, you can reach out through the project repository — every note actually gets read."
      cta={{ label: "back to home", href: "/" }}
    />
  );
}
