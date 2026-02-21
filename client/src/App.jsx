import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout/Layout'
import StudyPlan from './components/StudyPlan/StudyPlan'
import SectionDetail from './components/StudyPlan/SectionDetail'
import OnboardingWizard from './components/Onboarding/OnboardingWizard'
import RequireProfile from './components/Guards/RequireProfile'

// Lazy-load heavier feature pages
import { lazy, Suspense } from 'react'

const FlashcardEngine = lazy(() => import('./components/Flashcards/FlashcardEngine'))
const QuizEngine = lazy(() => import('./components/Quiz/QuizEngine'))
const RosettaStone = lazy(() => import('./components/RosettaStone/RosettaStone'))
const LabWalkthrough = lazy(() => import('./components/Labs/LabWalkthrough'))
const MockInterview = lazy(() => import('./components/MockInterview/MockInterview'))
const TranslateExperience = lazy(() => import('./components/TranslateExperience/TranslateExperience'))
const ProgressDashboard = lazy(() => import('./components/Progress/ProgressDashboard'))
const ProfileManager = lazy(() => import('./components/Profile/ProfileManager'))

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-pulse text-slate-400">Loading...</div>
    </div>
  )
}

export default function App() {
  return (
    <RequireProfile
      fallback={<OnboardingWizard />}
      loading={
        <div className="flex items-center justify-center h-screen bg-navy-900">
          <div className="animate-pulse text-slate-400 text-lg">Loading Ontologist...</div>
        </div>
      }
    >
      <Layout>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/onboarding" element={<OnboardingWizard />} />
            <Route path="/" element={<StudyPlan />} />
            <Route path="/profile" element={<ProfileManager />} />
            <Route path="/section/:sectionNum" element={<SectionDetail />} />
            <Route path="/flashcards/:section?" element={<FlashcardEngine />} />
            <Route path="/quiz/:section" element={<QuizEngine />} />
            <Route path="/rosetta-stone" element={<RosettaStone />} />
            <Route path="/lab/:labId" element={<LabWalkthrough />} />
            <Route path="/interview/:type" element={<MockInterview />} />
            <Route path="/translate" element={<TranslateExperience />} />
            <Route path="/progress" element={<ProgressDashboard />} />
          </Routes>
        </Suspense>
      </Layout>
    </RequireProfile>
  )
}
