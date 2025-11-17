import { Edit3, Trash2, Crown, UserRound } from "lucide-react";

export default function CandidateCard({ data, onEdit, onDelete }) {
  const accent = "#ffee00";
  const leader = data.leader || {};
  const deputy = data.deputy || {};

  return (
    <div className="group bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-4 flex items-start gap-4">
        <div className="flex flex-col items-center gap-2">
          <img
            src={leader.photo || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
              leader.name || "leader"
            )}`}
            alt={leader.name}
            className="w-16 h-16 rounded-lg object-cover ring-2 ring-gray-100"
          />
          <div className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100">
            <Crown className="w-3 h-3" /> Ketua
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <img
            src={deputy.photo || `https://api.dicebear.com/7.x/identicon/svg?seed=${encodeURIComponent(
              deputy.name || "deputy"
            )}`}
            alt={deputy.name}
            className="w-16 h-16 rounded-lg object-cover ring-2 ring-gray-100"
          />
          <div className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100">
            <UserRound className="w-3 h-3" /> Wakil
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold truncate">
            {leader.name || "-"} & {deputy.name || "-"}
          </h3>
          <p className="text-sm text-gray-600 truncate">
            {leader.className || "-"} • {deputy.className || "-"}
          </p>
          <p className="text-xs text-gray-500 line-clamp-2 mt-1">{data.visiMisi}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit?.(data)}
            className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
            aria-label="Edit"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete?.(data)}
            className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50"
            aria-label="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {data.programs?.length > 0 && (
        <div className="px-4 pb-4">
          <div className="flex flex-wrap gap-2">
            {data.programs.slice(0, 4).map((p, idx) => (
              <span
                key={idx}
                className="text-xs px-2 py-1 rounded-full border border-gray-200 bg-gray-50"
              >
                {p}
              </span>
            ))}
            {data.programs.length > 4 && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-900 text-white" style={{background: accent, color: "#111"}}>
                +{data.programs.length - 4} lainnya
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
