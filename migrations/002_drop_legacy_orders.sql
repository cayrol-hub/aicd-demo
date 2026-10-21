-- The legacy orders were migrated to `orders` last quarter.
DROP TABLE orders_legacy;
ALTER TABLE orders DROP COLUMN legacy_ref;
ALTER TABLE orders ALTER COLUMN customer_id SET NOT NULL;
