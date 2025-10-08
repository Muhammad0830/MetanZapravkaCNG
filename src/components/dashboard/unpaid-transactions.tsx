"use client";

import type { Transaction, Vehicle } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleDollarSign } from "lucide-react";
import { useTranslations } from "next-intl";

interface UnpaidTransactionsProps {
  transactions: Transaction[];
  vehicles: Vehicle[];
  onPay: (transactionId: string) => void;
}

export function UnpaidTransactions({
  transactions,
  vehicles,
  onPay,
}: UnpaidTransactionsProps) {
  const t = useTranslations("Dashboard");
  const unpaidTransactions = transactions.filter(
    (tx) => tx.status === "finished"
  );

  if (unpaidTransactions.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-2 mb-2 text-black dark:text-white">
        <CircleDollarSign className="h-6 w-6" />
        <h1 className="md:text-xl text-lg font-semibold">
          {t("Unpaid operations")}
        </h1>
      </div>
      <div className="border border-black dark:border-white rounded-md overflow-hidden bg-white dark:bg-background-secondary text-black dark:text-white">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-primary/15">
              <TableHead className="text-black dark:text-white text-center">
                {t("columnNo")}
              </TableHead>
              <TableHead className="text-black dark:text-white text-center">
                {t("plateNumber")}
              </TableHead>
              <TableHead className="text-black dark:text-white text-center">
                {t("volume")}
              </TableHead>
              <TableHead className="text-black dark:text-white text-center">
                {t("amount")}
              </TableHead>
              <TableHead className="text-black dark:text-white text-center">
                {t("actions")}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {unpaidTransactions.map((tx) => {
              const vehicle = vehicles.find((v) => v.plate === tx.plate);
              return (
                <TableRow
                  key={tx.id}
                  className="hover:bg-primary/15 text-center"
                >
                  <TableCell className="font-medium ">
                    #{tx.dispenserId}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{tx.plate}</div>
                      {vehicle && (
                        <div className="text-xs text-muted-foreground">
                          {vehicle.make} {vehicle.model}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    {tx.volumeM3.toFixed(2)} {t("cubicMeter")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className="bg-primary/30 font-bold"
                    >
                      {tx.amountSum.toLocaleString()} {t("som")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => onPay(tx.id)}
                    >
                      {t("pay")}
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
