export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen dark:bg-[#121212] text-gray-800 dark:text-white px-6 py-8">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
}
