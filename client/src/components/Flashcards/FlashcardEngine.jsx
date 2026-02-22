import { useState, useMemo, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Brain,
  BookOpen,
  Trophy,
  Filter,
  ArrowLeft,
} from 'lucide-react'
import { useProgress } from '../../hooks/useAI'
import { useApp } from '../../context/AppContext'
import { flashcards } from '../../data/flashcards'

const DIFFICULTY_COLORS = {
  beginner: 'bg-success-500/20 text-success-400',
  intermediate: 'bg-warning-500/20 text-warning-500',
  advanced: 'bg-danger-500/20 text-danger-500',
}

const CATEGORY_COLORS = {
  ontology: 'bg-electric-500/20 text-electric-400',
  pipeline: 'bg-purple-500/20 text-purple-400',
  workshop: 'bg-amber-500/20 text-amber-400',
  aip: 'bg-emerald-500/20 text-emerald-400',
  security: 'bg-rose-500/20 text-rose-400',
  platform: 'bg-cyan-500/20 text-cyan-400',
  integration: 'bg-orange-500/20 text-orange-400',
}

function getCardBox(cardId, flashcardProgress) {
  const fp = flashcardProgress?.find?.((p) => p.card_id === cardId)
  return fp?.box ?? 0
}

function isCardDue(cardId, flashcardProgress) {
  const fp = flashcardProgress?.find?.((p) => p.card_id === cardId)
  if (!fp) return true
  if (!fp.next_review) return true
  return new Date(fp.next_review) <= new Date()
}

