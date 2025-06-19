import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login } = useAuth();

  return (
    <div className="h-screen flex items-center justify-center bg-black text-white">
      <button
        onClick={login}
        className="bg-white text-black px-6 py-3 rounded font-semibold"
      >
        Login to Continue
      </button>
    </div>
  );
};

export default Login;
