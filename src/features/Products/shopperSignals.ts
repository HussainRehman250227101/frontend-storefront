const VISITS_KEY = "cbf_visits"
const SEARCHES_KEY = "cbf_searches"
const MAX_VISITS = 12
const MAX_SEARCHES = 8

function readIds(key: string): number[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter((id) => Number.isInteger(id) && id > 0).slice(0, MAX_VISITS)
  } catch {
    return []
  }
}

function readTexts(key: string): string[] {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) {
      return []
    }
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) {
      return []
    }
    return parsed.filter((text) => typeof text === "string" && text.trim()).slice(0, MAX_SEARCHES)
  } catch {
    return []
  }
}

export function recordProductVisit(productId: number) {
  if (!Number.isInteger(productId) || productId < 1) {
    return
  }
  const next = [productId, ...readIds(VISITS_KEY).filter((id) => id !== productId)].slice(0, MAX_VISITS)
  localStorage.setItem(VISITS_KEY, JSON.stringify(next))
}

export function recordSearch(query: string) {
  const cleaned = query.trim()
  if (!cleaned) {
    return
  }
  const next = [
    cleaned,
    ...readTexts(SEARCHES_KEY).filter((text) => text.toLowerCase() !== cleaned.toLowerCase()),
  ].slice(0, MAX_SEARCHES)
  localStorage.setItem(SEARCHES_KEY, JSON.stringify(next))
}

export function getVisitedProductIds() {
  return readIds(VISITS_KEY)
}

export function getRecentSearches() {
  return readTexts(SEARCHES_KEY)
}
