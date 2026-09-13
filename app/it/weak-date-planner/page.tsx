import WeakDatePlanner from "@/components/WeakDatePlanner";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  path: "/it/weak-date-planner",
  title: "Planner date deboli per hotel e B&B | GuestFlow Systems",
  description: "Strumento gratuito per calcolare il gap di occupazione di una data debole e generare offerta, email, contenuto social e piano d’azione.",
});

export default function WeakDatePlannerPageIt() {
  return <main><WeakDatePlanner locale="it" /></main>;
}
