const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;
const requestBuckets = new Map();

const rateLimit = (req, res, next) => {
  const key = req.userId || req.ip || 'anonymous';
  const now = Date.now();
  const existingBucket = requestBuckets.get(key);

  if (!existingBucket || existingBucket.resetAt <= now) {
    requestBuckets.set(key, {
      count: 1,
      resetAt: now + WINDOW_MS
    });
    return next();
  }

  if (existingBucket.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      message: 'Too many agent task requests. Please try again shortly.'
    });
  }

  existingBucket.count += 1;
  return next();
};

module.exports = { rateLimit };
