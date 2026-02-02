import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, db } from "../../firebase";

const provider = new GoogleAuthProvider();

export default function Add() {
  const [message, setMessage] = useState("add customer...");
  const [customerId, setCustomerId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fiscalMonth, setFiscalMonth] = useState("");
  const [accountManagers, setAccountManagers] = useState("");

  const navigate = useNavigate();

  // 未登录则跳转
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("`/Login");
      }
    });
    return () => unsub();
  }, [navigate]);

  // アドレス登録
  const doAction = async (e) => {
    e.preventDefault();
    setMessage("登録中...");

    try {
      const user = auth.currentUser;
      if (!user) {
        setMessage("未登录");
        return;
      }

      const addressRef = doc(
        db,
        "customers" ,
        customerId
      );

      await setDoc(addressRef, {
        customerId,
        companyName,
        fiscalMonth,
        accountManagers,
        createdAt: new Date(),
        flag: false,
      });

      setMessage("登録が完了しました");
      setCustomerId("");
      setCompanyName("");
      setFiscalMonth("");
      setAccountManagers("");
    } catch (err) {
      console.error(err);
      setMessage("登録に失敗しました");
    }
  };

  return (
    <div className="search-page">
      <div className="alert alert-primary text-center">
        <h5 className="mb-4">{message}</h5>

        <div className="form-group">
          <label>顧客ID</label>
          <input
            className="form-control"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
          />

          <label className="mt-2">会社名</label>
          <input
            className="form-control"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />

          <label className="mt-2">決算月</label>
          <input
            className="form-control"
            value={fiscalMonth}
            onChange={(e) => setFiscalMonth(e.target.value)}
          />

          <label className="mt-2">担当</label>
          <textarea
            className="form-control"
            value={accountManagers}
            onChange={(e) => setAccountManagers(e.target.value)}
          />
        </div>

        <button onClick={doAction} className="btn btn-primary mt-3">
          追加
        </button>
        <button
          onClick={() => navigate("`/SearchPage")}
          className="btn mt-3 ms-2"
        >
          戻る
        </button>
      </div>
    </div>
  );
}