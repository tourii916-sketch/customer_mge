import { useLocation } from "react-router-dom"

function ResultPage() {
  const location = useLocation()
  const customerId = location.state?.customerId

  return (
    <div style={{ padding: "40px" }}>
      <h2>検索結果画面</h2>

      {customerId ? (
        <p>顧客ID：{customerId}</p>
      ) : (
        <p>顧客ID が渡されていません</p>
      )}
    </div>
  )
}

export default ResultPage
