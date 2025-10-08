export type DispenserStatus =
  | "disconnected"
  | "idle"
  | "filling"
  | "finishing"
  | "emergency";

export type TransactionStatus =
  | "pending"
  | "filling"
  | "finished"
  | "paid"
  | "canceled"
  | "error";

export type PaymentMethod = "cash" | "card" | "other";

export type UserRole = "admin" | "operator" | "accountant" | "technician";

export interface Dispenser {
  id: string;
  stationId: string;
  number: number;
  status: DispenserStatus;
  currentPrice: number;
  temperature?: number;
  pressure?: number;
  lastHeartbeat: Date;
}

export interface Transaction {
  id: string;
  dispenserId: string;
  vehicleId?: string;
  plate?: string;
  startTime: Date;
  endTime?: Date;
  volumeM3: number;
  priceAtStart: number;
  amountSum: number;
  status: TransactionStatus;
  operatorId: string;
  meterStart?: number;
  meterEnd?: number;
}

export interface Vehicle {
  id: string;
  plate: string;
  make?: string;
  model?: string;
  year?: number;
  color?: string;
  fuelType?: string;
  passportStatus: "valid" | "expired";
  techInspectionStatus: "valid" | "expired";
  lastCheckAt?: Date;
}

export interface Payment {
  id: string;
  transactionId: string;
  method: PaymentMethod;
  paidSum: number;
  time: Date;
  externalRef?: string;
}

export interface User {
  id: string;
  fio: string;
  role: UserRole;
  login: string;
  status: "active" | "inactive";
}

export interface Shift {
  id: string;
  operatorId: string;
  stationId: string;
  openedAt: Date;
  closedAt?: Date;
  openingBalanceCash: number;
  openingBalanceCard: number;
  cashTotal?: number;
  cardTotal?: number;
  difference?: number;
  notes?: string;
}

export interface Operation {
  transaction: Transaction;
  vehicle: Vehicle;
  dispenser: Dispenser;
}
