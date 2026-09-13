import WeakDatePlanner from "@/components/WeakDatePlanner";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/weak-date-planner",
  title: "Weak Date Planner for hotels & B&Bs | GuestFlow Systems",
  description: "Free hotel tool to calculate the occupancy gap for a weak date and generate an offer, email, social hook and short action plan.",
});

export default function WeakDatePlannerPage() {
  return <main><WeakDatePlanner locale="en" /></main>;
}
