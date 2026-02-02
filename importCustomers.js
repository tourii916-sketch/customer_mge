import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";

// --------------------
// 路径处理
// --------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// --------------------
// 读取 customers.json
// --------------------
const customersPath = path.join(__dirname, "customers.json");
const customers = JSON.parse(
  fs.readFileSync(customersPath, "utf-8")
);

// --------------------
// 读取 serviceAccountKey.json（⚠️ 不用 import）
// --------------------
const serviceAccountPath = path.join(__dirname, "serviceAccountKey.json");
const serviceAccount = JSON.parse(
  fs.readFileSync(serviceAccountPath, "utf-8")
);

// --------------------
// 初始化 Firebase Admin
// --------------------
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// --------------------
// 导入 Firestore
// --------------------
async function importCustomers() {
  for (const [customerId, data] of Object.entries(customers)) {
    console.log(`Importing customer: ${customerId}`);

    await db
      .collection("customers")
      .doc(customerId)
      .set(data, { merge: true });
  }

  console.log("✅ Import finished");
  process.exit(0);
}

importCustomers().catch((err) => {
  console.error("❌ Import failed:", err);
  process.exit(1);
});
