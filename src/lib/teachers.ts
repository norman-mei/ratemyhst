export type RatingValue = 1 | 2 | 3 | 4 | 5

export const RATING_VALUES: RatingValue[] = [5, 4, 3, 2, 1]

export function calculateAverageRating(reviews: { rating: number }[]): number {
  if (!reviews.length) {
    return 0
  }

  const total = reviews.reduce((sum, review) => sum + review.rating, 0)
  return total / reviews.length
}

export function getRatingDistribution(
  reviews: { rating: number }[],
): Record<RatingValue, number> {
  const base: Record<RatingValue, number> = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }

  reviews.forEach((review) => {
    const rounded = Math.min(5, Math.max(1, Math.round(review.rating))) as RatingValue
    base[rounded] += 1
  })

  return base
}
