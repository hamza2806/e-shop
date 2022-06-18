const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const cors = require("cors");
const stripeRoute = require("./routes/stripe");

dotenv.config();


mongoose
    .connect(process.env.MONGO_DB_KEY)
    .then(console.log("DB succesfully connected"))
    .catch((err) => 
        {console.log(err);
    });

app.use(cors());
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT, () =>{
    console.log("backend server is running");
});

