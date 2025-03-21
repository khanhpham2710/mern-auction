import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from "dotenv"
import { connection } from "./database/connection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./router/userRoutes.js";
import auctionItemRouter from "./router/auctionItemRoutes.js";
import bidRouter from "./router/bidRoutes.js";
import commissionRouter from "./router/commissionRoutes.js";
import adminRouter from "./router/adminRoutes.js";
import { endedAuctionCron } from "./automation/endedAuctionCron.js";
import { verifyCommissionCron } from "./automation/verifyCommissionCron.js";
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
import messageRouter from "./router/messageRoutes.js"
import path from 'path';

const app = express();

dotenv.config()

app.use(
  cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


app.use("/api/v1/user", userRouter);
app.use("/api/v1/auctionitem", auctionItemRouter);
app.use("/api/v1/bid", bidRouter);
app.use("/api/v1/commission", commissionRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/message", messageRouter);
app.post("/api/v1/health", async (req,res) => {
  return res.status(401).json({
    message: "Up",
    error: false,
    success: true,
  });
})

endedAuctionCron();
verifyCommissionCron();
removeUnverifiedAccounts();
connection();
app.use(errorMiddleware);

const _dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(_dirname,"/frontend/dist")));
	app.use("*",(_,res) => {
        res.sendFile(path.resolve(_dirname, "frontend","dist","index.html"));
    });
}

export default app;