import { NextRequest, NextResponse } from "next/server";

// ==========================================
// 1. IN-MEMORY RATE LIMITER (SLIDING WINDOW)
// ==========================================
interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const ipRequestMap = new Map<string, RateLimitRecord>();

// Clean up expired records every 5 minutes to avoid memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipRequestMap.entries()) {
      if (now > record.resetAt) {
        ipRequestMap.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Checks if a client IP has exceeded the rate limit.
 * @param request NextRequest
 * @param maxRequests Maximum requests allowed within window (default 5)
 * @param windowMs Time window in milliseconds (default 10 minutes)
 */
export function checkRateLimit(
  request: NextRequest,
  maxRequests: number = 5,
  windowMs: number = 10 * 60 * 1000
): { allowed: boolean; remaining: number; resetInSec: number } {
  // Extract client IP (standard headers for Vercel, proxies, and localhost)
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const clientIp = (forwardedFor ? forwardedFor.split(",")[0] : realIp) || "127.0.0.1";

  const now = Date.now();
  const record = ipRequestMap.get(clientIp);

  if (!record || now > record.resetAt) {
    ipRequestMap.set(clientIp, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1, resetInSec: Math.ceil(windowMs / 1000) };
  }

  if (record.count >= maxRequests) {
    const resetInSec = Math.ceil((record.resetAt - now) / 1000);
    return { allowed: false, remaining: 0, resetInSec };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetInSec: Math.ceil((record.resetAt - now) / 1000),
  };
}

// ==========================================
// 2. HTML ESCAPING / XSS PREVENTION
// ==========================================
/**
 * Safely escapes user input to prevent HTML and email injection attacks.
 */
export function escapeHtml(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;")
    .replace(/\//g, "&#x2F;");
}

// ==========================================
// 3. INPUT VALIDATION & SANITIZATION
// ==========================================
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

export function isValidEmail(email: unknown): boolean {
  if (typeof email !== "string") return false;
  const trimmed = email.trim();
  return trimmed.length > 3 && trimmed.length <= 254 && EMAIL_REGEX.test(trimmed);
}

export function sanitizeText(val: unknown, maxLength: number = 500): string {
  if (typeof val !== "string") return "";
  // Strip null bytes and trim
  const cleaned = val.replace(/\0/g, "").trim();
  return escapeHtml(cleaned.slice(0, maxLength));
}

// ==========================================
// 4. ORIGIN / CSRF VALIDATION
// ==========================================
/**
 * Ensures POST requests originate from the same host to prevent cross-site request forgery.
 */
export function verifyOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");

  if (!origin || !host) {
    // If no origin header is provided (e.g. some mobile/same-origin fetches), allow it
    return true;
  }

  try {
    const originUrl = new URL(origin);
    // Allow localhost during development or matching host
    if (originUrl.host === host) return true;
    if (host.includes("localhost") || host.includes("127.0.0.1")) return true;
    return false;
  } catch {
    return false;
  }
}
