import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

function EmployeeAdd() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState("add employee...");

  const [employeeId, setEmployeeId] = useState("");
  const [name, setName] = useState("");
  const [nameKana, setNameKana] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        if (!employeeId) {
        setMessage("従業員IDを入力してください");
        return;
        }

        const ref = doc(
        db,
        "customers",
        customerId,
        "employees",
        employeeId
        );

        await setDoc(ref, {
                basic: {
                    employeeId,
                    name,
                    nameKana,
                },
                createdAt: serverTimestamp(),
            });

        setMessage("登録が完了しました");
    } catch (e) {
        console.error(e);
        setMessage("登録に失敗しました");
    }

    // 保存完成后返回员工列表
    navigate(`/customers/${customerId}/employeeList`);
  };

  return (
    <div>
      <h2>従業員追加</h2>
      <p>Customer ID：{customerId}</p>
        <h5>{message}</h5>

      <form onSubmit={handleSubmit}>
        <div>
          <label>従業員ID：</label>
          <input
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
          />
        </div>

        <div>
          <label>氏名：</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>氏名（カナ）：</label>
          <input
            value={nameKana}
            onChange={(e) => setNameKana(e.target.value)}
            required
          />
        </div>

        <button type="submit">登録</button>
      </form>
    </div>
  );
}

export default EmployeeAdd;
