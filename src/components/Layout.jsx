import { Menu, Users, Settings, LogOut, Shield } from "lucide-react";
import { useState } from "react";

export default function Layout({ children }) {
  const [open, setOpen] = useState(true);
  const accent = "#ffee00";

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Ambient glow accents */}
      <div className="fixed inset-0 -z-10 pointer-events-none" aria-hidden>
        <div
          className="absolute -top-28 -left-20 w-[520px] h-[520px] rounded-full blur-3xl opacity-20"
          style={{ background: accent }}
        />
        <div
          className="absolute -bottom-28 -right-24 w-[560px] h-[560px] rounded-full blur-3xl opacity-20"
          style={{ background: accent }}
        />
      </div>

      <header className="sticky top-0 z-20 border-b border-gray-200/60 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen((o) => !o)}
              className="p-2 rounded-lg hover:bg-gray-100 transition"
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-md shadow-inner"
                style={{ background: accent }}
              />
              <span className="font-semibold tracking-tight">Admin OSIS</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border border-gray-200 bg-white/80 shadow-sm backdrop-blur">
              <Shield className="w-4 h-4" />
              <span>Status: Super Admin</span>
            </div>
            <button className="inline-flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition shadow-sm">
              <LogOut className="w-4 h-4" /> Keluar
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-12 gap-6 py-6">
        <aside
          className={`${open ? "col-span-12 md:col-span-3 lg:col-span-2" : "hidden md:block md:col-span-1"} transition-all`}
        >
          <nav className="sticky top-20 space-y-2">
            <SidebarItem icon={Users} label="Kandidat" active accent={accent} />
            <SidebarItem icon={Settings} label="Pengaturan" accent={accent} />
          </nav>
        </aside>
        <main className={`${open ? "col-span-12 md:col-span-9 lg:col-span-10" : "col-span-12 md:col-span-11"}`}>
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, active, accent }) {
  return (
    <button
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition border backdrop-blur shadow-sm ${
        active
          ? "bg-white/80 border-gray-200"
          : "hover:bg-white/70 border-transparent"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span className="truncate">{label}</span>
      {active && (
        <span
          className="ml-auto w-2.5 h-2.5 rounded-full ring-2 ring-offset-2 ring-offset-white"
          style={{ background: accent, boxShadow: "0 0 0 3px rgba(0,0,0,0.02)" }}
        />
      )}
    </button>
  );
}
