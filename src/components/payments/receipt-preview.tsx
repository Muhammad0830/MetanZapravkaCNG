"use client";

import type { Transaction, Vehicle, Payment } from "@/lib/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Fuel, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

interface ReceiptPreviewProps {
  transaction: Transaction;
  vehicle?: Vehicle;
  payment: Payment;
}

export function ReceiptPreview({
  transaction,
  vehicle,
  payment,
}: ReceiptPreviewProps) {
  const t = useTranslations("Dashboard");
  return (
    <Card className="mx-auto w-full max-w-sm font-mono text-sm">
      <CardHeader className="text-center">
        <div className="flex justify-center">
          <Fuel className="h-8 w-8" />
        </div>
        <h2 className="text-lg font-bold">CNG STATION</h2>
        <p className="text-xs text-muted-foreground">
          {t("Metan yoqilg'i quyish stantsiyasi")}
        </p>
        <p className="text-xs text-muted-foreground">STIR: 123456789</p>
        <p className="text-xs text-muted-foreground">
          {t("Toshkent sh., Chilonzor tumani")}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Separator />

        <div className="space-y-1">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("Chek №")}</span>
            <span className="font-semibold">
              {transaction.id.slice(0, 8).toUpperCase()}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("date")}</span>
            <span>{format(payment.time, "dd.MM.yyyy HH:mm")}</span>
          </div>
          {vehicle && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("Avtomobil")}</span>
              <span className="font-semibold">{vehicle.plate}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("columnNo")}</span>
            <span>#{transaction.dispenserId}</span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("volume")}</span>
            <span className="font-semibold">
              {transaction.volumeM3.toFixed(3)} {t("cubicMeter")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("price")}</span>
            <span>
              {transaction.priceAtStart.toLocaleString()}
              {t("somPerCubicMeter")}
            </span>
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-base">
            <span className="font-semibold">{t("Jami")}</span>
            <span className="font-bold">
              {transaction.amountSum.toLocaleString()} {t("som")}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("paymentMethod")}</span>
            <span className="uppercase">{t(payment.method)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("To'landi")}</span>
            <span className="font-semibold">
              {payment.paidSum.toLocaleString()} {t("som")}
            </span>
          </div>
          {payment.paidSum > transaction.amountSum && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">{t("Qaytim")}</span>
              <span className="font-semibold">
                {(payment.paidSum - transaction.amountSum).toLocaleString()}
                {t("som")}
              </span>
            </div>
          )}
        </div>

        <Separator />

        <div className="text-center text-xs text-muted-foreground">
          <p>{t("Xaridingiz uchun rahmat!")}</p>
          <p className="mt-1">
            <Phone className="w-4 h-4" />
            <span>+998 71 123 45 67</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
