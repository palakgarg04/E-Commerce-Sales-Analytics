const a=require("../services/analyticsService");

exports.dashboard=async(req,res)=>{
  try{
    const [kpis,monthlySales,categorySales,regionSales,topProducts,paymentMethods,customers]=await Promise.all([
      a.getKpis(),a.getMonthlySales(),a.getCategorySales(),a.getRegionSales(),
      a.getTopProducts(10),a.getPaymentMethods(),a.getCustomers(10)
    ]);
    res.json({kpis,monthlySales,categorySales,regionSales,topProducts,paymentMethods,customers});
  }catch(e){res.status(500).json({message:"Unable to load analytics",error:e.message});}
};
exports.monthlySales=async(req,res)=>{try{res.json(await a.getMonthlySales())}catch(e){res.status(500).json({message:e.message})}};
exports.categorySales=async(req,res)=>{try{res.json(await a.getCategorySales())}catch(e){res.status(500).json({message:e.message})}};
exports.regionSales=async(req,res)=>{try{res.json(await a.getRegionSales())}catch(e){res.status(500).json({message:e.message})}};
exports.topProducts=async(req,res)=>{try{res.json(await a.getTopProducts(req.query.limit))}catch(e){res.status(500).json({message:e.message})}};
exports.paymentMethods=async(req,res)=>{try{res.json(await a.getPaymentMethods())}catch(e){res.status(500).json({message:e.message})}};
exports.customers=async(req,res)=>{try{res.json(await a.getCustomers(req.query.limit))}catch(e){res.status(500).json({message:e.message})}};
