import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";
import { db } from "../../firebase";
import "./Customer360.css";

export default function Customer360() {
  const { customerId } = useParams();
  const [data, setData] = useState(null);
  
  const formatYen = (value) => {
    if (!value) return "-";
    return `${(value / 10000).toLocaleString()}万`;
  };
  useEffect(() => {
    const load = async () => {
      try {
        const ref = doc(db, "customers", customerId);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          console.log("🔥 data =", snap.data());
          setData(snap.data());
        } else {
          console.error("❌ 顧客IDが存在しません。");
        }
      } catch (e) {
        console.error("❌ firestore error:", e);
      }
    };

    load();
  }, [customerId]);

  if (!data) return <div>顧客IDが存在しません。</div>;

  return (
    <div className="customer360-page">
      <div className="customer360-grid">
        <div className="block block1 summary-grid">
          <div className="item id">
            <strong>顧客ID：</strong>{data.basic.customerId}
          </div>
          <div className="item company">
            <strong>会社名：</strong>{data.basic.companyName}
          </div>
          <div className="item month">
            <strong>決算月：</strong>{data.basic.fiscalMonth}月
          </div>
          <div className="item managers">
            <strong>担当：</strong>{data.basic.accountManagers.join(" / ")}
          </div>
          <div className="item rank">
            <strong>区分：</strong>{data.basic.rank}
          </div>
          <div className="item action">
            <button
              className="logout-btn"
              onClick={(e) => {
                e.stopPropagation();
                signOut(auth).then(() => {
                  navigate("/login", { replace: true });
                });
              }}
            >
              ログアウト
            </button>
          </div>
        </div>

        <div className="block block2">
          <h3 className="block-title">会社基本情報</h3>
          <div className="info-grid-2col">
            <div className="info-col">
              <div className="info-row">
                <span className="label">•会社名（正式）：</span>
                <span className="value">{data.companyInfo.companyName}</span>
              </div>
              <div className="info-row">
                <span className="label">•会社名（カタカナ）：</span>
                <span className="value">{data.companyInfo.kanaName}</span>
              </div>
              <div className="info-row">
                <span className="label">•所在地：</span>
                <span className="value">{data.companyInfo.address}</span>
              </div>
              <div className="info-row">
                <span className="label">•法人番号：</span>
                <span className="value">{data.companyInfo.corporateNo}</span>
              </div>
              <div className="info-row">
                <span className="label">•T番号（インボイス）：</span>
                <span className="value">
                  {data.companyInfo.invoice.hasInvoiceNo ? "有" : "無"}
                </span>
              </div>
              <div className="info-row">
                <span className="label">•T番号登録日：</span>
                <span className="value">
                  {data.companyInfo.invoice.invoiceNoRegDate}
                </span>
              </div>
              <div className="info-row">
                <span className="label">•所轄税務署：</span>
                <span className="value">{data.companyInfo.taxOffice}</span>
              </div>
              <div className="info-row">
                <span className="label">•設立日：</span>
                <span className="value">{data.companyInfo.establishedDate ?? "―"}</span>
              </div>
              <div className="info-row">
                <span className="label">•資本金：</span>
                <span className="value">{data.companyInfo.capitalYen ?? "―"}</span>
              </div>
              <div className="info-row">
                <span className="label">•申告期（月）：</span>
                <span className="value">{data.companyInfo.fiscalClosingMonth}月決算</span>
              </div>
              <div className="info-row">
                <span className="label">•電話番号：</span>
                <span className="value">{data.companyInfo.phone}</span>
              </div>
              <div className="info-row">
                <span className="label">•代理人：</span>
                <span className="value">{data.companyInfo.agent}</span>
              </div>
            </div>
            <div className="info-col">
              <div className="info-row">
                <span className="label">•代表取締役：</span>
                <span className="value">{data.companyInfo.representative.name}</span>
              </div>
              <div className="info-row">
                <span className="label">•代表取締役（フリガナ）：</span>
                <span className="value">{data.companyInfo.representative.kana}</span>
              </div>
              <div className="info-row">
                <span className="label">•代表取締役住所：</span>
                <span className="value">{data.companyInfo.representative.address}</span>
              </div>
              <div className="info-row">
                <span className="label">•在留資格：</span>
                <span className="value">{data.companyInfo.representative.visa}</span>
              </div>
              <div className="info-row">
                <span className="label">•在留期限：</span>
                <span className="value">{data.companyInfo.representative.expiry ?? "―"}</span>
              </div>
              <div className="info-row">
                <span className="label">•取引銀行：</span>
                <span className="value">
                  {data.companyInfo.banks.bank}銀行  {data.companyInfo.banks.branch}支店
                </span>
              </div>
              <div className="info-row">
                <span className="label">•ネット銀行：</span>
                <span className="value">
                  {data.companyInfo.banks.hasNetBank ? "有" : "無"}
                </span>
              </div>
              <div className="info-row">
                <span className="label">•ネット銀行期限：</span>
                <span className="value">{data.companyInfo.banks.netBankExpiry ?? "―"}</span>
              </div>
              <div className="info-row">
                <span className="label">•印鑑：</span>
                <span className="value">{data.companyInfo.seal}</span>
              </div>
              <div className="info-row">
                <span className="label">•契約：</span>
                <span className="value">
                  {data.companyInfo.hasContract ? "有" : "無"}
                </span>
              </div>
              <div className="info-row">
                <span className="label">•申告・納付方法：</span>
                <span className="value">{data.companyInfo.payment}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="block block3">
          <h3>業務メニュー</h3>
          <p>［決算・税務］ 状態：{data.business.settlementStatus}</p>
          <p>
            ［従業員・給与］
            <Link
              to={`/customers/${data.basic.customerId}/employeeList`}
              className="employee-link"
            >
              従業員</Link>：{data.business.employees}名
            
          </p>
          <p>［連絡メモ］ 未完了ToDo：{data.business.todo}</p>
          <p>［不足資料］ 未提出：{data.business.missingDocs}</p>
        </div>

        <div className="block block4">
          {Object.entries(data.periods)
            .sort((a, b) => Number(b[0]) - Number(a[0])) // 期数倒序
            .map(([key, p]) => (
              <div key={key} className="period-row">
              <Link to={'/customers/${data.basic.customerId}/period/${key}'} className="period-link">
                {p.period}
              </Link>｜
                売上 {formatYen(p.sales)}｜
                純利益 {formatYen(p.netIncome)}｜
                法人税 {p.corporateTax}｜
                消費税 {p.consumptionTax}
              </div>
            ))}
        </div>
        <div className="page-footer">
          © 久幸財務株式会社／結城会計事務所
        </div>
      </div>
    </div>
  );
}
