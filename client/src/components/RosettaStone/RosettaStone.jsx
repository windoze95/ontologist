import { useState, useMemo } from 'react'
import { ArrowRight, ChevronDown, Search, Filter } from 'lucide-react'
import { rosettaStone } from '../../data/rosettaStone'

const CATEGORY_COLORS = {
  ontology: { badge: 'bg-electric-500/20 text-electric-400', dot: 'bg-electric-500' },
  pipeline: { badge: 'bg-purple-500/20 text-purple-400', dot: 'bg-purple-500' },
  workshop: { badge: 'bg-amber-500/20 text-amber-400', dot: 'bg-amber-500' },
  aip: { badge: 'bg-emerald-500/20 text-emerald-400', dot: 'bg-emerald-500' },
  security: { badge: 'bg-rose-500/20 text-rose-400', dot: 'bg-rose-500' },
  platform: { badge: 'bg-cyan-500/20 text-cyan-400', dot: 'bg-cyan-500' },
  integration: { badge: 'bg-orange-500/20 text-orange-400', dot: 'bg-orange-500' },
}

function getCategoryStyle(category) {
  return CATEGORY_COLORS[category] || { badge: 'bg-slate-700 text-slate-300', dot: 'bg-slate-500' }
}

function MappingRow({ item }) {
  const [expanded, setExpanded] = useState(false)
  const catStyle = getCategoryStyle(item.category)

  return (
    <div className="bg-navy-800 rounded-xl border border-navy-600 overflow-hidden transition-all duration-200 hover:border-navy-500">
      {/* Collapsed Row */}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full text-left p-4 md:p-5 flex items-center gap-4 group"
      >
        {/* ServiceNow side */}
        <div className="flex-1 min-w-0">
          <p className="text-slate-300 font-medium truncate group-hover:text-white transition-colors duration-200">
            {item.serviceNow.name}
          </p>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0 flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${catStyle.badge}`}
          >
            {item.category}
          </span>
          <ArrowRight className="w-4 h-4 text-electric-400 flex-shrink-0" />
        </div>

        {/* Foundry side */}
        <div className="flex-1 min-w-0">
          <p className="text-slate-300 font-medium truncate group-hover:text-white transition-colors duration-200">
            {item.foundry.name}
          </p>
        </div>

        {/* Expand icon */}
        <ChevronDown
          className={`w-5 h-5 text-slate-500 flex-shrink-0 transition-transform duration-200 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Notes preview (collapsed) */}
      {!expanded && item.notes && (
        <div className="px-4 md:px-5 pb-3 -mt-1">
          <p className="text-sm text-slate-500 truncate">{item.notes}</p>
        </div>
      )}

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-navy-600 p-4 md:p-5">
          {/* Two-column comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* ServiceNow */}
            <div className="bg-navy-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-orange-500" />
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                  ServiceNow
                </h4>
              </div>
              <p className="text-base font-medium text-slate-300 mb-2">{item.serviceNow.name}</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.serviceNow.description}
              </p>
            </div>

            {/* Foundry */}
            <div className="bg-navy-700 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-electric-500" />
                <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">
                  Palantir Foundry
                </h4>
              </div>
              <p className="text-base font-medium text-slate-300 mb-2">{item.foundry.name}</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                {item.foundry.description}
              </p>
            </div>
          </div>

          {/* Notes */}
          {item.notes && (
            <div className="bg-navy-900/50 rounded-lg p-4 mb-4">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Key Notes
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">{item.notes}</p>
            </div>
          )}

          {/* Detailed Comparison */}
          {item.detailedComparison && (
            <div className="bg-electric-500/5 border border-electric-500/20 rounded-lg p-4">
              <h4 className="text-xs font-semibold text-electric-400 uppercase tracking-wide mb-2">
                Detailed Comparison
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">{item.detailedComparison}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default function RosettaStone() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showFilters, setShowFilters] = useState(true)

  const categories = useMemo(
    () => [...new Set(rosettaStone.map((item) => item.category))],
    []
  )

  const filteredItems = useMemo(() => {
    let items = rosettaStone
    if (selectedCategory) {
      items = items.filter((item) => item.category === selectedCategory)
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      items = items.filter(
        (item) =>
          item.serviceNow.name.toLowerCase().includes(q) ||
          item.serviceNow.description.toLowerCase().includes(q) ||
          item.foundry.name.toLowerCase().includes(q) ||
          item.foundry.description.toLowerCase().includes(q) ||
          (item.notes && item.notes.toLowerCase().includes(q))
      )
    }
    return items
  }, [selectedCategory, searchQuery])

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-300 mb-1">Rosetta Stone</h1>
        <p className="text-slate-400 text-sm">
          ServiceNow to Palantir Foundry concept mapping -- click any row to expand
        </p>
      </div>

      {/* Search + Filter Controls */}
      <div className="mb-6 space-y-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search concepts, descriptions..."
            className="w-full pl-10 pr-4 py-2.5 bg-navy-800 border border-navy-600 rounded-xl text-slate-300 placeholder-slate-500 focus:outline-none focus:border-electric-500/50 focus:ring-1 focus:ring-electric-500/30 transition-all duration-200"
          />
        </div>

        {/* Category Filters */}
        <div>
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
                onClick={() => setSelectedCategory(null)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  !selectedCategory
                    ? 'bg-electric-500 text-white'
                    : 'bg-navy-700 text-slate-400 hover:bg-navy-600'
                }`}
              >
                All ({rosettaStone.length})
              </button>
              {categories.map((cat) => {
                const count = rosettaStone.filter((i) => i.category === cat).length
                const catStyle = getCategoryStyle(cat)
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium capitalize transition-all duration-200 ${
                      selectedCategory === cat
                        ? 'bg-electric-500 text-white'
                        : 'bg-navy-700 text-slate-400 hover:bg-navy-600'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${catStyle.dot}`} />
                      {cat} ({count})
                    </span>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Column Headers */}
      <div className="hidden md:flex items-center gap-4 px-5 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
        <span className="flex-1">ServiceNow</span>
        <span className="w-32 text-center">Category</span>
        <span className="flex-1">Palantir Foundry</span>
        <span className="w-5" />
      </div>

      {/* Mapping Rows */}
      {filteredItems.length > 0 ? (
        <div className="space-y-2">
          {filteredItems.map((item) => (
            <MappingRow key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-300 mb-2">No mappings found</h3>
          <p className="text-slate-400 text-sm">
            Try adjusting your search or filter criteria.
          </p>
          {(searchQuery || selectedCategory) && (
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory(null)
              }}
              className="mt-4 px-4 py-2 bg-electric-500 text-white rounded-lg hover:bg-electric-400 transition-all duration-200"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Item Count */}
      {filteredItems.length > 0 && (
        <div className="mt-4 text-center text-sm text-slate-500">
          Showing {filteredItems.length} of {rosettaStone.length} mappings
        </div>
      )}
    </div>
  )
}
