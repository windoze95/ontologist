import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../../context/AppContext'
import {
  GraduationCap,
  User,
  Building2,
  Briefcase,
  FileText,
  Upload,
  Plus,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Loader2,
} from 'lucide-react'

const STEPS = [
  { label: 'Welcome', icon: GraduationCap },
  { label: 'About You', icon: User },
  { label: 'Platform', icon: Building2 },
  { label: 'Accomplishments', icon: Briefcase },
  { label: 'Review', icon: Check },
]

export default function OnboardingWizard() {
  const navigate = useNavigate()
  const { dispatch } = useApp()
  const [step, setStep] = useState(0)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [parsing, setParsing] = useState(false)

  const [form, setForm] = useState({
    display_name: '',
    company_name: '',
    job_title: '',
    years_experience: '',
    platform_background: '',
    accomplishments: [],
  })

  const [resumeFile, setResumeFile] = useState(null)

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
    setResumeFile(file)
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
      // silently handle errors
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
      navigate('/')
    } catch {
      // silently handle
    } finally {
      setSaving(false)
    }
  }

  const canProceedStep1 = true
  const canProceedStep2 = form.display_name.trim() && form.company_name.trim()
  const canProceed = [canProceedStep1, canProceedStep2, true, true, true]

  return (
    <div className="min-h-screen bg-navy-900 flex flex-col">
      {/* Progress stepper */}
      <div className="w-full max-w-3xl mx-auto px-6 pt-8 pb-4">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const isActive = i === step
            const isComplete = i < step
            return (
              <div key={s.label} className="flex items-center flex-1 last:flex-0">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200 ${
                      isComplete
                        ? 'bg-electric-500 border-electric-500 text-white'
                        : isActive
                          ? 'border-electric-500 text-electric-500 bg-navy-800'
                          : 'border-navy-600 text-slate-500 bg-navy-800'
                    }`}
                  >
                    {isComplete ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </div>
                  <span
                    className={`text-xs mt-1.5 ${isActive ? 'text-electric-500' : isComplete ? 'text-slate-300' : 'text-slate-500'}`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 mb-5 ${isComplete ? 'bg-electric-500' : 'bg-navy-600'}`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-start justify-center px-6 py-4">
        <div className="w-full max-w-2xl">
          {step === 0 && <StepWelcome />}
          {step === 1 && <StepAboutYou form={form} updateField={updateField} />}
          {step === 2 && <StepPlatform form={form} updateField={updateField} />}
          {step === 3 && (
            <StepAccomplishments
              form={form}
              addAccomplishment={addAccomplishment}
              updateAccomplishment={updateAccomplishment}
              removeAccomplishment={removeAccomplishment}
              onResumeUpload={handleResumeUpload}
              resumeFile={resumeFile}
              uploading={uploading}
              parsing={parsing}
            />
          )}
          {step === 4 && <StepReview form={form} onEditStep={setStep} />}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="w-full max-w-2xl mx-auto px-6 py-6 flex items-center justify-between">
        {step > 0 ? (
          <button
            onClick={() => setStep((s) => s - 1)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-navy-700 transition-all duration-200"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </button>
        ) : (
          <div />
        )}

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            disabled={!canProceed[step]}
            className="flex items-center gap-2 px-6 py-2 bg-electric-500 hover:bg-electric-400 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-200"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-electric-500 hover:bg-electric-400 disabled:opacity-50 text-white rounded-lg transition-all duration-200"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Save & Start
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}

function StepWelcome() {
  return (
    <div className="bg-navy-800 rounded-xl border border-navy-600 p-8 text-center">
      <GraduationCap className="h-16 w-16 text-electric-500 mx-auto mb-6" />
      <h1 className="text-3xl font-bold text-white mb-4">Welcome to Ontologist</h1>
      <p className="text-slate-400 text-lg max-w-lg mx-auto">
        Ontologist is your personalized Foundry prep companion. Let's set up your profile to tailor
        the experience.
      </p>
    </div>
  )
}

function StepAboutYou({ form, updateField }) {
  return (
    <div className="bg-navy-800 rounded-xl border border-navy-600 p-8">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <User className="h-5 w-5 text-electric-500" />
        About You
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Display Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.display_name}
            onChange={(e) => updateField('display_name', e.target.value)}
            placeholder="Your name"
            className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">
            Company Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            value={form.company_name}
            onChange={(e) => updateField('company_name', e.target.value)}
            placeholder="Current or target company"
            className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm text-slate-400 mb-1">Job Title</label>
          <input
            type="text"
            value={form.job_title}
            onChange={(e) => updateField('job_title', e.target.value)}
            placeholder="e.g., Solutions Architect"
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
            placeholder="e.g., 5"
            className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
          />
        </div>
      </div>
    </div>
  )
}

function StepPlatform({ form, updateField }) {
  return (
    <div className="bg-navy-800 rounded-xl border border-navy-600 p-8">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Building2 className="h-5 w-5 text-electric-500" />
        Platform Background
      </h2>
      <div>
        <label className="block text-sm text-slate-400 mb-1">
          What platforms have you worked with?
        </label>
        <input
          type="text"
          value={form.platform_background}
          onChange={(e) => updateField('platform_background', e.target.value)}
          placeholder="e.g., ServiceNow, Salesforce, AWS, Snowflake"
          className="w-full bg-navy-700 border border-navy-600 rounded-lg px-3 py-2 text-slate-200 placeholder-slate-500 focus:border-electric-500/50 focus:outline-none transition-colors"
        />
        <p className="text-xs text-slate-500 mt-2">
          This will be used to create analogies between platforms you know and Palantir Foundry
          concepts, making it easier to learn.
        </p>
      </div>
    </div>
  )
}

function StepAccomplishments({
  form,
  addAccomplishment,
  updateAccomplishment,
  removeAccomplishment,
  onResumeUpload,
  resumeFile,
  uploading,
  parsing,
}) {
  return (
    <div className="bg-navy-800 rounded-xl border border-navy-600 p-8">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Briefcase className="h-5 w-5 text-electric-500" />
        Accomplishments
      </h2>

      {/* Resume upload */}
      <div className="mb-6 p-4 bg-navy-700/50 rounded-lg border border-navy-600">
        <p className="text-sm text-slate-300 mb-3 flex items-center gap-2">
          <Upload className="h-4 w-4 text-electric-500" />
          Upload a resume to auto-fill accomplishments
        </p>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 px-4 py-2 bg-navy-700 border border-navy-600 rounded-lg text-sm text-slate-300 hover:bg-navy-600 cursor-pointer transition-colors">
            <FileText className="h-4 w-4" />
            {resumeFile ? resumeFile.name : 'Choose PDF or TXT'}
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={(e) => onResumeUpload(e.target.files[0])}
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

      {/* Manual accomplishments */}
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
  )
}

function StepReview({ form, onEditStep }) {
  return (
    <div className="space-y-4">
      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <User className="h-5 w-5 text-electric-500" />
            About You
          </h3>
          <button
            onClick={() => onEditStep(1)}
            className="text-sm text-electric-500 hover:text-electric-400 transition-colors"
          >
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <span className="text-slate-500">Name</span>
            <p className="text-slate-200">{form.display_name || '-'}</p>
          </div>
          <div>
            <span className="text-slate-500">Company</span>
            <p className="text-slate-200">{form.company_name || '-'}</p>
          </div>
          <div>
            <span className="text-slate-500">Title</span>
            <p className="text-slate-200">{form.job_title || '-'}</p>
          </div>
          <div>
            <span className="text-slate-500">Experience</span>
            <p className="text-slate-200">
              {form.years_experience ? `${form.years_experience} years` : '-'}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Building2 className="h-5 w-5 text-electric-500" />
            Platform Background
          </h3>
          <button
            onClick={() => onEditStep(2)}
            className="text-sm text-electric-500 hover:text-electric-400 transition-colors"
          >
            Edit
          </button>
        </div>
        <p className="text-sm text-slate-200">{form.platform_background || '-'}</p>
      </div>

      <div className="bg-navy-800 rounded-xl border border-navy-600 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-electric-500" />
            Accomplishments
          </h3>
          <button
            onClick={() => onEditStep(3)}
            className="text-sm text-electric-500 hover:text-electric-400 transition-colors"
          >
            Edit
          </button>
        </div>
        {form.accomplishments.length === 0 ? (
          <p className="text-sm text-slate-500">No accomplishments added yet.</p>
        ) : (
          <div className="space-y-3">
            {form.accomplishments.map((acc, i) => (
              <div key={i} className="p-3 bg-navy-700/50 rounded-lg">
                <p className="text-sm font-medium text-slate-200">{acc.title}</p>
                {acc.description && (
                  <p className="text-xs text-slate-400 mt-1">{acc.description}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
