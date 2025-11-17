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
        <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex items-center gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ background: accent }}
          >
            <it.icon className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <p className="text-sm text-gray-600">{it.label}</p>
            <p className="text-2xl font-bold">{it.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
