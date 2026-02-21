import { useState, useEffect } from 'react'
import { useApp } from '../../context/AppContext'
import {
  User,
  Building2,
  Briefcase,
  FileText,
  Upload,
  Plus,
  Trash2,
  Save,
  Sparkles,
  Loader2,
} from 'lucide-react'

export default function ProfileManager() {
  const { state, dispatch } = useApp()
  const [form, setForm] = useState({
    display_name: '',
    company_name: '',
    job_title: '',
    years_experience: '',
    platform_background: '',
    accomplishments: [],
  })
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [parsing, setParsing] = useState(false)
  const [refiningIndex, setRefiningIndex] = useState(null)

  useEffect(() => {
    if (state.profile) {
      let accomplishments = state.profile.accomplishments || []
      if (typeof accomplishments === 'string') {
        try { accomplishments = JSON.parse(accomplishments) } catch { accomplishments = [] }
      }
      setForm({
        display_name: state.profile.display_name || '',
        company_name: state.profile.company_name || '',
        job_title: state.profile.job_title || '',
        years_experience: state.profile.years_experience || '',
        platform_background: state.profile.platform_background || '',
        accomplishments,
      })
    }
  }, [state.profile])

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function addAccomplishment() {
    setForm((prev) => ({
      ...prev,
      accomplishments: [...prev.accomplishments, { title: '', description: '' }],
    }))
  }

  function updateAccomplishment(index, field, value) {
    setForm((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.map((a, i) =>
        i === index ? { ...a, [field]: value } : a
      ),
    }))
  }

  function removeAccomplishment(index) {
    setForm((prev) => ({
      ...prev,
      accomplishments: prev.accomplishments.filter((_, i) => i !== index),
    }))
  }

  async function handleResumeUpload(file) {
    if (!file) return
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('resume', file)
      const uploadRes = await fetch('/api/profile/resume', {
        method: 'POST',
        body: formData,
      })
      if (!uploadRes.ok) throw new Error('Upload failed')

      const uploadData = await uploadRes.json()
      setParsing(true)
      setUploading(false)

      const parseRes = await fetch('/api/profile/resume/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: uploadData.text }),
      })
      if (!parseRes.ok) throw new Error('Parse failed')
      const parsed = await parseRes.json()

      setForm((prev) => ({
        ...prev,
        display_name: parsed.display_name || prev.display_name,
        company_name: parsed.company_name || prev.company_name,
        job_title: parsed.job_title || prev.job_title,
        years_experience: parsed.years_experience || prev.years_experience,
        platform_background: parsed.platform_background || prev.platform_background,
        accomplishments:
          parsed.accomplishments?.length > 0 ? parsed.accomplishments : prev.accomplishments,
      }))
    } catch {
      // silently handle
    } finally {
      setUploading(false)
      setParsing(false)
    }
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Save failed')
      const saved = await res.json()
      dispatch({ type: 'SET_PROFILE', payload: saved })
    } catch {
      // silently handle
    } finally {
      setSaving(false)
    }
  }

  async function refineAccomplishment(index) {
    const acc = form.accomplishments[index]
    if (!acc.title && !acc.description) return
    setRefiningIndex(index)

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: `Refine this accomplishment for a Foundry audience:\n\nTitle: ${acc.title}\nDescription: ${acc.description || acc.original || ''}` }],
          mode: 'resume-refiner',
        }),
      })
      if (!res.ok) throw new Error('Refine failed')
      const data = await res.json()
      const refined = data.content?.[0]?.text
      if (refined) {
        updateAccomplishment(index, 'description', refined)
      }
    } catch {
      // silently handle
    } finally {
      setRefiningIndex(null)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Profile</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-4 py-2 bg-electric-500 hover:bg-electric-400 disabled:opacity-50 text-white rounded-lg transition-all duration-200"
        >
          {saving ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="h-4 w-4" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Profile fields */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <User className="h-5 w-5 text-electric-500" />
          Personal Info
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-400 mb-1">Display Name</label>
            <input
              type="text"
              value={form.display_name}
              onChange={(e) => updateField('display_name', e.target.value)}
              className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Company</label>
            <input
              type="text"
              value={form.company_name}
              onChange={(e) => updateField('company_name', e.target.value)}
              className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Job Title</label>
            <input
              type="text"
              value={form.job_title}
              onChange={(e) => updateField('job_title', e.target.value)}
              className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-slate-400 mb-1">Years of Experience</label>
            <input
              type="number"
              min="0"
              value={form.years_experience}
              onChange={(e) => updateField('years_experience', e.target.value)}
              className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Platform background */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-electric-500" />
          Platform Background
        </h2>
        <input
          type="text"
          value={form.platform_background}
          onChange={(e) => updateField('platform_background', e.target.value)}
          placeholder="e.g., ServiceNow, Salesforce, AWS"
          className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
        />
        <p className="text-xs text-slate-500 mt-2">
          Used to create analogies between platforms you know and Foundry concepts.
        </p>
      </div>

      {/* Resume upload */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FileText className="h-5 w-5 text-electric-500" />
          Resume
        </h2>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-navy-700 border border-navy-600 rounded-lg text-sm text-slate-300 hover:bg-navy-600 cursor-pointer transition-colors">
            <Upload className="h-4 w-4" />
            Upload Resume (PDF/TXT)
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => handleResumeUpload(e.target.files[0])}
              className="hidden"
            />
          </label>
          {(uploading || parsing) && (
            <span className="flex items-center gap-2 text-sm text-slate-400">
              <Loader2 className="h-4 w-4 animate-spin" />
              {uploading ? 'Uploading...' : 'Parsing resume...'}
            </span>
          )}
        </div>
      </div>

      {/* Accomplishments */}
      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-electric-500" />
          Accomplishments
        </h2>
        <div className="space-y-3">
          {form.accomplishments.map((acc, i) => (
            <div key={i} className="p-4 bg-navy-700/50 rounded-lg border border-navy-600">
              <div className="flex items-start justify-between gap-2 mb-2">
                <input
                  type="text"
                  value={acc.title}
                  onChange={(e) => updateAccomplishment(i, 'title', e.target.value)}
                  placeholder="Accomplishment title"
                  className="flex-1 bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
                />
                <button
                  onClick={() => removeAccomplishment(i)}
                  className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={acc.description}
                onChange={(e) => updateAccomplishment(i, 'description', e.target.value)}
                placeholder="Describe what you did and the impact"
                rows={2}
                className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors resize-none"
              />
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => refineAccomplishment(i)}
                  disabled={refiningIndex === i}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-electric-500 hover:bg-electric-500/10 rounded-lg transition-all duration-200 disabled:opacity-50"
                >
                  {refiningIndex === i ? (
                    <>
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      Refining...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      Refine for Foundry
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}

          <button
            onClick={addAccomplishment}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-400 hover:text-electric-500 hover:bg-navy-700 rounded-lg transition-all duration-200"
          >
            <Plus className="h-4 w-4" />
            Add accomplishment
          </button>
        </div>
      </div>
    </div>
  )
}
