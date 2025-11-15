import { z } from 'zod';
import { MAX_PAYMENT_AMOUNT, MIN_PAYMENT_AMOUNT } from './constants';

export const quickPaySchema = z.object({
  provider: z.string().min(1, 'Provider is required'),
  amount: z
    .number({ invalid_type_error: 'Enter a valid amount' })
    .min(MIN_PAYMENT_AMOUNT, `Minimum amount is ₦${MIN_PAYMENT_AMOUNT}`)
    .max(MAX_PAYMENT_AMOUNT, `Maximum amount is ₦${MAX_PAYMENT_AMOUNT}`),
  methodId: z.string().min(1, 'Select a payment method'),
  memo: z.string().optional()
});

export const addBillDetailsSchema = z.object({
  accountRef: z
    .string()
    .min(10, 'Account reference must be at least 10 characters')
    .max(13, 'Account reference must be at most 13 characters'),
  phone: z
    .string()
    .regex(/^0\d{10}$/, 'Enter a valid Nigerian phone number')
    .optional(),
  amount: z
    .number({ invalid_type_error: 'Enter a valid amount' })
    .min(MIN_PAYMENT_AMOUNT, `Minimum amount is ₦${MIN_PAYMENT_AMOUNT}`)
});

export const pinSchema = z.object({
  pin: z.string().length(4, 'PIN must be 4 digits')
});

export type QuickPayFormValues = z.infer<typeof quickPaySchema>;
export type AddBillDetailsFormValues = z.infer<typeof addBillDetailsSchema>;
export type PinFormValues = z.infer<typeof pinSchema>;
