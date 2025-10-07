import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["ru", "uz"],
  defaultLocale: "uz",
  localeDetection: false,
});
