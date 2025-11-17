import { useMemo, useState } from "react";
import Layout from "./components/Layout";
import Stats from "./components/Stats";
import CandidateCard from "./components/CandidateCard";
import CandidateForm from "./components/CandidateForm";
import { Plus, Search } from "lucide-react";

export default function App() {
  const accent = "#ffee00";
  const [query, setQuery] = useState("");
  const [openForm, setOpenForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: "Alya Rahma",
      className: "XI IPA 2",
      isLeader: true,
      visiMisi:
        "Mewujudkan OSIS yang aktif, inklusif, dan berdampak nyata bagi siswa.",
      programs: ["Gerakan Jumat Bersih", "Bakti Sosial", "Klub Literasi"],
      photo: "",
    },
    {
      id: 2,
      name: "Bagas Putra",
      className: "XI IPS 1",
      isLeader: false,
      visiMisi: "Mendukung ketua dalam menjalankan program dan kolaborasi antar-eksul.",
      programs: ["Expo Ekstrakurikuler", "Mentoring Akademik"],
      photo: "",
    },
  ]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return candidates.filter(
      (c) => c.name.toLowerCase().includes(q) || c.className.toLowerCase().includes(q)
    );
  }, [candidates, query]);

  const stats = useMemo(() => {
    const total = candidates.length;
    const ketua = candidates.filter((c) => c.isLeader).length;
    const wakil = total - ketua;
    return { total, ketua, wakil };
  }, [candidates]);

  const handleAdd = () => {
    setEditData(null);
    setOpenForm(true);
  };

  const handleSave = (payload) => {
    if (editData) {
      setCandidates((prev) => prev.map((c) => (c.id === editData.id ? { ...c, ...payload } : c)));
    } else {
      setCandidates((prev) => [
        { id: Math.max(0, ...prev.map((p) => p.id)) + 1, ...payload },
        ...prev,
      ]);
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setOpenForm(true);
  };

  const handleDelete = (data) => {
    if (confirm(`Hapus kandidat ${data.name}?`)) {
      setCandidates((prev) => prev.filter((c) => c.id !== data.id));
    }
  };

  return (
    <Layout>
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-bold">Pengelolaan Kandidat OSIS</h1>
            <p className="text-gray-600">Kelola data calon ketua dan wakil secara profesional.</p>
          </div>
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium"
            style={{ background: accent, color: "#111" }}
          >
            <Plus className="w-4 h-4" /> Tambah Kandidat
          </button>
        </div>

        <Stats total={stats.total} ketua={stats.ketua} wakil={stats.wakil} />

        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari berdasarkan nama atau kelas..."
              className="w-full pl-10 pr-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((c) => (
            <CandidateCard key={c.id} data={c} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center text-gray-600 py-12 border-2 border-dashed rounded-xl">
              Belum ada data yang cocok dengan pencarian.
            </div>
          )}
        </div>
      </section>

      <CandidateForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        onSubmit={handleSave}
        initial={editData}
      />
    </Layout>
  );
}
