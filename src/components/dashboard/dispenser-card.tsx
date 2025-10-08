"use client";

import type { Dispenser } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Fuel,
  Play,
  Square,
  X,
  Gauge,
  Thermometer,
  Activity,
  AlertTriangle,
} from "lucide-react";
import { useRealtimeTransaction } from "@/lib/use-realtime";
import { useTranslations } from "next-intl";

interface DispenserCardProps {
  dispenser: Dispenser;
  transaction?: {
    volumeM3: number;
    amountSum: number;
  };
  onStart?: () => void;
  onStop?: () => void;
  onFullTank?: () => void;
  onCancel?: () => void;
}

export function DispenserCard({
  dispenser,
  transaction,
  onStart,
  onStop,
  onFullTank,
  onCancel,
}: DispenserCardProps) {
  const t = useTranslations("Dashboard");
  const realtimeData = useRealtimeTransaction(dispenser.id);

  const statusConfig = {
    disconnected: {
      label: t("disconnected"),
      color: "bg-muted text-muted-foreground",
      icon: AlertTriangle,
    },
    idle: {
      label: t("idle"),
      color: "bg-yellow-500/10 text-yellow-500",
      icon: Activity,
    },
    filling: {
      label: t("filling"),
      color: "bg-blue-500/10 text-blue-500",
      icon: Activity,
    },
    finishing: {
      label: t("finishing"),
      color: "bg-yellow-500/10 text-yellow-500",
      icon: Activity,
    },
    emergency: {
      label: t("emergency"),
      color: "bg-red-500/10 text-red-500",
      icon: AlertTriangle,
    },
  };

  const status = statusConfig[dispenser.status];
  const StatusIcon = status.icon;

  const displayVolume =
    dispenser.status === "filling"
      ? realtimeData.volume
      : transaction?.volumeM3 || 0;
  const displayAmount =
    dispenser.status === "filling"
      ? realtimeData.amount
      : transaction?.amountSum || 0;

  return (
    <Card
      className={cn(
        "transition-all bg-white dark:bg-background-secondary text-black dark:text-white p-2 mb-0 gap-0",
        dispenser.status === "emergency" && "border-red-500",
        dispenser.status === "filling" && "border-blue-500",
        dispenser.status === "disconnected" && "opacity-60"
      )}
    >
      <CardHeader className="px-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Fuel className="h-5 w-5" />
            {t("columnNo")}
            {dispenser.number}
          </CardTitle>
          <Badge className={cn("gap-1", status.color)} variant="secondary">
            <StatusIcon className="h-3 w-3" />
            {status.label}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 px-0">
        {/* Metrics */}
        <div className="grid grid-cols-3 gap-1.5">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <Thermometer className="h-4 w-4 text-muted-background" />
              <div className="text-xs text-muted-background text-nowrap">
                {t("Temp")} (°C)
              </div>
            </div>
            <div className="w-full text-sm font-semibold rounded-md bg-black/20 dark:bg-white/15 px-2 py-1">
              {dispenser.temperature !== undefined ? dispenser.temperature : 0}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <Gauge className="h-4 w-4 text-muted-background" />
              <div className="text-xs text-muted-background text-nowrap">
                {t("Bosim")} ({t("kPa")})
              </div>
            </div>
            <div className="w-full text-sm font-semibold rounded-md bg-black/20 dark:bg-white/15 px-2 py-1">
              {dispenser.pressure !== undefined ? dispenser.pressure : 0}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex gap-1 items-center">
              <Gauge className="h-4 w-4 text-muted-background" />
              <div className="text-xs text-muted-background text-nowrap">
                {t("price")} ({t("som")})
              </div>
            </div>
            <div className="w-full text-sm font-semibold rounded-md bg-black/20 dark:bg-white/15 px-2 py-1">
              {dispenser.currentPrice.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Volume and Amount */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <div className="text-xs dark:text-white text-black">
              {t("volume")} ({t("cubicMeter")})
            </div>
            <div className="text-base text-black dark:text-white font-bold px-2 py-1 rounded-md bg-black/20 dark:bg-white/15">
              {displayVolume.toFixed(2)}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <div className="text-xs dark:text-white text-black">
              {t("umumiy narx")} ({t("som")})
            </div>
            <div className="text-base text-black dark:text-white font-bold px-2 py-1 rounded-md bg-black/20 dark:bg-white/15">
              {displayAmount.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2">
          {dispenser.status === "idle" && (
            <>
              <Button
                onClick={onStart}
                className="w-full cursor-pointer"
                variant="default"
              >
                <Play className="mr-2 h-4 w-4" />
                {t("start")}
              </Button>
              <Button
                onClick={onFullTank}
                className="w-full bg-transparent cursor-pointer"
                variant="outline"
              >
                <Fuel className="mr-2 h-4 w-4" />
                {t("fullTank")}
              </Button>
            </>
          )}
          {dispenser.status === "filling" && (
            <>
              <Button
                onClick={onStop}
                className="w-full cursor-pointer"
                variant="default"
              >
                <Square className="mr-2 h-4 w-4" />
                {t("stop")}
              </Button>
              <Button
                onClick={onCancel}
                className="w-full cursor-pointer"
                variant="destructive"
              >
                <X className="mr-2 h-4 w-4" />
                {t("cancel")}
              </Button>
            </>
          )}
          {dispenser.status === "disconnected" && (
            <Button
              disabled
              className="col-span-2 w-full bg-transparent cursor-pointer"
              variant="outline"
            >
              {t("disconnected")}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
