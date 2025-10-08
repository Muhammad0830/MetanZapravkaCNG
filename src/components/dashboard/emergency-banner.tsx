"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { useTranslations } from "next-intl";

interface EmergencyBannerProps {
  onEmergencyStop?: () => void;
}

export function EmergencyBanner({ onEmergencyStop }: EmergencyBannerProps) {
  const t = useTranslations("Dashboard");
  return (
    <Alert variant="destructive" className="border-red-500 bg-red-500/10">
      <AlertTriangle className="h-4 w-4 text-red-500 dark:text-red-500" />
      <AlertTitle className="font-semibold text-red-500">
        {t("Avariya holati")}
      </AlertTitle>
      <AlertDescription className="flex items-center justify-between">
        <span className="text-red-500">
          {t(
            "Favqulodda vaziyatda barcha kolonkalarni to'xtatish uchun tugmani bosing"
          )}
        </span>
        <button
          onClick={onEmergencyStop}
          className="px-2 py-0.5 rounded-sm text-base bg-red-500 hover:bg-red-500 text-white"
        >
          {t("emergencyStopped")}
        </button>
      </AlertDescription>
    </Alert>
  );
}
