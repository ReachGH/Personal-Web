import type { StaticImageData } from "next/image";
import type { ProjectSlug } from "./projects";
import dashboard from "@/public/projects/onboardhq-dashboard.png";
import clientView from "@/public/projects/onboardhq-client-view.png";
import clientDetails from "@/public/projects/onboardhq-client-details.png";
import taskDetails from "@/public/projects/onboardhq-task-details.png";
import home from "@/public/projects/ezepick-home.jpg";
import shop from "@/public/projects/ezepick-shop.jpg";
import product from "@/public/projects/ezepick-product.jpg";

export type ProjectScreenshot = {
  image: StaticImageData;
  title: string;
  alt: string;
  caption: string;
};

export const projectScreenshots: Partial<
  Record<ProjectSlug, ProjectScreenshot[]>
> = {
  onboardhq: [
    {
      image: dashboard,
      title: "Onboarding dashboard",
      alt: "OnboardHQ in the CRM, showing active onboarding cases, overdue tasks, filters and upcoming meetings.",
      caption:
        "A shared overview of active cases and upcoming onboarding work.",
    },
    {
      image: clientView,
      title: "The client experience",
      alt: "Carelever client onboarding portal with a progress timeline, assigned tasks, document uploads and a contact panel.",
      caption:
        "The client portal brings progress, outstanding tasks and documents into one place.",
    },
    {
      image: clientDetails,
      title: "A case in the CRM",
      alt: "An individual onboarding case in the CRM, with current and next steps, task owners, due dates and team chat.",
      caption: "Staff can follow a case and manage its tasks within the CRM.",
    },
    {
      image: taskDetails,
      title: "Task details",
      alt: "OnboardHQ task dialog showing a description, status, owner, due date, documents and internal team chat.",
      caption: "Task context, documents and internal discussion stay together.",
    },
  ],
  "sabai-code": [
    {
      image: home,
      title: "Home & categories",
      alt: "EzePick grocery prototype home screen with produce promotions and food categories in Khmer.",
      caption: "Browse produce and grocery categories.",
    },
    {
      image: shop,
      title: "Shop & produce",
      alt: "EzePick shop screen with a supplier profile and sections for vegetables, fruit and ingredients.",
      caption: "Explore a supplier’s shop and available produce.",
    },
    {
      image: product,
      title: "Product details",
      alt: "EzePick product screen showing spring onions, a price in riel, supplier information, quantity controls and an Add to Cart button.",
      caption: "View a product, choose a quantity and add it to the cart.",
    },
  ],
};
