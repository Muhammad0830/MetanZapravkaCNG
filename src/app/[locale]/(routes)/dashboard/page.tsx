"use client";
import { useTranslations } from "next-intl";
import React from "react";

const Page = () => {
  const t = useTranslations("Asosiy");
  return (
    <div>
      <div className="text-black  dark:text-white">{t("title")}</div>
    </div>
  );
};

export default Page;
