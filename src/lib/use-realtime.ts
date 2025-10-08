"use client";

import { useState, useEffect } from "react";
import type { Dispenser } from "./types";

// Simulated real-time updates
export function useRealtimeDispensers(initialDispensers: Dispenser[]) {
  const [dispensers, setDispensers] = useState(initialDispensers);

  useEffect(() => {
    // Simulate real-time updates every 2 seconds
    const interval = setInterval(() => {
      setDispensers((prev) =>
        prev.map((dispenser) => {
          if (dispenser.status === "filling") {
            // Simulate temperature and pressure fluctuations
            return {
              ...dispenser,
              temperature: dispenser.temperature
                ? Math.round(
                    (dispenser.temperature + (Math.random() - 0.5) * 2) * 10
                  ) / 10
                : undefined,
              pressure: dispenser.pressure
                ? Math.round(
                    (dispenser.pressure + (Math.random() - 0.5) * 5) * 10
                  ) / 10
                : undefined,
              lastHeartbeat: new Date(),
            };
          }
          return dispenser;
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return { dispensers, setDispensers };
}

export function useRealtimeTransaction(dispenserId: string) {
  const [volume, setVolume] = useState(0);
  const [amount, setAmount] = useState(0);
  const price = 5200; // Current price per m³

  useEffect(() => {
    // Simulate volume increase during filling
    const interval = setInterval(() => {
      setVolume((prev) => {
        const newVolume = prev + Math.random() * 0.5;
        setAmount(Math.round(newVolume * price));
        return Math.round(newVolume * 100) / 100;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [dispenserId]);

  return { volume, amount, price };
}
