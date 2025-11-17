import { Users, Crown, UserRound } from "lucide-react";

export default function Stats({ total, ketua, wakil }) {
  const accent = "#ffee00";
  const items = [
    { icon: Users, label: "Total Kandidat", value: total },
    { icon: Crown, label: "Calon Ketua", value: ketua },
    { icon: UserRound, label: "Calon Wakil", value: wakil },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {items.map((it, idx) => (
        <div
          key={idx}
          className="group bg-white rounded-2xl border border-gray-200 shadow-sm p-5 relative overflow-hidden"
        >
          <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-20 blur-xl" style={{ background: accent }} />
          <div className="flex items-center gap-4">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shadow-inner"
              style={{ background: accent }}
            >
              <it.icon className="w-5 h-5 text-gray-900" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{it.label}</p>
              <p className="text-2xl font-bold tracking-tight">{it.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
