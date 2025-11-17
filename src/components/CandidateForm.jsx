import { useEffect, useState } from "react";
import { X, Upload } from "lucide-react";

// Form untuk pasangan kandidat (ketua + wakil)
export default function CandidateForm({ open, onClose, onSubmit, initial }) {
  const [form, setForm] = useState({
    leader: { name: "", className: "", photo: "" },
    deputy: { name: "", className: "", photo: "" },
    visiMisi: "",
    programs: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({
        leader: {
          name: initial.leader?.name || "",
          className: initial.leader?.className || "",
          photo: initial.leader?.photo || "",
        },
        deputy: {
          name: initial.deputy?.name || "",
          className: initial.deputy?.className || "",
          photo: initial.deputy?.photo || "",
        },
        visiMisi: initial.visiMisi || "",
        programs: (initial.programs || []).join(", "),
      });
    } else {
      setForm({
        leader: { name: "", className: "", photo: "" },
        deputy: { name: "", className: "", photo: "" },
        visiMisi: "",
        programs: "",
      });
    }
  }, [initial]);

  if (!open) return null;
  const accent = "#ffee00";

  const handleChange = (section, field, value) => {
    if (section === "leader" || section === "deputy") {
      setForm((f) => ({ ...f, [section]: { ...f[section], [field]: value } }));
    } else {
      setForm((f) => ({ ...f, [field]: value }));
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = {
      leader: form.leader,
      deputy: form.deputy,
      visiMisi: form.visiMisi,
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
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="font-semibold">{initial ? "Edit Pasangan" : "Tambah Pasangan"}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">Calon Ketua</legend>
            <div className="space-y-1">
              <label className="text-sm">Nama</label>
              <input
                value={form.leader.name}
                onChange={(e) => handleChange("leader", "name", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Kelas</label>
              <input
                value={form.leader.className}
                onChange={(e) => handleChange("leader", "className", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm">URL Foto</label>
              <div className="flex gap-2">
                <input
                  value={form.leader.photo}
                  onChange={(e) => handleChange("leader", "photo", e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 rounded-lg border"
                />
                <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white">
                  <Upload className="w-4 h-4" /> Upload
                </button>
              </div>
            </div>
          </fieldset>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold">Calon Wakil</legend>
            <div className="space-y-1">
              <label className="text-sm">Nama</label>
              <input
                value={form.deputy.name}
                onChange={(e) => handleChange("deputy", "name", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border focus:outline-none focus:ring-2"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm">Kelas</label>
              <input
                value={form.deputy.className}
                onChange={(e) => handleChange("deputy", "className", e.target.value)}
                className="w-full px-3 py-2 rounded-lg border"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm">URL Foto</label>
              <div className="flex gap-2">
                <input
                  value={form.deputy.photo}
                  onChange={(e) => handleChange("deputy", "photo", e.target.value)}
                  placeholder="https://..."
                  className="flex-1 px-3 py-2 rounded-lg border"
                />
                <button type="button" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border bg-white">
                  <Upload className="w-4 h-4" /> Upload
                </button>
              </div>
            </div>
          </fieldset>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">Visi & Misi</label>
            <textarea
              value={form.visiMisi}
              onChange={(e) => handleChange(null, "visiMisi", e.target.value)}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border"
            />
          </div>

          <div className="space-y-1 md:col-span-2">
            <label className="text-sm font-medium">Program Unggulan (pisahkan dengan koma)</label>
            <input
              value={form.programs}
              onChange={(e) => handleChange(null, "programs", e.target.value)}
              className="w-full px-3 py-2 rounded-lg border"
              placeholder="Kebersihan sekolah, Literasi pagi, ..."
            />
          </div>

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
