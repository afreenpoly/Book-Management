import express, { response } from "express";
import { PORT } from "./config.js";

const app = express();

app.get("/",(req,res)=>{
    return res.send("Welcome")
})

app.listen(PORT, () => {
  console.log(`App is running at: ${PORT}`);
});
