export type Locale = "pl" | "uk" | "ru" | "en";

export type PackageId = "basic" | "pro" | "partner";

export type Role = "client" | "manager" | "admin" | "partner";

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  locale: Locale;
  role: Role;
  packageId?: PackageId;
  packageStartedAt?: string;
  packageExpiresAt?: string;
  successfulPurchases: number;
  usedBidRequests: number;
  createdAt: string;
};

export type AccessPackage = {
  id: PackageId;
  highlight?: boolean;
  price?: { amount: number; currency: "PLN" | "EUR" | "USD" };
  durationDays?: number;
  includedSuccessfulPurchases?: number;
  bidRequestLimit?: number;
};

export type CourseMaterial = {
  id: string;
  type: "pdf" | "spreadsheet" | "doc" | "template";
  name: string;
};

export type Lesson = {
  id: string;
  moduleId: string;
  index: number;
  durationMinutes: number;
  videoUrl?: string;
  requiredBeforeBidRequest: boolean;
  materials?: CourseMaterial[];
};

export type CourseModule = {
  id: string;
  index: number;
  lessons: Lesson[];
};

export type CarSource = "copart" | "iaai" | "manheim" | "other";

export type CarStatus =
  | "saved"
  | "calculating"
  | "ready_for_bid_request"
  | "bid_request_submitted"
  | "manager_review"
  | "approved_for_bid"
  | "bid_lost"
  | "won"
  | "in_shipping"
  | "delivered"
  | "listed_auto_w_drodze"
  | "sold";

export type ClientCar = {
  id: string;
  userId: string;
  vin: string;
  make: string;
  model: string;
  year: number;
  auctionUrl?: string;
  source: CarSource;
  location?: string;
  currentBid?: number;
  maxBid?: number;
  images: string[];
  status: CarStatus;
  calculationId?: string;
  purchaseId?: string;
};

export type CalculatorInput = {
  carPrice: number;
  maxBid: number;
  auctionFee: number;
  brokerFee: number;
  shippingUS: number;
  oceanShipping: number;
  portFees: number;
  customs: number;
  excise: number;
  deliveryPl: number;
  repair: number;
  reserve: number;
};

export type CalculatorResult = {
  totalUsd: number;
  totalEur: number;
  totalPln: number;
  totalEstimated: number;
  maxSafeBidUsd: number;
};

export type BidRequestStatus =
  | "draft"
  | "submitted"
  | "manager_review"
  | "need_more_info"
  | "approved"
  | "rejected"
  | "bidding"
  | "lost"
  | "won";

export type BidRequest = {
  id: string;
  userId: string;
  carId: string;
  maxBid: number;
  currency: "USD" | "CAD";
  status: BidRequestStatus;
  riskAccepted: boolean;
  paymentReadinessAccepted: boolean;
  managerNote?: string;
  comment?: string;
  createdAt: string;
  updatedAt: string;
};

export type PurchaseStepStatus = "pending" | "current" | "completed" | "problem";

export type PurchaseTrackingStep = {
  index: number;
  status: PurchaseStepStatus;
  date?: string;
  note?: string;
};

export type DocumentFile = { id: string; name: string; url?: string; uploadedAt: string };
export type PhotoFile = { id: string; url: string; uploadedAt: string };
export type PaymentRecord = {
  id: string;
  amount: number;
  currency: "USD" | "EUR" | "PLN";
  status: "expected" | "paid";
  date?: string;
  label: string;
};

export type PurchaseTracking = {
  id: string;
  userId: string;
  carId: string;
  vin: string;
  currentStep: number;
  steps: PurchaseTrackingStep[];
  documents: DocumentFile[];
  photos: PhotoFile[];
  payments: PaymentRecord[];
};

export type ReferralStatus =
  | "invited"
  | "registered"
  | "paid"
  | "bonus_available"
  | "bonus_used";

export type Referral = {
  id: string;
  name?: string;
  email?: string;
  status: ReferralStatus;
  createdAt: string;
};

export type BiddersPower = {
  userId: string;
  referralCode: string;
  referralLink: string;
  powerBalance: number;
  availableDiscountPln: number;
  referrals: Referral[];
};

export type AutoWDrodzeCar = {
  id: string;
  carId: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  engine: string;
  damage: string;
  shippingStatus: string;
  etaDays: number;
  priceUsd: number;
  images: string[];
  vinMasked: string;
  publishedBy: "bidbidders" | "pro" | "partner";
};
