type Props = {
  title: string;
  value: number | string;
};

export function StatsCard({ title, value }: Props) {
  return (
    <div className="dark:bg-[#1f1f1f] bg-gray-200 border border-gray-700 rounded-xl p-5">
      <p className="text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-1">{value}</h3>
    </div>
  );
}
