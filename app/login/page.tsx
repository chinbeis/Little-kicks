import { handleSignIn, handleSignOut } from "../auth/actions";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form action={handleSignIn} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="mb-4 w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="mb-4 w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Sign In
          </button>
        </form>
        <form action={handleSignOut}>
          <button
            type="submit"
            className="w-full p-2 mt-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
}
