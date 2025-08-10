// Simple in-memory rate limiter for development
// In production, use Redis or similar

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

export function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000 // 1 minute
): { success: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const key = identifier;
  
  // Clean up expired entries
  if (rateLimitStore.has(key)) {
    const entry = rateLimitStore.get(key)!;
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
  
  const entry = rateLimitStore.get(key) || { count: 0, resetTime: now + windowMs };
  
  if (entry.count >= limit) {
    return {
      success: false,
      remaining: 0,
      resetTime: entry.resetTime
    };
  }
  
  entry.count++;
  rateLimitStore.set(key, entry);
  
  return {
    success: true,
    remaining: limit - entry.count,
    resetTime: entry.resetTime
  };
}