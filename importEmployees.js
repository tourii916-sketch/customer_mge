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
// 读取 employees.json
// --------------------
const employeesPath = path.join(__dirname, "employees.json");
const employeesData = JSON.parse(
  fs.readFileSync(employeesPath, "utf-8")
);

// --------------------
// 读取 serviceAccountKey.json
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
// 导入 employees 到 subcollection
// --------------------
async function importEmployees() {
  for (const [customerId, employees] of Object.entries(employeesData)) {
    console.log(`👤 Customer: ${customerId}`);

    for (const [employeeId, employeeData] of Object.entries(employees)) {
      console.log(`   └─ Import employee: ${employeeId}`);

      await db
        .collection("customers")
        .doc(customerId)
        .collection("employees")
        .doc(employeeId)
        .set(employeeData, { merge: true });
    }
  }

  console.log("✅ Employees import finished");
  process.exit(0);
}

importEmployees().catch((err) => {
  console.error("❌ Import failed:", err);
  process.exit(1);
});
