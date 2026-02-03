import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";

export default function Add() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("add customer...");

  /** ===== basic ===== */
  const [customerId, setCustomerId] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [fiscalMonth, setFiscalMonth] = useState("");
  const [accountManagers, setAccountManagers] = useState("");
  const [rank, setRank] = useState("");

  /** ===== companyInfo ===== */
  const [kanaName, setKanaName] = useState("");
  const [address, setAddress] = useState("");
  const [corporateNo, setCorporateNo] = useState("");
  const [hasInvoiceNo, setHasInvoiceNo] = useState(false);
  const [invoiceNoRegDate, setInvoiceNoRegDate] = useState("");
  const [taxOffice, setTaxOffice] = useState("");
  const [phone, setPhone] = useState("");
  const [agent, setAgent] = useState("");

  /** ===== business ===== */
  const [settlementStatus, setSettlementStatus] = useState("");
  const [employees, setEmployees] = useState(0);
  const [todo, setTodo] = useState(0);
  const [missingDocs, setMissingDocs] = useState(0);

  /** ===== representative ===== */
  const [repName, setRepName] = useState("");
  const [repKana, setRepKana] = useState("");
  const [repAddress, setRepAddress] = useState("");
  const [repVisa, setRepVisa] = useState("");
  const [repExpiry, setRepExpiry] = useState("");

  /** ===== banks ===== */
  const [bankName, setBankName] = useState("");
  const [bankBranch, setBankBranch] = useState("");
  const [hasNetBank, setHasNetBank] = useState(false);
  const [netBankExpiry, setNetBankExpiry] = useState("");

  /** ===== auth check ===== */
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (!user) navigate("/login");
    });
    return () => unsub();
  }, [navigate]);

  /** ===== save ===== */
  const doAction = async (e) => {
    e.preventDefault();
    setMessage("登録中...");

    try {
      await setDoc(doc(db, "customers", customerId), {
        basic: {
          customerId,
          companyName,
          fiscalMonth,
          accountManagers: accountManagers
            .split("/")
            .map(v => v.trim())
            .filter(Boolean),
          rank,
        },

        companyInfo: {
          companyName,
          kanaName,
          address,
          corporateNo,

          invoice: {
            hasInvoiceNo,
            invoiceNoRegDate,
          },

          taxOffice,
          phone,
          agent,

          representative: {
            name: repName,
            kana: repKana,
            address: repAddress,
            visa: repVisa,
            expiry: repExpiry || null,
          },

          banks: {
            bank: bankName,
            branch: bankBranch,
            hasNetBank,
            netBankExpiry: netBankExpiry || null,
          },
        },


        business: {
          settlementStatus,
          employees: Number(employees),
          todo: Number(todo),
          missingDocs: Number(missingDocs),
        },

        periods: {},
        createdAt: new Date(),
      });

      setMessage("登録が完了しました");
      navigate("/");
    } catch (e) {
      console.error(e);
      setMessage("登録に失敗しました");
    }
  };

  return (
    <div className="search-page">
      <div className="alert alert-primary">
        <h5>{message}</h5>

        <h6>■ 基本情報</h6>
        <input placeholder="顧客ID" value={customerId} onChange={e => setCustomerId(e.target.value)} />
        <input placeholder="会社名" value={companyName} onChange={e => setCompanyName(e.target.value)} />
        <input placeholder="決算月" value={fiscalMonth} onChange={e => setFiscalMonth(e.target.value)} />
        <input placeholder="担当 ( / 区切り)" value={accountManagers} onChange={e => setAccountManagers(e.target.value)} />
        <input placeholder="区分" value={rank} onChange={e => setRank(e.target.value)} />

        <h6 className="mt-3">■ 会社情報</h6>
        <input placeholder="会社名カナ" value={kanaName} onChange={e => setKanaName(e.target.value)} />
        <input placeholder="所在地" value={address} onChange={e => setAddress(e.target.value)} />
        <input placeholder="法人番号" value={corporateNo} onChange={e => setCorporateNo(e.target.value)} />
        <label>
          <input type="checkbox" checked={hasInvoiceNo} onChange={e => setHasInvoiceNo(e.target.checked)} />
          インボイス有
        </label>
        <input placeholder="インボイス登録日" value={invoiceNoRegDate} onChange={e => setInvoiceNoRegDate(e.target.value)} />

        <h6 className="mt-3">■ 業務情報</h6>
        <input placeholder="決算状況" value={settlementStatus} onChange={e => setSettlementStatus(e.target.value)} />
        <input placeholder="従業員数" value={employees} onChange={e => setEmployees(e.target.value)} />
        <input placeholder="ToDo" value={todo} onChange={e => setTodo(e.target.value)} />
        <input placeholder="不足資料" value={missingDocs} onChange={e => setMissingDocs(e.target.value)} />
        <h6 className="mt-3">■ 代表取締役</h6>

        <input
          className="form-control"
          placeholder="代表取締役 氏名"
          value={repName}
          onChange={(e) => setRepName(e.target.value)}
        />

        <input
          className="form-control mt-1"
          placeholder="代表取締役 フリガナ"
          value={repKana}
          onChange={(e) => setRepKana(e.target.value)}
        />

        <input
          className="form-control mt-1"
          placeholder="代表取締役 住所"
          value={repAddress}
          onChange={(e) => setRepAddress(e.target.value)}
        />

        <input
          className="form-control mt-1"
          placeholder="在留資格"
          value={repVisa}
          onChange={(e) => setRepVisa(e.target.value)}
        />

        <input
          className="form-control mt-1"
          placeholder="在留期限"
          value={repExpiry}
          onChange={(e) => setRepExpiry(e.target.value)}
        />
        
        <h6 className="mt-3">■ 銀行情報</h6>

        <input
          className="form-control"
          placeholder="取引銀行名"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />

        <input
          className="form-control mt-1"
          placeholder="支店名"
          value={bankBranch}
          onChange={(e) => setBankBranch(e.target.value)}
        />

        <label className="mt-2 d-block">
          <input
            type="checkbox"
            checked={hasNetBank}
            onChange={(e) => setHasNetBank(e.target.checked)}
          />
          ネット銀行あり
        </label>

        <input
          className="form-control mt-1"
          placeholder="ネット銀行期限"
          value={netBankExpiry}
          onChange={(e) => setNetBankExpiry(e.target.value)}
        />


        <button onClick={doAction} className="btn btn-primary mt-3">
          登録
        </button>
      </div>
    </div>
  );
}