export default function FlashcardEngine() {
  const { section } = useParams()
  const { updateFlashcard } = useProgress()
  const { state, dispatch } = useApp()
  const { flashcardProgress } = state

  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [reviewedCards, setReviewedCards] = useState(new Set())
  const [showFilters, setShowFilters] = useState(false)

  const filteredCards = useMemo(() => {
    let cards = flashcards
    if (section) {
      cards = cards.filter((c) => c.section === Number(section))
    } else {
      cards = cards.filter((c) => isCardDue(c.id, flashcardProgress))
    }
    if (selectedCategory) {
      cards = cards.filter((c) => c.category === selectedCategory)
    }
    return cards
  }, [section, selectedCategory, flashcardProgress])

  const categories = useMemo(() => {
    const base = section
      ? flashcards.filter((c) => c.section === Number(section))
      : flashcards
    return [...new Set(base.map((c) => c.category))]
  }, [section])

  const stats = useMemo(() => {
    const all = section
      ? flashcards.filter((c) => c.section === Number(section))
      : flashcards
    let mastered = 0
    let learning = 0
    let due = 0
    all.forEach((card) => {
      const box = getCardBox(card.id, flashcardProgress)
      if (box >= 4) mastered++
      else if (box > 0) learning++
      if (isCardDue(card.id, flashcardProgress)) due++
    })
    return { total: all.length, mastered, learning, due }
  }, [section, flashcardProgress])

  const currentCard = filteredCards[currentIndex]

  const handleFlip = useCallback(() => {
    setIsFlipped((f) => !f)
  }, [])

  const handleRate = useCallback(
    async (rating) => {
      if (!currentCard) return
      const correct = rating !== 'hard'
      await updateFlashcard(currentCard.id, correct)

      // Optimistically update local flashcard progress
      const existing = flashcardProgress?.find?.((p) => p.card_id === currentCard.id)
      const currentBox = existing?.box ?? 0
      let newBox
      if (rating === 'easy') newBox = Math.min(currentBox + 2, 5)
      else if (rating === 'good') newBox = Math.min(currentBox + 1, 5)
      else newBox = Math.max(currentBox - 1, 0)

      const intervals = [0, 1, 2, 4, 7, 14]
      const nextReview = new Date()
      nextReview.setDate(nextReview.getDate() + intervals[newBox])

      const updatedProgress = flashcardProgress?.some?.((p) => p.card_id === currentCard.id)
        ? flashcardProgress.map((p) =>
            p.card_id === currentCard.id
              ? { ...p, box: newBox, next_review: nextReview.toISOString() }
              : p
          )
        : [
            ...(flashcardProgress || []),
            { card_id: currentCard.id, box: newBox, next_review: nextReview.toISOString() },
          ]
      dispatch({ type: 'SET_FLASHCARD_PROGRESS', payload: updatedProgress })

      setReviewedCards((prev) => new Set([...prev, currentCard.id]))
      setIsFlipped(false)

      if (currentIndex < filteredCards.length - 1) {
        setCurrentIndex((i) => i + 1)
      }
    },
    [currentCard, currentIndex, filteredCards.length, flashcardProgress, updateFlashcard, dispatch]
  )

  const goToCard = useCallback(
    (direction) => {
      setIsFlipped(false)
      if (direction === 'prev' && currentIndex > 0) {
        setCurrentIndex((i) => i - 1)
      } else if (direction === 'next' && currentIndex < filteredCards.length - 1) {
        setCurrentIndex((i) => i + 1)
      }
    },
    [currentIndex, filteredCards.length]
  )

  const resetProgress = useCallback(() => {
    setCurrentIndex(0)
    setIsFlipped(false)
    setReviewedCards(new Set())
  }, [])

  const progressPercent =
    filteredCards.length > 0
      ? Math.round((reviewedCards.size / filteredCards.length) * 100)
      : 0

  if (filteredCards.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-16">
        <Brain className="w-16 h-16 text-slate-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-slate-300 mb-2">
          {section ? `No flashcards for Section ${section}` : 'No cards due for review'}
        </h2>
        <p className="text-slate-400 mb-6">
          {section
            ? 'Try selecting a different section or removing filters.'
            : 'All caught up! Check back later or study a specific section.'}
        </p>
        {selectedCategory && (
          <button
            onClick={() => setSelectedCategory(null)}
            className="px-4 py-2 bg-electric-500 text-white rounded-lg hover:bg-electric-400 transition-all duration-200"
          >
            Clear Filters
          </button>
        )}
        <Link
          to="/"
          className="ml-3 inline-flex items-center gap-2 px-4 py-2 bg-navy-700 text-slate-300 rounded-lg hover:bg-navy-600 transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Study Plan
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-300">
            {section ? `Section ${section} Flashcards` : 'Flashcard Review'}
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Click card to flip, then rate your recall
          </p>
        </div>
        <Link
          to={section ? `/section/${section}` : '/'}
          className="flex items-center gap-2 text-slate-400 hover:text-electric-400 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-navy-800 rounded-xl p-4 border border-navy-600">
          <div className="flex items-center gap-2 text-electric-400 mb-1">
            <BookOpen className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Due</span>
          </div>
          <span className="text-2xl font-bold text-slate-300">{stats.due}</span>
        </div>
        <div className="bg-navy-800 rounded-xl p-4 border border-navy-600">
          <div className="flex items-center gap-2 text-warning-500 mb-1">
            <Brain className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Learning</span>
          </div>
          <span className="text-2xl font-bold text-slate-300">{stats.learning}</span>
        </div>
        <div className="bg-navy-800 rounded-xl p-4 border border-navy-600">
          <div className="flex items-center gap-2 text-success-400 mb-1">
            <Trophy className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Mastered</span>
          </div>
          <span className="text-2xl font-bold text-slate-300">{stats.mastered}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-slate-400 mb-1">
          <span>
            Card {currentIndex + 1} of {filteredCards.length}
          </span>
          <span>{progressPercent}% reviewed</span>
        </div>
        <div className="h-2 bg-navy-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-electric-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="mb-6">
        <button
          onClick={() => setShowFilters((f) => !f)}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-electric-400 transition-colors duration-200 mb-2"
        >
          <Filter className="w-4 h-4" />
          {showFilters ? 'Hide filters' : 'Show filters'}
        </button>
        {showFilters && (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => { setSelectedCategory(null); setCurrentIndex(0); setIsFlipped(false) }}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                !selectedCategory
                  ? 'bg-electric-500 text-white'
                  : 'bg-navy-700 text-slate-400 hover:bg-navy-600'
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setCurrentIndex(0); setIsFlipped(false) }}
                className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200 ${
                  selectedCategory === cat
                    ? 'bg-electric-500 text-white'
                    : 'bg-navy-700 text-slate-400 hover:bg-navy-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Flashcard */}
      <div
        className="relative cursor-pointer mb-6"
        style={{ perspective: '1000px' }}
        onClick={handleFlip}
      >
        <div
          className="relative w-full transition-transform duration-500"
          style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* Front */}
          <div
            className={`${isFlipped ? 'absolute inset-0' : 'relative'} bg-navy-800 rounded-xl border border-navy-600 p-6 flex flex-col`}
            style={{ backfaceVisibility: 'hidden', minHeight: '320px' }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                  CATEGORY_COLORS[currentCard.category] || 'bg-slate-700 text-slate-300'
                }`}
              >
                {currentCard.category}
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                  DIFFICULTY_COLORS[currentCard.difficulty] || 'bg-slate-700 text-slate-300'
                }`}
              >
                {currentCard.difficulty}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xl text-center text-slate-300 leading-relaxed font-medium">
                {currentCard.front}
              </p>
            </div>
            <p className="text-center text-slate-500 text-sm mt-4">Click to reveal answer</p>
          </div>

          {/* Back */}
          <div
            className={`${!isFlipped ? 'absolute inset-0' : 'relative'} bg-navy-800 rounded-xl border border-navy-600 p-6 flex flex-col`}
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
              minHeight: '320px',
            }}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                  CATEGORY_COLORS[currentCard.category] || 'bg-slate-700 text-slate-300'
                }`}
              >
                {currentCard.category}
              </span>
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize ${
                  DIFFICULTY_COLORS[currentCard.difficulty] || 'bg-slate-700 text-slate-300'
                }`}
              >
                {currentCard.difficulty}
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-lg text-center text-slate-300 leading-relaxed">
                {currentCard.back}
              </p>
            </div>
            {currentCard.servicenow_analogy && (
              <div className="mt-4 bg-electric-500/10 border border-electric-500/30 rounded-lg p-3">
                <p className="text-xs font-medium text-electric-400 mb-1 uppercase tracking-wide">
                  ServiceNow Analogy
                </p>
                <p className="text-sm text-slate-300">{currentCard.servicenow_analogy}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Buttons (only when flipped) */}
      {isFlipped && (
        <div className="flex items-center justify-center gap-3 mb-6">
          <button
            onClick={(e) => { e.stopPropagation(); handleRate('hard') }}
            className="flex-1 max-w-[140px] px-4 py-3 bg-danger-500/20 text-danger-500 rounded-xl font-medium hover:bg-danger-500/30 transition-all duration-200 border border-danger-500/30"
          >
            Hard
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleRate('good') }}
            className="flex-1 max-w-[140px] px-4 py-3 bg-electric-500/20 text-electric-400 rounded-xl font-medium hover:bg-electric-500/30 transition-all duration-200 border border-electric-500/30"
          >
            Good
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleRate('easy') }}
            className="flex-1 max-w-[140px] px-4 py-3 bg-success-500/20 text-success-400 rounded-xl font-medium hover:bg-success-500/30 transition-all duration-200 border border-success-500/30"
          >
            Easy
          </button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => goToCard('prev')}
          disabled={currentIndex === 0}
          className="flex items-center gap-2 px-4 py-2 bg-navy-700 text-slate-300 rounded-lg hover:bg-navy-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          <ChevronLeft className="w-4 h-4" /> Previous
        </button>
        <button
          onClick={resetProgress}
          className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-electric-400 transition-colors duration-200"
        >
          <RotateCcw className="w-4 h-4" /> Reset
        </button>
        <button
          onClick={() => goToCard('next')}
          disabled={currentIndex >= filteredCards.length - 1}
          className="flex items-center gap-2 px-4 py-2 bg-navy-700 text-slate-300 rounded-lg hover:bg-navy-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200"
        >
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
