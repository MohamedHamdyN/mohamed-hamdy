"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  // stats
  getAboutStats,
  upsertAboutStats,

  // experience
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
  type Experience,

  // education
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
  type Education,

  // certifications
  getCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
  type Certification,
} from "@/app/actions/cms"

type SectionKey = "stats" | "experience" | "education" | "certifications"

const emptyExperience = {
  year: "",
  title: "",
  details: "",
  enabled: true,
  order: 0,
}

const emptyEducation = {
  year: "",
  degree: "",
  institution: "",
  details: "",
  enabled: true,
  order: 0,
}

const emptyCertification = {
  title: "",
  issuer: "",
  issue_date: "",
  credential_url: "",
  description: "",
  enabled: true,
  order: 0,
}

export default function AdminAboutClient() {
  const [active, setActive] = useState<SectionKey>("stats")

  const [globalError, setGlobalError] = useState<string | null>(null)
  const [globalOk, setGlobalOk] = useState<string | null>(null)

  // ---- Stats ----
  const [statsLoading, setStatsLoading] = useState(true)
  const [statsSaving, setStatsSaving] = useState(false)
  const [years, setYears] = useState<number>(0)
  const [followers, setFollowers] = useState<number>(0)
  const [courses, setCourses] = useState<number>(0)

  // ---- Experience ----
  const [expLoading, setExpLoading] = useState(true)
  const [expSaving, setExpSaving] = useState(false)
  const [expItems, setExpItems] = useState<Experience[]>([])
  const [expEditingId, setExpEditingId] = useState<number | null>(null)
  const [expForm, setExpForm] = useState({ ...emptyExperience })

  // ---- Education ----
  const [eduLoading, setEduLoading] = useState(true)
  const [eduSaving, setEduSaving] = useState(false)
  const [eduItems, setEduItems] = useState<Education[]>([])
  const [eduEditingId, setEduEditingId] = useState<number | null>(null)
  const [eduForm, setEduForm] = useState({ ...emptyEducation })

  // ---- Certifications ----
  const [certLoading, setCertLoading] = useState(true)
  const [certSaving, setCertSaving] = useState(false)
  const [certItems, setCertItems] = useState<Certification[]>([])
  const [certEditingId, setCertEditingId] = useState<number | null>(null)
  const [certForm, setCertForm] = useState({ ...emptyCertification })

  function toastOk(msg: string) {
    setGlobalOk(msg)
    setTimeout(() => setGlobalOk(null), 1500)
  }

  function toastErr(msg: string) {
    setGlobalError(msg)
    setTimeout(() => setGlobalError(null), 2500)
  }

  async function loadAll() {
    try {
      setGlobalError(null)

      setStatsLoading(true)
      setExpLoading(true)
      setEduLoading(true)
      setCertLoading(true)

      const [stats, exps, edus, certs] = await Promise.all([
        getAboutStats(),
        getExperiences(),
        getEducations(),
        getCertifications(),
      ])

      // stats
      setYears(stats?.years_of_experience ?? 0)
      setFollowers(stats?.linkedin_followers ?? 0)
      setCourses(stats?.completed_courses ?? 0)

      // lists
      setExpItems(exps ?? [])
      setEduItems(edus ?? [])
      setCertItems(certs ?? [])
    } catch {
      toastErr("Failed to load About data")
    } finally {
      setStatsLoading(false)
      setExpLoading(false)
      setEduLoading(false)
      setCertLoading(false)
    }
  }

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // =========================
  // Stats actions
  // =========================
  async function saveStats() {
    try {
      setStatsSaving(true)
      setGlobalError(null)

      const res = await upsertAboutStats({
        years_of_experience: Number(years ?? 0),
        linkedin_followers: Number(followers ?? 0),
        completed_courses: Number(courses ?? 0),
      })

      if ((res as any)?.error) {
        toastErr((res as any).error)
        return
      }

      toastOk("Stats saved ✅")
      // reload to reflect DB truth
      const stats = await getAboutStats()
      setYears(stats?.years_of_experience ?? 0)
      setFollowers(stats?.linkedin_followers ?? 0)
      setCourses(stats?.completed_courses ?? 0)
    } catch {
      toastErr("Failed to save stats")
    } finally {
      setStatsSaving(false)
    }
  }

  // =========================
  // Experience actions
  // =========================
  function expStartAdd() {
    setExpEditingId(null)
    setExpForm({ ...emptyExperience })
  }

  function expStartEdit(x: Experience) {
    setExpEditingId(x.id)
    setExpForm({
      year: x.year ?? "",
      title: x.title ?? "",
      details: x.details ?? "",
      enabled: x.enabled !== false,
      order: Number(x.order ?? 0),
    })
  }

  async function expSave() {
    try {
      setExpSaving(true)
      setGlobalError(null)

      if (!expForm.year.trim() || !expForm.title.trim() || !expForm.details.trim()) {
        toastErr("Year, Title, Details are required.")
        return
      }

      const payload = {
        year: expForm.year.trim(),
        title: expForm.title.trim(),
        details: expForm.details.trim(),
        enabled: Boolean(expForm.enabled),
        order: Number(expForm.order ?? 0),
      }

      const res = expEditingId
        ? await updateExperience(expEditingId, payload as any)
        : await createExperience(payload as any)

      if ((res as any)?.error) {
        toastErr((res as any).error)
        return
      }

      toastOk("Experience saved ✅")
      expStartAdd()
      const data = await getExperiences()
      setExpItems(data ?? [])
    } catch {
      toastErr("Failed to save experience")
    } finally {
      setExpSaving(false)
    }
  }

  async function expRemove(id: number) {
    if (!confirm("Delete this experience?")) return
    try {
      setExpSaving(true)
      const res = await deleteExperience(id)
      if ((res as any)?.error) {
        toastErr((res as any).error)
        return
      }
      const data = await getExperiences()
      setExpItems(data ?? [])
      toastOk("Deleted ✅")
    } finally {
      setExpSaving(false)
    }
  }

  // =========================
  // Education actions
  // =========================
  function eduStartAdd() {
    setEduEditingId(null)
    setEduForm({ ...emptyEducation })
  }

  function eduStartEdit(x: Education) {
    setEduEditingId(x.id)
    setEduForm({
      year: x.year ?? "",
      degree: x.degree ?? "",
      institution: x.institution ?? "",
      details: x.details ?? "",
      enabled: x.enabled !== false,
      order: Number(x.order ?? 0),
    })
  }

  async function eduSave() {
    try {
      setEduSaving(true)
      setGlobalError(null)

      if (!eduForm.year.trim() || !eduForm.degree.trim() || !eduForm.institution.trim() || !eduForm.details.trim()) {
        toastErr("Year, Degree, Institution, Details are required.")
        return
      }

      const payload = {
        year: eduForm.year.trim(),
        degree: eduForm.degree.trim(),
        institution: eduForm.institution.trim(),
        details: eduForm.details.trim(),
        enabled: Boolean(eduForm.enabled),
        order: Number(eduForm.order ?? 0),
      }

      const res = eduEditingId
        ? await updateEducation(eduEditingId, payload as any)
        : await createEducation(payload as any)

      if ((res as any)?.error) {
        toastErr((res as any).error)
        return
      }

      toastOk("Education saved ✅")
      eduStartAdd()
      const data = await getEducations()
      setEduItems(data ?? [])
    } catch {
      toastErr("Failed to save education")
    } finally {
      setEduSaving(false)
    }
  }

  async function eduRemove(id: number) {
    if (!confirm("Delete this education?")) return
    try {
      setEduSaving(true)
      const res = await deleteEducation(id)
      if ((res as any)?.error) {
        toastErr((res as any).error)
        return
      }
      const data = await getEducations()
      setEduItems(data ?? [])
      toastOk("Deleted ✅")
    } finally {
      setEduSaving(false)
    }
  }

  // =========================
  // Certifications actions
  // =========================
  function certStartAdd() {
    setCertEditingId(null)
    setCertForm({ ...emptyCertification })
  }

  function certStartEdit(x: Certification) {
    setCertEditingId(x.id)
    setCertForm({
      title: x.title ?? "",
      issuer: x.issuer ?? "",
      issue_date: x.issue_date ?? "",
      credential_url: x.credential_url ?? "",
      description: x.description ?? "",
      enabled: x.enabled !== false,
      order: Number(x.order ?? 0),
    })
  }

  async function certSave() {
    try {
      setCertSaving(true)
      setGlobalError(null)

      if (!certForm.title.trim() || !certForm.issuer.trim()) {
        toastErr("Title and Issuer are required.")
        return
      }

      const payload = {
        title: certForm.title.trim(),
        issuer: certForm.issuer.trim(),
        issue_date: certForm.issue_date.trim() ? certForm.issue_date.trim() : null,
        credential_url: certForm.credential_url.trim() ? certForm.credential_url.trim() : null,
        description: certForm.description.trim() ? certForm.description.trim() : null,
        enabled: Boolean(certForm.enabled),
        order: Number(certForm.order ?? 0),
      }

      const res = certEditingId
        ? await updateCertification(certEditingId, payload as any)
        : await createCertification(payload as any)

      if ((res as any)?.error) {
        toastErr((res as any).error)
        return
      }

      toastOk("Certification saved ✅")
      certStartAdd()
      const data = await getCertifications()
      setCertItems(data ?? [])
    } catch {
      toastErr("Failed to save certification")
    } finally {
      setCertSaving(false)
    }
  }

  async function certRemove(id: number) {
    if (!confirm("Delete this certification?")) return
    try {
      setCertSaving(true)
      const res = await deleteCertification(id)
      if ((res as any)?.error) {
        toastErr((res as any).error)
        return
      }
      const data = await getCertifications()
      setCertItems(data ?? [])
      toastOk("Deleted ✅")
    } finally {
      setCertSaving(false)
    }
  }

  const tabBtn = (key: SectionKey, label: string) => {
    const isActive = active === key
    return (
      <button
        type="button"
        onClick={() => setActive(key)}
        className={[
          "px-4 py-2 rounded-md border text-sm transition",
          isActive
            ? "bg-slate-700 border-slate-600 text-white"
            : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700/60",
        ].join(" ")}
      >
        {label}
      </button>
    )
  }

  return (
    <div className="space-y-6">
      {(globalError || globalOk) && (
        <div className="space-y-2">
          {globalError && <p className="text-red-400">{globalError}</p>}
          {globalOk && <p className="text-green-400">{globalOk}</p>}
        </div>
      )}

      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {tabBtn("stats", "Stats")}
        {tabBtn("experience", "Experience")}
        {tabBtn("education", "Education")}
        {tabBtn("certifications", "Certifications")}
        <Button
          type="button"
          onClick={loadAll}
          className="bg-slate-700 hover:bg-slate-600 ml-auto"
        >
          Refresh
        </Button>
      </div>

      {/* ================= Stats ================= */}
      {active === "stats" && (
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-white font-semibold">About Stats</h2>
            <Button
              onClick={saveStats}
              disabled={statsSaving || statsLoading}
              className="bg-green-600 hover:bg-green-700"
            >
              {statsSaving ? "Saving..." : "Save"}
            </Button>
          </div>

          {statsLoading ? (
            <p className="text-slate-400 mt-4">Loading...</p>
          ) : (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-900/40 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">Years of Experience</p>
                <input
                  type="number"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
                  min={0}
                />
              </div>

              <div className="p-4 bg-slate-900/40 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">LinkedIn Followers</p>
                <input
                  type="number"
                  value={followers}
                  onChange={(e) => setFollowers(Number(e.target.value))}
                  className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
                  min={0}
                />
              </div>

              <div className="p-4 bg-slate-900/40 rounded-lg">
                <p className="text-slate-400 text-sm mb-2">Completed Courses</p>
                <input
                  type="number"
                  value={courses}
                  onChange={(e) => setCourses(Number(e.target.value))}
                  className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
                  min={0}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= Experience ================= */}
      {active === "experience" && (
        <div className="space-y-6">
          {/* Form */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-white font-semibold">
                Experience {expEditingId ? `(Edit #${expEditingId})` : "(Add New)"}
              </h2>

              <div className="flex gap-2">
                <Button onClick={expStartAdd} className="bg-slate-700 hover:bg-slate-600">
                  + New
                </Button>
                <Button onClick={expSave} disabled={expSaving} className="bg-green-600 hover:bg-green-700">
                  {expSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={expForm.year}
                onChange={(e) => setExpForm((p) => ({ ...p, year: e.target.value }))}
                placeholder="Year (e.g. 2025)"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <input
                value={expForm.title}
                onChange={(e) => setExpForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Title"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <input
                type="number"
                value={expForm.order}
                onChange={(e) => setExpForm((p) => ({ ...p, order: Number(e.target.value) }))}
                placeholder="Order"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <label className="flex items-center gap-2 text-slate-200">
                <input
                  type="checkbox"
                  checked={expForm.enabled}
                  onChange={(e) => setExpForm((p) => ({ ...p, enabled: e.target.checked }))}
                />
                Enabled
              </label>
            </div>

            <textarea
              value={expForm.details}
              onChange={(e) => setExpForm((p) => ({ ...p, details: e.target.value }))}
              placeholder="Details"
              className="mt-4 w-full min-h-[140px] rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>

          {/* List */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Items ({expItems.length})</h3>

            {expLoading ? (
              <p className="text-slate-400">Loading...</p>
            ) : expItems.length === 0 ? (
              <p className="text-slate-400">No items yet.</p>
            ) : (
              <div className="space-y-3">
                {expItems.map((x) => (
                  <div key={x.id} className="p-4 bg-slate-900/40 rounded-lg flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white font-semibold">
                        {x.year} — {x.title}{" "}
                        {x.enabled ? "" : <span className="text-slate-400">(disabled)</span>}
                      </p>
                      <p className="text-slate-300 text-sm mt-1 whitespace-pre-line">{x.details}</p>
                      <p className="text-slate-500 text-xs mt-2">order: {x.order}</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-blue-400 hover:text-blue-300" onClick={() => expStartEdit(x)}>
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300" onClick={() => expRemove(x.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= Education ================= */}
      {active === "education" && (
        <div className="space-y-6">
          {/* Form */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-white font-semibold">
                Education {eduEditingId ? `(Edit #${eduEditingId})` : "(Add New)"}
              </h2>

              <div className="flex gap-2">
                <Button onClick={eduStartAdd} className="bg-slate-700 hover:bg-slate-600">
                  + New
                </Button>
                <Button onClick={eduSave} disabled={eduSaving} className="bg-green-600 hover:bg-green-700">
                  {eduSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={eduForm.year}
                onChange={(e) => setEduForm((p) => ({ ...p, year: e.target.value }))}
                placeholder="Year"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <input
                value={eduForm.degree}
                onChange={(e) => setEduForm((p) => ({ ...p, degree: e.target.value }))}
                placeholder="Degree"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <input
                value={eduForm.institution}
                onChange={(e) => setEduForm((p) => ({ ...p, institution: e.target.value }))}
                placeholder="Institution"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <input
                type="number"
                value={eduForm.order}
                onChange={(e) => setEduForm((p) => ({ ...p, order: Number(e.target.value) }))}
                placeholder="Order"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <label className="flex items-center gap-2 text-slate-200">
                <input
                  type="checkbox"
                  checked={eduForm.enabled}
                  onChange={(e) => setEduForm((p) => ({ ...p, enabled: e.target.checked }))}
                />
                Enabled
              </label>
            </div>

            <textarea
              value={eduForm.details}
              onChange={(e) => setEduForm((p) => ({ ...p, details: e.target.value }))}
              placeholder="Details"
              className="mt-4 w-full min-h-[140px] rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>

          {/* List */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Items ({eduItems.length})</h3>

            {eduLoading ? (
              <p className="text-slate-400">Loading...</p>
            ) : eduItems.length === 0 ? (
              <p className="text-slate-400">No items yet.</p>
            ) : (
              <div className="space-y-3">
                {eduItems.map((x) => (
                  <div key={x.id} className="p-4 bg-slate-900/40 rounded-lg flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white font-semibold">
                        {x.year} — {x.degree} @ {x.institution}{" "}
                        {x.enabled ? "" : <span className="text-slate-400">(disabled)</span>}
                      </p>
                      <p className="text-slate-300 text-sm mt-1 whitespace-pre-line">{x.details}</p>
                      <p className="text-slate-500 text-xs mt-2">order: {x.order}</p>
                    </div>
                    <div className="flex gap-3">
                      <button className="text-blue-400 hover:text-blue-300" onClick={() => eduStartEdit(x)}>
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300" onClick={() => eduRemove(x.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= Certifications ================= */}
      {active === "certifications" && (
        <div className="space-y-6">
          {/* Form */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-white font-semibold">
                Certifications {certEditingId ? `(Edit #${certEditingId})` : "(Add New)"}
              </h2>

              <div className="flex gap-2">
                <Button onClick={certStartAdd} className="bg-slate-700 hover:bg-slate-600">
                  + New
                </Button>
                <Button onClick={certSave} disabled={certSaving} className="bg-green-600 hover:bg-green-700">
                  {certSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                value={certForm.title}
                onChange={(e) => setCertForm((p) => ({ ...p, title: e.target.value }))}
                placeholder="Title"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <input
                value={certForm.issuer}
                onChange={(e) => setCertForm((p) => ({ ...p, issuer: e.target.value }))}
                placeholder="Issuer"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <input
                value={certForm.issue_date}
                onChange={(e) => setCertForm((p) => ({ ...p, issue_date: e.target.value }))}
                placeholder="Issue Date (e.g. 2025 or 2025-08)"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <input
                value={certForm.credential_url}
                onChange={(e) => setCertForm((p) => ({ ...p, credential_url: e.target.value }))}
                placeholder="Credential URL"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <input
                type="number"
                value={certForm.order}
                onChange={(e) => setCertForm((p) => ({ ...p, order: Number(e.target.value) }))}
                placeholder="Order"
                className="w-full rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
              />
              <label className="flex items-center gap-2 text-slate-200">
                <input
                  type="checkbox"
                  checked={certForm.enabled}
                  onChange={(e) => setCertForm((p) => ({ ...p, enabled: e.target.checked }))}
                />
                Enabled
              </label>
            </div>

            <textarea
              value={certForm.description}
              onChange={(e) => setCertForm((p) => ({ ...p, description: e.target.value }))}
              placeholder="Description"
              className="mt-4 w-full min-h-[140px] rounded-md bg-slate-900 border border-slate-700 px-3 py-2 text-slate-100"
            />
          </div>

          {/* List */}
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h3 className="text-white font-semibold mb-4">Items ({certItems.length})</h3>

            {certLoading ? (
              <p className="text-slate-400">Loading...</p>
            ) : certItems.length === 0 ? (
              <p className="text-slate-400">No items yet.</p>
            ) : (
              <div className="space-y-3">
                {certItems.map((x) => (
                  <div key={x.id} className="p-4 bg-slate-900/40 rounded-lg flex items-start justify-between gap-4">
                    <div>
                      <p className="text-white font-semibold">
                        {x.title} — {x.issuer}{" "}
                        {x.enabled ? "" : <span className="text-slate-400">(disabled)</span>}
                      </p>
                      {x.issue_date ? (
                        <p className="text-slate-400 text-sm mt-1">date: {x.issue_date}</p>
                      ) : null}
                      {x.credential_url ? (
                        <p className="text-slate-400 text-sm mt-1 break-all">{x.credential_url}</p>
                      ) : null}
                      {x.description ? (
                        <p className="text-slate-300 text-sm mt-2 whitespace-pre-line">{x.description}</p>
                      ) : null}
                      <p className="text-slate-500 text-xs mt-2">order: {x.order}</p>
                    </div>

                    <div className="flex gap-3">
                      <button className="text-blue-400 hover:text-blue-300" onClick={() => certStartEdit(x)}>
                        Edit
                      </button>
                      <button className="text-red-400 hover:text-red-300" onClick={() => certRemove(x.id)}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}