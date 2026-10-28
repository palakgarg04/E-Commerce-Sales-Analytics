const db = require("../config/db");

async function getKpis() {
  const [rows] = await db.query(`
    SELECT COALESCE(SUM(sales),0) totalSales,
           COUNT(DISTINCT order_id) totalOrders,
           COALESCE(SUM(profit),0) totalProfit,
           COUNT(DISTINCT customer_id) totalCustomers,
           COALESCE(SUM(sales)/NULLIF(COUNT(DISTINCT order_id),0),0) averageOrderValue
    FROM orders WHERE order_status <> 'Cancelled'
  `);
  return rows[0];
}

async function getMonthlySales() {
  const [rows] = await db.query(`
    SELECT DATE_FORMAT(order_date,'%Y-%m') month,
           ROUND(SUM(sales),2) sales, ROUND(SUM(profit),2) profit
    FROM orders WHERE order_status <> 'Cancelled'
    GROUP BY DATE_FORMAT(order_date,'%Y-%m') ORDER BY month
  `);
  return rows;
}

async function getCategorySales() {
  const [rows] = await db.query(`
    SELECT category, ROUND(SUM(sales),2) sales, ROUND(SUM(profit),2) profit
    FROM orders WHERE order_status <> 'Cancelled'
    GROUP BY category ORDER BY sales DESC
  `);
  return rows;
}

async function getRegionSales() {
  const [rows] = await db.query(`
    SELECT region, ROUND(SUM(sales),2) sales, ROUND(SUM(profit),2) profit
    FROM orders WHERE order_status <> 'Cancelled'
    GROUP BY region ORDER BY sales DESC
  `);
  return rows;
}

async function getTopProducts(limit=10) {
  const safeLimit = Math.min(Math.max(parseInt(limit)||10,1),50);
  const [rows] = await db.query(`
    SELECT product_name, SUM(quantity) unitsSold,
           ROUND(SUM(sales),2) sales, ROUND(SUM(profit),2) profit
    FROM orders WHERE order_status <> 'Cancelled'
    GROUP BY product_name ORDER BY sales DESC LIMIT ?
  `,[safeLimit]);
  return rows;
}

async function getPaymentMethods() {
  const [rows] = await db.query(`
    SELECT payment_method, COUNT(DISTINCT order_id) orders,
           ROUND(SUM(sales),2) sales
    FROM orders WHERE order_status <> 'Cancelled'
    GROUP BY payment_method ORDER BY sales DESC
  `);
  return rows;
}

async function getCustomers(limit=10) {
  const safeLimit = Math.min(Math.max(parseInt(limit)||10,1),50);
  const [rows] = await db.query(`
    SELECT customer_id, COUNT(DISTINCT order_id) orders,
           ROUND(SUM(sales),2) totalSpent,
           ROUND(SUM(sales)/NULLIF(COUNT(DISTINCT order_id),0),2) averageOrderValue
    FROM orders WHERE order_status <> 'Cancelled'
    GROUP BY customer_id ORDER BY totalSpent DESC LIMIT ?
  `,[safeLimit]);
  return rows;
}

module.exports={getKpis,getMonthlySales,getCategorySales,getRegionSales,getTopProducts,getPaymentMethods,getCustomers};
