CREATE DATABASE IF NOT EXISTS ecommerce_analytics;
USE ecommerce_analytics;
DROP TABLE IF EXISTS orders;
CREATE TABLE orders(
 order_id VARCHAR(30) PRIMARY KEY,
 order_date DATE NOT NULL,
 customer_id VARCHAR(30) NOT NULL,
 product_id VARCHAR(30) NOT NULL,
 product_name VARCHAR(150) NOT NULL,
 category VARCHAR(80) NOT NULL,
 quantity INT NOT NULL,
 unit_price DECIMAL(12,2) NOT NULL,
 discount DECIMAL(5,2) NOT NULL DEFAULT 0,
 sales DECIMAL(14,2) NOT NULL,
 profit DECIMAL(14,2) NOT NULL,
 region VARCHAR(50) NOT NULL,
 city VARCHAR(80) NOT NULL,
 payment_method VARCHAR(50) NOT NULL,
 order_status VARCHAR(30) NOT NULL
);
CREATE INDEX idx_order_date ON orders(order_date);
CREATE INDEX idx_customer_id ON orders(customer_id);
CREATE INDEX idx_category ON orders(category);
CREATE INDEX idx_region ON orders(region);
