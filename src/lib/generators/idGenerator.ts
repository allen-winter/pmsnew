// lib/generators/idGenerator.ts

import { prisma } from "@/lib/db/prisma";

// ==================== HELPER FUNCTIONS ====================

/**
 * Get current date in YYYYMMDD format
 */
function getCurrentDateYYYYMMDD(): string {
  const today = new Date();
  return today.toISOString().slice(0, 10).replace(/-/g, "");
}

/**
 * Get current date in YYMMDD format (for shorter IDs)
 */
function getCurrentDateYYMMDD(): string {
  const today = new Date();
  const yy = today.getFullYear().toString().slice(-2);
  const mm = (today.getMonth() + 1).toString().padStart(2, "0");
  const dd = today.getDate().toString().padStart(2, "0");
  return `${yy}${mm}${dd}`;
}

/**
 * Generate random numeric string of given length
 */
function randomNumeric(length: number): string {
  return Math.floor(Math.random() * Math.pow(10, length))
    .toString()
    .padStart(length, "0");
}

/**
 * Generate random alphanumeric string
 */
function randomAlphanumeric(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// ==================== PATIENT IDs ====================

/**
 * Generate Patient Display ID: PAT + YYYYMMDD + 6-digit sequence
 * Example: PAT20260416000001
 */
export async function generatePatientDisplayId(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `PAT${yyyymmdd}`;

  const lastPatient = await prisma.patient.findFirst({
    where: { patientDisplayId: { startsWith: prefix } },
    orderBy: { patientDisplayId: "desc" },
    select: { patientDisplayId: true },
  });

  let sequence = 1;
  if (lastPatient?.patientDisplayId) {
    const lastSeq = parseInt(lastPatient.patientDisplayId.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

/**
 * Generate Family ID: FAM + YYYYMMDD + 4-digit sequence
 * Example: FAM202604160001
 */
export async function generateFamilyId(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `FAM${yyyymmdd}`;

  const lastPatient = await prisma.patient.findFirst({
    where: { familyId: { startsWith: prefix } },
    orderBy: { familyId: "desc" },
    select: { familyId: true },
  });

  let sequence = 1;
  if (lastPatient?.familyId) {
    const lastSeq = parseInt(lastPatient.familyId.slice(-4));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(4, "0")}`;
}

// ==================== DOCTOR IDs ====================

/**
 * Generate Doctor Display ID: DOC + YYYYMMDD + 4-digit sequence
 * Example: DOC202604160001
 */
export async function generateDoctorDisplayId(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `DOC${yyyymmdd}`;

  const lastDoctor = await prisma.doctor.findFirst({
    where: { doctorDisplayId: { startsWith: prefix } },
    orderBy: { doctorDisplayId: "desc" },
    select: { doctorDisplayId: true },
  });

  let sequence = 1;
  if (lastDoctor?.doctorDisplayId) {
    const lastSeq = parseInt(lastDoctor.doctorDisplayId.slice(-4));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(4, "0")}`;
}

// ==================== PRACTICE IDs ====================

/**
 * Generate Practice Display ID: PRC + YYYYMMDD + 4-digit sequence
 * Example: PRC202604160001
 */
export async function generatePracticeDisplayId(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `PRC${yyyymmdd}`;

  const lastPractice = await prisma.practice.findFirst({
    where: { practiceDisplayId: { startsWith: prefix } },
    orderBy: { practiceDisplayId: "desc" },
    select: { practiceDisplayId: true },
  });

  let sequence = 1;
  if (lastPractice?.practiceDisplayId) {
    const lastSeq = parseInt(lastPractice.practiceDisplayId.slice(-4));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(4, "0")}`;
}

// ==================== APPOINTMENT IDs ====================

/**
 * Generate Appointment Display ID: APT + YYMMDD + HHMM + 4-digit sequence
 * Example: APT25041609300001
 */
export async function generateAppointmentDisplayId(
  date: Date,
  timeSlot: string,
): Promise<string> {
  const yymmdd = getCurrentDateYYMMDD();
  const hhmm = timeSlot.replace(":", "");
  const prefix = `APT${yymmdd}${hhmm}`;

  const lastAppointment = await prisma.appointment.findFirst({
    where: { appointmentDisplayId: { startsWith: prefix } },
    orderBy: { appointmentDisplayId: "desc" },
    select: { appointmentDisplayId: true },
  });

  let sequence = 1;
  if (lastAppointment?.appointmentDisplayId) {
    const lastSeq = parseInt(lastAppointment.appointmentDisplayId.slice(-4));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(4, "0")}`;
}

// ==================== BILL IDs ====================

/**
 * Generate Bill Number: BILL + YYYYMMDD + 6-digit sequence
 * Example: BILL20260416000001
 */
export async function generateBillNumber(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `BILL${yyyymmdd}`;

  const lastBill = await prisma.bill.findFirst({
    where: { billNumber: { startsWith: prefix } },
    orderBy: { billNumber: "desc" },
    select: { billNumber: true },
  });

  let sequence = 1;
  if (lastBill?.billNumber) {
    const lastSeq = parseInt(lastBill.billNumber.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

// ==================== CLAIM IDs ====================

/**
 * Generate Claim Number: CLM + YYYYMMDD + 6-digit sequence
 * Example: CLM20260416000001
 */
export async function generateClaimNumber(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `CLM${yyyymmdd}`;

  const lastClaim = await prisma.claim.findFirst({
    where: { claimNumber: { startsWith: prefix } },
    orderBy: { claimNumber: "desc" },
    select: { claimNumber: true },
  });

  let sequence = 1;
  if (lastClaim?.claimNumber) {
    const lastSeq = parseInt(lastClaim.claimNumber.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

// ==================== PRESCRIPTION IDs ====================

/**
 * Generate Prescription Number: RX + YYYYMMDD + 6-digit sequence
 * Example: RX20260416000001
 */
export async function generatePrescriptionNumber(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `RX${yyyymmdd}`;

  const lastPrescription = await prisma.prescription.findFirst({
    where: { prescriptionNo: { startsWith: prefix } },
    orderBy: { prescriptionNo: "desc" },
    select: { prescriptionNo: true },
  });

  let sequence = 1;
  if (lastPrescription?.prescriptionNo) {
    const lastSeq = parseInt(lastPrescription.prescriptionNo.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

// ==================== REFERRAL IDs ====================

/**
 * Generate Referral Display ID: REF + YYYYMMDD + 6-digit sequence
 * Example: REF20260416000001
 */
export async function generateReferralDisplayId(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `REF${yyyymmdd}`;

  const lastReferral = await prisma.referral.findFirst({
    where: { referralDisplayId: { startsWith: prefix } },
    orderBy: { referralDisplayId: "desc" },
    select: { referralDisplayId: true },
  });

  let sequence = 1;
  if (lastReferral?.referralDisplayId) {
    const lastSeq = parseInt(lastReferral.referralDisplayId.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

// ==================== STOCK IDs ====================

/**
 * Generate Product Code: PROD + YYYYMMDD + 6-digit sequence
 * Example: PROD20260416000001
 */
export async function generateProductCode(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `PROD${yyyymmdd}`;

  const lastProduct = await prisma.product.findFirst({
    where: { productCode: { startsWith: prefix } },
    orderBy: { productCode: "desc" },
    select: { productCode: true },
  });

  let sequence = 1;
  if (lastProduct?.productCode) {
    const lastSeq = parseInt(lastProduct.productCode.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

/**
 * Generate Supplier Code: SUP + YYYYMMDD + 4-digit sequence
 * Example: SUP202604160001
 */
export async function generateSupplierCode(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `SUP${yyyymmdd}`;

  const lastSupplier = await prisma.supplier.findFirst({
    where: { supplierCode: { startsWith: prefix } },
    orderBy: { supplierCode: "desc" },
    select: { supplierCode: true },
  });

  let sequence = 1;
  if (lastSupplier?.supplierCode) {
    const lastSeq = parseInt(lastSupplier.supplierCode.slice(-4));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(4, "0")}`;
}

/**
 * Generate Purchase Order Number: PO + YYYYMMDD + 6-digit sequence
 * Example: PO20260416000001
 */
export async function generatePurchaseOrderNumber(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `PO${yyyymmdd}`;

  const lastOrder = await prisma.purchaseOrder.findFirst({
    where: { poNumber: { startsWith: prefix } },
    orderBy: { poNumber: "desc" },
    select: { poNumber: true },
  });

  let sequence = 1;
  if (lastOrder?.poNumber) {
    const lastSeq = parseInt(lastOrder.poNumber.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

/**
 * Generate Transfer Number: TRF + YYYYMMDD + 6-digit sequence
 * Example: TRF20260416000001
 */
export async function generateTransferNumber(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `TRF${yyyymmdd}`;

  const lastTransfer = await prisma.stockTransfer.findFirst({
    where: { transferNumber: { startsWith: prefix } },
    orderBy: { transferNumber: "desc" },
    select: { transferNumber: true },
  });

  let sequence = 1;
  if (lastTransfer?.transferNumber) {
    const lastSeq = parseInt(lastTransfer.transferNumber.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

/**
 * Generate Adjustment Number: ADJ + YYYYMMDD + 6-digit sequence
 * Example: ADJ20260416000001
 */
export async function generateAdjustmentNumber(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `ADJ${yyyymmdd}`;

  const lastAdjustment = await prisma.stockAdjustment.findFirst({
    where: { adjustmentNumber: { startsWith: prefix } },
    orderBy: { adjustmentNumber: "desc" },
    select: { adjustmentNumber: true },
  });

  let sequence = 1;
  if (lastAdjustment?.adjustmentNumber) {
    const lastSeq = parseInt(lastAdjustment.adjustmentNumber.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

/**
 * Generate GRN Number: GRN + YYYYMMDD + 6-digit sequence
 * Example: GRN20260416000001
 */
export async function generateGrnNumber(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `GRN${yyyymmdd}`;

  const lastGrn = await prisma.goodsReceiptNote.findFirst({
    where: { grnNumber: { startsWith: prefix } },
    orderBy: { grnNumber: "desc" },
    select: { grnNumber: true },
  });

  let sequence = 1;
  if (lastGrn?.grnNumber) {
    const lastSeq = parseInt(lastGrn.grnNumber.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

// ==================== ERA IDs ====================

/**
 * Generate ERA Number: ERA + YYYYMMDD + 6-digit sequence
 * Example: ERA20260416000001
 */
export async function generateEraNumber(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const prefix = `ERA${yyyymmdd}`;

  const lastEra = await prisma.era.findFirst({
    where: { eraNumber: { startsWith: prefix } },
    orderBy: { eraNumber: "desc" },
    select: { eraNumber: true },
  });

  let sequence = 1;
  if (lastEra?.eraNumber) {
    const lastSeq = parseInt(lastEra.eraNumber.slice(-6));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(6, "0")}`;
}

// ==================== TRANSACTION IDs (MediKredit) ====================

/**
 * Generate Internal Claim Number (tx_nbr) for MediKredit
 * Format: TXN + YYYYMMDDHHMMSS + 4-digit random
 * Example: TXN202604161430251234
 */
export async function generateInternalClaimNumber(): Promise<string> {
  const now = new Date();
  const yyyymmddhhmmss = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace("T", "")
    .slice(0, 14);
  const random = randomNumeric(4);
  return `TXN${yyyymmddhhmmss}${random}`;
}

/**
 * Generate Transaction ID for internal tracking
 * Format: TRX + YYYYMMDDHHMMSS + 4-digit random
 * Example: TRX202604161430251234
 */
export async function generateTransactionId(): Promise<string> {
  const now = new Date();
  const yyyymmddhhmmss = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace("T", "")
    .slice(0, 14);
  const random = randomNumeric(4);
  return `TRX${yyyymmddhhmmss}${random}`;
}

// ==================== INVITE IDs ====================

/**
 * Generate Invite Token
 * Format: INV + YYYYMMDD + 8-digit random + 4-digit sequence
 * Example: INV20260416ABCD12340001
 */
export async function generateInviteToken(): Promise<string> {
  const yyyymmdd = getCurrentDateYYYYMMDD();
  const random = randomAlphanumeric(8);
  const prefix = `INV${yyyymmdd}${random}`;

  const lastInvite = await prisma.invite.findFirst({
    where: { token: { startsWith: prefix } },
    orderBy: { token: "desc" },
    select: { token: true },
  });

  let sequence = 1;
  if (lastInvite?.token) {
    const lastSeq = parseInt(lastInvite.token.slice(-4));
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(4, "0")}`;
}

// ==================== AUDIT IDs ====================

/**
 * Generate Audit Log ID
 * Format: AUD + YYYYMMDDHHMMSS + 6-digit random
 * Example: AUD20260416143025123456
 */
export async function generateAuditLogId(): Promise<string> {
  const now = new Date();
  const yyyymmddhhmmss = now
    .toISOString()
    .replace(/[-:]/g, "")
    .replace("T", "")
    .slice(0, 14);
  const random = randomNumeric(6);
  return `AUD${yyyymmddhhmmss}${random}`;
}

// ==================== EXPORT ALL GENERATORS ====================

export const idGenerator = {
  // Patient & Family
  patientDisplayId: generatePatientDisplayId,
  familyId: generateFamilyId,

  // Doctor & Practice
  doctorDisplayId: generateDoctorDisplayId,
  practiceDisplayId: generatePracticeDisplayId,

  // Appointments
  appointmentDisplayId: generateAppointmentDisplayId,

  // Billing
  billNumber: generateBillNumber,
  claimNumber: generateClaimNumber,

  // Prescriptions & Referrals
  prescriptionNumber: generatePrescriptionNumber,
  referralDisplayId: generateReferralDisplayId,

  // Stock Management
  productCode: generateProductCode,
  supplierCode: generateSupplierCode,
  purchaseOrderNumber: generatePurchaseOrderNumber,
  transferNumber: generateTransferNumber,
  adjustmentNumber: generateAdjustmentNumber,
  grnNumber: generateGrnNumber,

  // ERA
  eraNumber: generateEraNumber,

  // Transactions
  internalClaimNumber: generateInternalClaimNumber,
  transactionId: generateTransactionId,

  // Other
  inviteToken: generateInviteToken,
  auditLogId: generateAuditLogId,
};

// ==================== USAGE EXAMPLES ====================

/*
// Patient creation
const patientDisplayId = await generatePatientDisplayId();
const familyId = await generateFamilyId();

// Bill creation
const billNumber = await generateBillNumber();

// Claim submission to MediKredit
const claimNumber = await generateClaimNumber();
const txNbr = await generateInternalClaimNumber(); // This goes in tx_nbr field

// Prescription
const prescriptionNo = await generatePrescriptionNumber();

// Stock purchase order
const poNumber = await generatePurchaseOrderNumber();

// ERA file processing
const eraNumber = await generateEraNumber();

// Using the grouped export
import { idGenerator } from "@/lib/generators/idGenerator";
const newBillNumber = await idGenerator.billNumber();
*/
