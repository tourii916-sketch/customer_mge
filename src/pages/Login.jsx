import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";

const provider = new GoogleAuthProvider();

// 你允许的名字关键词（白名单）
const ALLOWED_KEYWORDS = ["tourii916"];

export default function Login({ onSuccess }) {
  const login = async () => {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const name = user.displayName || "";
    const email = user.email || "";

    const allowed = ALLOWED_KEYWORDS.some(
      (key) => name.includes(key) || email.includes(key)
    );

    if (!allowed) {
      alert("このアカウントにはアクセス権限がありません");
      return;
    }

    onSuccess(user);
  };

  return (
    <div style={{ padding: 40 }}>
      <button onClick={login}>
        Googleでログイン
      </button>
    </div>
  );
}
