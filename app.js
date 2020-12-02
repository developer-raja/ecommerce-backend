require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripepayment");
const paymentRoutes = require("./routes/paymentRoute");

//DB connection
const url = process.env.URL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected.."))
  .catch((err) => console.log("Error:" + err));

//Middlewares

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//Myroutes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
app.use("/api", paymentRoutes);

//Port
const port = process.env.PORT || 8000;

//Listen
app.listen(port, () => console.log(`App is running at ${port}`));
