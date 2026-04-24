const db = require('./config/db');

async function columnExists(tableName, columnName) {
  const [rows] = await db.query(
    `SELECT 1
     FROM information_schema.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
       AND COLUMN_NAME = ?
     LIMIT 1`,
    [tableName, columnName]
  );
  return rows.length > 0;
}

async function tableExists(tableName) {
  const [rows] = await db.query(
    `SELECT 1
     FROM information_schema.TABLES
     WHERE TABLE_SCHEMA = DATABASE()
       AND TABLE_NAME = ?
     LIMIT 1`,
    [tableName]
  );
  return rows.length > 0;
}

async function ensureColumn(tableName, columnName, columnDefSql) {
  const hasTable = await tableExists(tableName);
  if (!hasTable) {
    console.warn(`⚠️ Skipped ${tableName}.${columnName} (table missing)`);
    return;
  }
  const exists = await columnExists(tableName, columnName);
  if (exists) return;
  await db.query(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${columnDefSql}`);
  console.log(`✅ Added ${tableName}.${columnName}`);
}

async function ensureTable(tableName, createSql) {
  await db.query(createSql);
  console.log(`✅ Ensured table: ${tableName}`);
}

async function initializeDatabase() {
  console.log('🔧 Running automatic DB bootstrap...');

  // Review tables
  await ensureTable(
    'product_reviews',
    `CREATE TABLE IF NOT EXISTS product_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      user_id INT NOT NULL,
      rating INT NOT NULL,
      review_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_product_review (product_id, user_id),
      INDEX idx_product_id (product_id),
      INDEX idx_user_id (user_id)
    )`
  );

  await ensureTable(
    'shopkeeper_reviews',
    `CREATE TABLE IF NOT EXISTS shopkeeper_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      farmer_id INT NOT NULL,
      shopkeeper_id INT NOT NULL,
      rating INT NOT NULL,
      review_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_review (product_id, farmer_id),
      INDEX idx_product_id (product_id),
      INDEX idx_farmer_id (farmer_id),
      INDEX idx_shopkeeper_id (shopkeeper_id)
    )`
  );

  await ensureTable(
    'shopkeeper_product_reviews',
    `CREATE TABLE IF NOT EXISTS shopkeeper_product_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      shopkeeper_product_id INT NOT NULL,
      user_id INT NOT NULL,
      rating INT NOT NULL,
      review_text TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY unique_shopkeeper_product_review (shopkeeper_product_id, user_id),
      INDEX idx_shopkeeper_product_id (shopkeeper_product_id),
      INDEX idx_user_id (user_id)
    )`
  );

  // OTP-related columns
  await ensureColumn('farmers', 'reset_otp', 'VARCHAR(10) NULL');
  await ensureColumn('farmers', 'reset_otp_expiry', 'DATETIME NULL');
  await ensureColumn('shopkeepers', 'reset_otp', 'VARCHAR(10) NULL');
  await ensureColumn('shopkeepers', 'reset_otp_expiry', 'DATETIME NULL');

  // Shopkeeper profile / invoice columns
  await ensureColumn('shopkeepers', 'profile_picture', 'VARCHAR(255) DEFAULT NULL');
  await ensureColumn('shopkeepers', 'bank_name', 'VARCHAR(100) NULL');
  await ensureColumn('shopkeepers', 'bank_account_number', 'VARCHAR(50) NULL');
  await ensureColumn('shopkeepers', 'bank_ifsc', 'VARCHAR(20) NULL');
  await ensureColumn('shopkeepers', 'invoice_terms', 'TEXT NULL');
  await ensureColumn('shopkeepers', 'upi_id', 'VARCHAR(100) NULL');
  await ensureColumn('shopkeepers', 'upi_name', 'VARCHAR(100) NULL');

  // Payment / product columns used in newer flows
  await ensureColumn('shopkeeper_payments', 'qr_code_data', 'TEXT NULL');
  await ensureColumn('shopkeeper_payments', 'utr_number', 'VARCHAR(50) NULL');
  await ensureColumn('shopkeeper_payments', 'payment_verified', 'TINYINT(1) DEFAULT 0');
  await ensureColumn('shopkeeper_payments', 'refund_amount', 'DECIMAL(10,2) DEFAULT 0.00');
  await ensureColumn('shopkeeper_payments', 'refund_note', 'TEXT NULL');
  await ensureColumn('shopkeeper_payments', 'refund_processed_at', 'DATETIME NULL');
  await ensureColumn('shopkeeper_products', 'hsn_sac', 'VARCHAR(20) NULL');
  await ensureColumn('shopkeeper_products', 'gst_rate', 'DECIMAL(5,2) DEFAULT 0.00');
  await ensureColumn('shopkeeper_order_items', 'hsn_sac', 'VARCHAR(20) NULL');
  await ensureColumn('shopkeeper_order_items', 'gst_rate', 'DECIMAL(5,2) DEFAULT 0.00');

  console.log('✅ DB bootstrap completed.');
}

module.exports = { initializeDatabase };