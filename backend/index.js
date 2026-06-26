// external
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const globalErrorHandler = require("./middleware/global-error-handler");
const {
  noSqlInjectionGuard,
  originGuard,
  rateLimit,
  securityHeaders,
} = require("./middleware/security");
// internal
const ConnectDb = require("./config/db");
const { secret } = require("./config/secret");
const categoryRoutes = require("./routes/categoryRoutes");
const productsRoutes = require("./routes/productRoute");
const couponRoutes = require("./routes/couponRoute");
const userRoute = require("./routes/userRoute");
const orderRouter = require("./routes/orderRoute");
const userOrderRoute = require("./routes/userOrderRoute");
const cloudinaryRoutes = require("./routes/cloudinaryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const brandRoutes = require("./routes/brandRoutes");

// app init
const app = express();

// middleware
app.disable("x-powered-by");
app.use(securityHeaders);
app.use(express.json({ limit: "1mb" }));
app.use(cors());
app.use(originGuard);
app.use(noSqlInjectionGuard);
app.use("/api/order", rateLimit({ windowMs: 60 * 1000, max: 45 }));
app.use("/uploads", express.static(path.join(__dirname, "public", "uploads")));

// routes
app.use("/api/products", productsRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/brand", brandRoutes);
app.use('/api/coupon', couponRoutes);
app.use('/api/user', userRoute);
app.use('/api/order', orderRouter);
app.use('/api/user-order', userOrderRoute);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use("/api/admin", adminRoutes);

// root route
app.get("/", (req, res) => res.send("Apps worked successfully"));

const PORT = secret.port || 5000;

// global error handler
app.use(globalErrorHandler);
//* handle not found
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

ConnectDb()
  .then(() => {
    app.listen(PORT, () => console.log(`server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('server failed to start because mongodb is not connected:', err.message);
    process.exit(1);
  });
