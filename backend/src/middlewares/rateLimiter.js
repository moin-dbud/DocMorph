import rateLimit from "express-rate-limit";

/**
 * General limiter (safe defaults)
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,                // 100 requests
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Conversion limiter (strict)
 */
export const convertLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 10,                 // 10 conversions
  message: {
    message: "Too many conversions. Please wait before trying again.",
  },
});

/**
 * Payment limiter
 */
export const paymentLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: {
    message: "Too many payment attempts. Please try later.",
  },
});

/**
 * Contact form limiter
 */
export const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: {
    message: "Too many messages sent. Please try again later.",
  },
});
