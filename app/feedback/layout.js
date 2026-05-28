/**
 * The feedback route uses its own minimal chrome — no SiteHeader,
 * no SiteFooter. The page itself owns every pixel.
 */
export default function FeedbackLayout({ children }) {
  return <>{children}</>;
}
