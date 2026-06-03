"use client";

import { create } from "zustand";
import {
  MOCK_USER,
  MOCK_CARS,
  MOCK_BID_REQUESTS,
  MOCK_PURCHASE,
  MOCK_BIDDERS_POWER,
} from "@/data/mock";
import type { BidRequest, ClientCar, User, BiddersPower, PurchaseTracking } from "@/types";

type DashboardState = {
  user: User;
  cars: ClientCar[];
  bidRequests: BidRequest[];
  purchase: PurchaseTracking | null;
  power: BiddersPower;
  completedLessonIds: Set<string>;
  markLessonComplete: (id: string) => void;
  addCar: (car: ClientCar) => void;
  addBidRequest: (req: BidRequest) => void;
};

export const useDashboard = create<DashboardState>((set) => ({
  user: MOCK_USER,
  cars: MOCK_CARS,
  bidRequests: MOCK_BID_REQUESTS,
  purchase: MOCK_PURCHASE,
  power: MOCK_BIDDERS_POWER,
  // Real lesson IDs from course.ts (PAID_LESSONS are l1..l15) — 6/15 ≈ 40% demo progress.
  completedLessonIds: new Set(["l1", "l2", "l3", "l4", "l5", "l6"]),
  markLessonComplete: (id) =>
    set((s) => {
      const next = new Set(s.completedLessonIds);
      next.add(id);
      return { completedLessonIds: next };
    }),
  addCar: (car) => set((s) => ({ cars: [car, ...s.cars] })),
  addBidRequest: (req) => set((s) => ({ bidRequests: [req, ...s.bidRequests] })),
}));
