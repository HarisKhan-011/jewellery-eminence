const { secret } = require("../config/secret");

const mutatingMethods = new Set(["POST", "PUT", "PATCH", "DELETE"]);
const developmentOrigins =
  secret.env === "production"
    ? []
    : [
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:3002",
        "http://localhost:5000",
      ];
const allowedOrigins = Array.from(
  new Set([secret.client_url, secret.admin_url, ...developmentOrigins].filter(Boolean))
);
const requestBuckets = new Map();

const securityHeaders = (req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );
  res.setHeader("X-XSS-Protection", "0");

  if (req.secure || req.headers["x-forwarded-proto"] === "https") {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains"
    );
  }

  next();
};

const originGuard = (req, res, next) => {
  if (!allowedOrigins.length || !mutatingMethods.has(req.method)) {
    return next();
  }

  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    return next();
  }

  return res.status(403).json({
    success: false,
    message: "Request origin is not allowed.",
  });
};

const rateLimit = ({ windowMs = 60 * 1000, max = 80 } = {}) => {
  return (req, res, next) => {
    const now = Date.now();
    const key = `${req.ip}:${req.baseUrl || req.path}`;
    const bucket = requestBuckets.get(key) || {
      count: 0,
      resetAt: now + windowMs,
    };

    if (bucket.resetAt <= now) {
      bucket.count = 0;
      bucket.resetAt = now + windowMs;
    }

    bucket.count += 1;
    requestBuckets.set(key, bucket);

    if (bucket.count > max) {
      return res.status(429).json({
        success: false,
        message: "Too many requests. Please try again shortly.",
      });
    }

    return next();
  };
};

const hasUnsafeObjectKey = (value) => {
  if (!value || typeof value !== "object") return false;

  if (Array.isArray(value)) {
    return value.some(hasUnsafeObjectKey);
  }

  return Object.keys(value).some(
    (key) =>
      key.startsWith("$") ||
      key.includes(".") ||
      hasUnsafeObjectKey(value[key])
  );
};

const noSqlInjectionGuard = (req, res, next) => {
  if (hasUnsafeObjectKey(req.body) || hasUnsafeObjectKey(req.query)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request payload.",
    });
  }

  return next();
};

module.exports = {
  noSqlInjectionGuard,
  originGuard,
  rateLimit,
  securityHeaders,
};
