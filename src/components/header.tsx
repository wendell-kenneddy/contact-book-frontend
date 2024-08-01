export function Header() {
  return (
    <header className="w-full py-2 flex items-center justify-center bg-zinc-900 text-white">
      <div className="w-[90%] max-w-[720px] flex items-center justify-between">
        <h1>CBook</h1>

        <div className="flex items-center gap-2">
          <button>Login</button>
          <button>Signup</button>
        </div>
      </div>
    </header>
  );
}
