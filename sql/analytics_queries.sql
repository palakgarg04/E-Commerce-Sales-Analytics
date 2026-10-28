USE ecommerce_analytics;

SELECT ROUND(SUM(sales),2) total_sales FROM orders WHERE order_status<>'Cancelled';
SELECT ROUND(SUM(profit),2) total_profit FROM orders WHERE order_status<>'Cancelled';
SELECT COUNT(DISTINCT order_id) total_orders FROM orders WHERE order_status<>'Cancelled';
SELECT COUNT(DISTINCT customer_id) total_customers FROM orders WHERE order_status<>'Cancelled';
SELECT ROUND(SUM(sales)/COUNT(DISTINCT order_id),2) average_order_value FROM orders WHERE order_status<>'Cancelled';

SELECT category,ROUND(SUM(sales),2) sales,ROUND(SUM(profit),2) profit
FROM orders WHERE order_status<>'Cancelled' GROUP BY category ORDER BY sales DESC;

SELECT region,ROUND(SUM(sales),2) sales,ROUND(SUM(profit),2) profit
FROM orders WHERE order_status<>'Cancelled' GROUP BY region ORDER BY sales DESC;

SELECT DATE_FORMAT(order_date,'%Y-%m') month,ROUND(SUM(sales),2) sales,ROUND(SUM(profit),2) profit
FROM orders WHERE order_status<>'Cancelled' GROUP BY DATE_FORMAT(order_date,'%Y-%m') ORDER BY month;

SELECT product_name,SUM(quantity) units_sold,ROUND(SUM(sales),2) sales,ROUND(SUM(profit),2) profit
FROM orders WHERE order_status<>'Cancelled' GROUP BY product_name ORDER BY sales DESC LIMIT 10;

SELECT payment_method,COUNT(DISTINCT order_id) orders,ROUND(SUM(sales),2) sales
FROM orders WHERE order_status<>'Cancelled' GROUP BY payment_method ORDER BY sales DESC;

SELECT customer_id,ROUND(SUM(sales),2) total_spend,COUNT(DISTINCT order_id) orders
FROM orders WHERE order_status<>'Cancelled' GROUP BY customer_id ORDER BY total_spend DESC;

SELECT category,ROUND(SUM(profit)/NULLIF(SUM(sales),0)*100,2) profit_margin_pct
FROM orders WHERE order_status<>'Cancelled' GROUP BY category ORDER BY profit_margin_pct DESC;

SELECT city,ROUND(SUM(sales),2) sales
FROM orders WHERE order_status<>'Cancelled' GROUP BY city ORDER BY sales DESC LIMIT 20;

SELECT ROUND(discount,0) discount_pct,ROUND(AVG(profit),2) avg_profit,ROUND(SUM(sales),2) sales
FROM orders WHERE order_status<>'Cancelled' GROUP BY ROUND(discount,0) ORDER BY discount_pct;
