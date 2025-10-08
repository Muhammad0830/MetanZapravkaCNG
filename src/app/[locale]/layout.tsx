
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Providers from "@/context/ThemeProvider";

import { ThemeProvider } from "next-themes";
import SideBar from "@/components/header/sidebar/sidebar";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />

      <body>
        <NextIntlClientProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <SideBar>{children}</SideBar>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

