import ErrorScreen from "@/components/pages/ErrorScreen";

export const metadata = {
  title: "404 — Lost in the dark valley · DinoDash",
};

export default function NotFound() {
  return (
    <ErrorScreen
      code="404"
      status="page not found"
      message="this URL doesn't exist on dinodash."
      detail="// the dino ran past this address. nothing's here. yet."
      primary={{ label: "back to home", href: "/" }}
      secondary={{ label: "read the docs", href: "/docs" }}
    />
  );
}
