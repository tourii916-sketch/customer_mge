import { useState, useEffect } from "react";
import { useNavigate, useParams  } from "react-router-dom"
import { collection, getDocs } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import "./EmployeeList.css"

function SearchPage() {
  const [employeeId, setEmployeeId] = useState("")
  const [employeeList, setEmployeeList] = useState([])
  const [allEmployees, setAllEmployees] = useState([])
  const navigate = useNavigate()
  const { customerId } = useParams();

  useEffect(() => {
    const loadEmployees = async () => {
      const snap = await getDocs(collection(db, "customers", customerId, "employees"));
      const list = snap.docs.map(doc => ({
        employeeId: doc.id,
        ...doc.data().basic
      }));
      console.log("従業員一覧:", list);
      setAllEmployees(list);
      setEmployeeList(list);
    };
    loadEmployees();
  }, []);

  const handleSearch = () => {
    console.log("输入值:", employeeId);
    console.log("全部员工:", allEmployees);

    if (!employeeId.trim()) {
      setEmployeeList(allEmployees);
      return;
    }

    const filtered = allEmployees.filter(e => {
      console.log("对比:", e.employeeId, "vs", employeeId.trim());
      return e.employeeId === employeeId.trim();
    });

    console.log("过滤结果:", filtered);
    setEmployeeList(filtered);
  };

  const handleClear = () => {
    setEmployeeId("");
    setEmployeeList(allEmployees);
  };

  const handleSelect = (employeeId) => {
    navigate(`/employees/${employeeId}`);
  };
  const goAddEmployee = () => {
    navigate(`/customers/${customerId}/employees/add`);
  };

  return (
    <div className="search-page">
      <div className="search-row">
        <label>
          従業員ID：
          <input
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="E-0001"
          />
        </label>

        <button onClick={handleSearch}>検索</button>
        <button onClick={handleClear}>クリア</button>
        <button onClick={goAddEmployee}>
        従業員を追加
      </button>
        <button className="logout-btn" onClick={() => {signOut(auth);}}>ログアウト</button>
      </div>
      <div className="block customer-list">
        <h3>従業員一覧</h3>

        <div className="list-header">
          <span>従業員ID</span>
          <span>従業員</span>
          <span>仮名</span>
        </div>

        {employeeList.map(e => (
          <div
            key={e.employeeId}
            className="list-row"
            onClick={() => handleSelect(e.employeeId)}
          >
            <span>{e.employeeId}</span>
            <span>{e.name}</span>
            <span>{e.nameKana}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SearchPage
