"use client";

import { useState } from "react";
import type { Transaction, Vehicle, PaymentMethod } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Banknote, Printer } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface PaymentDialogProps {
  transaction: Transaction | null;
  vehicle?: Vehicle;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (
    transactionId: string,
    method: PaymentMethod,
    paidSum: number
  ) => void;
}

export function PaymentDialog({
  transaction,
  vehicle,
  open,
  onOpenChange,
  onConfirm,
}: PaymentDialogProps) {
  const t = useTranslations("Dashboard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [paidSum, setPaidSum] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  if (!transaction) return null;

  const handleConfirm = async () => {
    setIsProcessing(true);
    try {
      await onConfirm(
        transaction.id,
        paymentMethod,
        Number(paidSum) || transaction.amountSum
      );
      onOpenChange(false);
      setPaidSum("");
      setPaymentMethod("cash");
    } catch (error) {
      console.error("[v0] Payment error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePrint = () => {
    console.log("[v0] Printing receipt for transaction:", transaction.id);
    // TODO: Implement receipt printing
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-white dark:bg-black">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-black dark:text-white" />
            <span className="text-lg font-semibold text-black dark:text-white">
              {t("To'lov")}
            </span>
          </DialogTitle>
          <DialogDescription className="text-black dark:text-white">
            {t("To'lov ma'lumotlarini kiriting")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Transaction Summary */}
          <div className="rounded-lg border border-black/70 dark:border-white/70 bg-muted p-4">
            <div className="space-y-2">
              {vehicle && (
                <div className="flex justify-between text-sm">
                  <span className="text-black dark:text-white">
                    {t("Avtomobil")}
                  </span>
                  <span className="font-mono font-semibold text-black dark:text-white">
                    {vehicle.plate}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-black dark:text-white">
                  {t("volume")}
                </span>
                <span className="font-semibold text-black dark:text-white">
                  {transaction.volumeM3.toFixed(2)} {t("Kub metr")}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-black dark:text-white">{t("price")}</span>
                <span className="font-semibold text-black dark:text-white">
                  {transaction.priceAtStart.toLocaleString()}
                  {t("somPerCubicMeter")}
                </span>
              </div>
              <Separator className="my-2 bg-black dark:bg-white" />
              <div className="flex justify-between">
                <span className="font-semibold text-black dark:text-white">
                  {t("amount")}
                </span>
                <span className="text-xl font-bold text-black dark:text-white">
                  {transaction.amountSum.toLocaleString()} {t("som")}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <Label className="text-black dark:text-white">
              {t("paymentMethod")}
            </Label>
            <RadioGroup
              value={paymentMethod}
              onValueChange={(value) =>
                setPaymentMethod(value as PaymentMethod)
              }
            >
              <Label
                htmlFor="cash"
                className={cn(
                  "flex items-center space-x-2 cursor-pointer rounded-lg border border-border p-3 text-black dark:text-white bg-black/15 hover:bg-black/30 dark:bg-white/15 dark:hover:bg-white/30",
                  paymentMethod === "cash"
                    ? "border-black dark:border-white"
                    : "border-transparent"
                )}
              >
                <RadioGroupItem
                  value="cash"
                  id="cash"
                  className="border-black dark:border-white"
                />
                <Banknote className="h-4 w-4" />
                {t("cash")}
              </Label>
              <Label
                htmlFor="card"
                className={cn(
                  "flex items-center space-x-2 cursor-pointer rounded-lg border border-border p-3 text-black dark:text-white bg-black/15 hover:bg-black/30 dark:bg-white/15 dark:hover:bg-white/30",
                  paymentMethod === "card"
                    ? "border-black dark:border-white"
                    : "border-transparent"
                )}
              >
                <RadioGroupItem
                  value="card"
                  id="card"
                  className="border-black dark:border-white"
                />
                <CreditCard className="h-4 w-4" />
                {t("card")}
              </Label>
            </RadioGroup>
          </div>

          {/* Paid Amount */}
          <div className="space-y-2">
            <div className="flex">
              <Label
                htmlFor="paidSum"
                className="text-black dark:text-white text-sm"
              >
                {t("To'langan summa (ixtiyoriy)")} ({t("som")})
              </Label>
            </div>
            <Input
              id="paidSum"
              className="border-black dark:border-white text-black dark:text-white placeholder:text-black/70 dark:placeholder:text-white/70"
              placeholder={transaction.amountSum.toString()}
              value={paidSum}
              onChange={(e) => setPaidSum(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              {t("Bo'sh qoldirilsa, to'liq summa to'lanadi")}
            </p>
          </div>

          {/* Change Calculation */}
          {paidSum && Number(paidSum) > transaction.amountSum && (
            <div className="rounded-lg border border-green-500/20 bg-green-500/10 p-3">
              <div className="flex justify-between text-sm">
                <span className="text-green-600 dark:text-green-400">
                  {t("Qaytim")}
                </span>
                <span className="font-semibold text-green-600 dark:text-green-400">
                  {(Number(paidSum) - transaction.amountSum).toLocaleString()}
                  {t("som")}
                </span>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            onClick={handlePrint}
            disabled={isProcessing}
            className="cursor-pointer gap-2 font-semibold text-white dark:text-black bg-black dark:bg-white hover:bg-black dark:hover:bg-white"
          >
            <Printer className="h-4 w-4" />
            {t("printReceipt")}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="cursor-pointer font-semibold"
          >
            {isProcessing ? t("Yuklanmoqda") : t("confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
