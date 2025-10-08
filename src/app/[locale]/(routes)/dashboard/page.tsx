"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { DispenserCard } from "@/components/dashboard/dispenser-card";
import { EmergencyBanner } from "@/components/dashboard/emergency-banner";
import { UnpaidTransactions } from "@/components/dashboard/unpaid-transactions";
import { PaymentDialog } from "@/components/payments/payment-dialog";
import {
  mockDispensers,
  mockTransactions,
  mockVehicles,
} from "@/lib/mock-data";
import { useRealtimeDispensers } from "@/lib/use-realtime";
import type { PaymentMethod, Transaction, Vehicle } from "@/lib/types";
import { AlertTriangle } from "lucide-react";

const Page = () => {
  const t = useTranslations("Dashboard");
  const { dispensers, setDispensers } = useRealtimeDispensers(mockDispensers);
  const [transactions] = useState<Transaction[]>(mockTransactions);
  const [vehicles] = useState(mockVehicles);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [selectedTransactionId, setSelectedTransactionId] = useState<
    string | null
  >(null);
  const [isEmergency, setIsEmergency] = useState(false);

  const handleStart = (dispenserId: string) => {
    console.log("Starting dispenser:", dispenserId);
    const dispenser = dispensers.find((d) => d.id === dispenserId);
    if (!dispenser) return;

    dispenser.status = "filling";
    const updatedDispensers = dispensers.map((d) =>
      d.id === dispenser.id ? dispenser : d
    );
    setDispensers(updatedDispensers);
  };

  const handleStop = (dispenserId: string) => {
    console.log("Stopping dispenser:", dispenserId);
    const dispenser = dispensers.find((d) => d.id === dispenserId);
    if (!dispenser) return;

    dispenser.status = "idle";
    const updatedDispensers = dispensers.map((d) =>
      d.id === dispenser.id ? dispenser : d
    );
    setDispensers(updatedDispensers);
    // TODO: Implement stop logic
  };

  const handleFullTank = (dispenserId: string) => {
    console.log("Full tank mode for dispenser:", dispenserId);
    const dispenser = dispensers.find((d) => d.id === dispenserId);
    if (!dispenser) return;

    dispenser.status = "filling";
    const updatedDispensers = dispensers.map((d) =>
      d.id === dispenser.id ? dispenser : d
    );
    setDispensers(updatedDispensers);
    // TODO: Implement full tank logic
  };

  const handleCancel = (dispenserId: string) => {
    console.log("Canceling transaction for dispenser:", dispenserId);
    const dispenser = dispensers.find((d) => d.id === dispenserId);
    if (!dispenser) return;

    dispenser.status = "idle";
    const updatedDispensers = dispensers.map((d) =>
      d.id === dispenser.id ? dispenser : d
    );
    setDispensers(updatedDispensers);
  };

  const handleEmergencyStop = () => {
    console.log("Emergency stop activated");
    setIsEmergency(true);
    setDispensers((prev) =>
      prev.map((dispenser) => ({
        ...dispenser,
        status: "idle",
      }))
    );
    // TODO: Implement emergency stop logic
  };

  const handlePay = (transactionId: string) => {
    console.log("Opening payment dialog for transaction:", transactionId);
    setSelectedTransactionId(transactionId);
    setPaymentDialogOpen(true);
  };

  const handlePaymentConfirm = (
    transactionId: string,
    method: PaymentMethod,
    paidSum: number
  ) => {
    console.log("Payment confirmed:", { transactionId, method, paidSum });
    // TODO: Implement payment confirmation logic
  };

  const selectedTransaction = transactions.find(
    (tx: Transaction) => tx.id === selectedTransactionId
  );
  const selectedVehicle = vehicles.find(
    (v: Vehicle) => v.plate === selectedTransaction?.plate
  );

  return (
    <div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-black dark:text-white">
            {t("Dashboard")}
          </h1>
          <button
            onClick={handleEmergencyStop}
            className="flex items-center gap-2 px-2 py-0.5 rounded-sm bg-red-600/60 group hover:bg-red-600/80 transition-colors duration-150 cursor-pointer"
          >
            <AlertTriangle className="w-5 h-5 dark:text-[#ff0000] text-[#a00000]" />
            <div className="text-black dark:text-white font-semibold">
              {t("emergencyStop")}
            </div>
          </button>
        </div>

        {isEmergency && <EmergencyBanner />}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {dispensers.map((dispenser, index) => {
            const transaction = transactions.find(
              (tx) => tx.dispenserId === dispenser.id && tx.status === "filling"
            );
            return (
              <DispenserCard
                key={index}
                dispenser={dispenser}
                transaction={transaction}
                onStart={() => handleStart(dispenser.id)}
                onStop={() => handleStop(dispenser.id)}
                onFullTank={() => handleFullTank(dispenser.id)}
                onCancel={() => handleCancel(dispenser.id)}
              />
            );
          })}
        </div>

        <UnpaidTransactions
          transactions={transactions}
          vehicles={vehicles}
          onPay={handlePay}
        />

        <PaymentDialog
          transaction={selectedTransaction || null}
          vehicle={selectedVehicle}
          open={paymentDialogOpen}
          onOpenChange={setPaymentDialogOpen}
          onConfirm={handlePaymentConfirm}
        />
      </div>
    </div>
  );
};

export default Page;
