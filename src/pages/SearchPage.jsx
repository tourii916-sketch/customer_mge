import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import "./SearchPage.css"

function SearchPage() {
  const [customerId, setCustomerId] = useState("")
  const [customerList, setCustomerList] = useState([])
  const [allCustomers, setAllCustomers] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const loadList = async () => {
      const snap = await getDocs(collection(db, "customers"));
      const list = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data().basic
      }));
      console.log("顧客一覧:", list);
      setAllCustomers(list);
      setCustomerList(list);
    };
    loadList();
  }, []);

  const handleSearch = () => {
    if (!customerId) {
      setCustomerList(allCustomers);
      return
    }
    const keyword = customerId.trim().toLowerCase();
    const filtered = allCustomers.filter(c =>
      c.id === customerId.trim()
    );
    setCustomerList(filtered);
  }

  const handleClear = () => {
    setCustomerId("")
    setCustomerList(allCustomers);
  }

  const handleSelect = (id) => {
    navigate(`/customers/${id}`);
  };

  return (
    <div className="search-page">
      <div className="search-row">
        <label>
          顧客ID：
          <input
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="C-00123"
          />
        </label>

        <button onClick={handleSearch}>検索</button>
        <button onClick={handleClear}>クリア</button>
        <button onClick={() => navigate("/add")}>新規会社</button>
        <button className="logout-btn" onClick={() => {signOut(auth);}}>ログアウト</button>
      </div>
      <div className="block customer-list">
        <h3>顧客一覧</h3>

        <div className="list-header">
          <span>顧客ID</span>
          <span>会社名</span>
          <span>担当</span>
        </div>

        {customerList.map(c => (
          <div
            key={c.id}
            className="list-row"
            onClick={() => handleSelect(c.id)}
          >
            <span>{c.id}</span>
            <span>{c.companyName}</span>
            <span>{c.accountManagers?.join(" / ")}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
