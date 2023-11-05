import express from "express";
import mongoose from "mongoose";
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'

mongoose
  .connect(
    "mongodb+srv://sahand:sahand@mern-estate.szepsdq.mongodb.net/mern-estate?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connect MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json())

app.listen(3000, () => {
  console.log("Server running 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Ошибка на сервере'
	return res.status(statusCode).json({
		success: false,
		statusCode,
		message,
	})
})