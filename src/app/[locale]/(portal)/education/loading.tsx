export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div className="text-4xl font-black text-white tracking-tight">
          <span className="text-gray-300">汇刃</span>
          <span className="ml-2">FX</span>
          <span className="ml-1 text-[#ff102a]">Killer</span>
        </div>

        {/* Loading bar */}
        <div className="w-48 h-1 bg-gray-200 dark:bg-[#0a0a0a] overflow-hidden">
          <div
            className="h-full w-1/3 bg-[#ff102a]"
            style={{
              animation: 'loading-bar 1s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
}
