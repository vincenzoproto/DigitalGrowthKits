import GuidedWalkthrough from "./GuidedWalkthrough";
import PilotReview from "./PilotReview";

// Keep the existing synthetic-data walkthrough intact and add a review-before-payment path.
export default function GuidedDemo({ locale }: { locale: "it" | "en" }) {
  return <><GuidedWalkthrough locale={locale} /><PilotReview locale={locale} /></>;
}
