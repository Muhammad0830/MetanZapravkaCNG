"use client";
import { Link, usePathname } from "@/i18nchanged/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("Asosiy");
  const pathName = usePathname();
  return (
    <div>
      <div>{t("title")}</div>

      <div className="flex gap-2 items-center">
        <Link href={pathName} locale="uz">
          <button className="cursor-pointer px-2 py-0.5 rounded-sm bg-white text-black">
            O&apos;zbekcha
          </button>
        </Link>
        <Link href={pathName} locale="ru">
          <button className="cursor-pointer px-2 py-0.5 rounded-sm bg-white text-black">
            Русский
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Page;
