const express=require("express");
const cors=require("cors");
require("dotenv").config();
const routes=require("./routes/analyticsRoutes");

const app=express();
const PORT=process.env.PORT||5000;
app.use(cors());
app.use(express.json());
app.get("/api/health",(req,res)=>res.json({status:"ok"}));
app.use("/api/analytics",routes);
app.listen(PORT,()=>console.log(`API running at http://localhost:${PORT}`));
