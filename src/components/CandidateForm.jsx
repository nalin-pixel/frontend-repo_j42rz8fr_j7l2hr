import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";

export default function CandidateForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState({
    name: "",
    className: "",
    photo: "",
    visiMisi: "",
    programs: "",
    isLeader: false,
  });

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name || "",
        className: initial.className || "",
        photo: initial.photo || "",
        visiMisi: initial.visiMisi || "",
        programs: (initial.programs || []).join(", "),
        isLeader: !!initial.isLeader,
      });
    }
  }, [initial]);

  if (!open) return null;
  const accent = "#ffee00";

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      programs: form.programs
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
    };
    onSubmit?.(payload);
    onClose?.();
  };

  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold">{initial ? "Edit Kandidat" : "Tambah Kandidat"}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Nama Lengkap</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
              style={{ borderColor: "#e5e7eb", outline: "none" }}
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Kelas</label>
            <input
              name="className"
              value={form.className}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
              required
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">URL Foto</label>
            <div className="flex gap-2">
              <input
                name="photo"
                value={form.photo}
                onChange={handleChange}
                placeholder="https://..."
                className="flex-1 px-3 py-2 rounded-lg border"
              />
              <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white">
                <Upload className="w-4 h-4" /> Upload
              </button>
            </div>
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">Visi & Misi</label>
            <textarea
              name="visiMisi"
              value={form.visiMisi}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">Program Unggulan (pisahkan dengan koma)</label>
            <input
              name="programs"
              value={form.programs}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded-lg border"
              placeholder="Kebersihan sekolah, Literasi pagi, ..."
            />
          </div>

          <label className="flex items-center gap-2 md:col-span-2">
            <input type="checkbox" name="isLeader" checked={form.isLeader} onChange={handleChange} />
            <span className="text-sm">Tandai sebagai Calon Ketua</span>
          </label>

          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">Batal</button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg font-medium"
              style={{ background: accent, color: "#111" }}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
