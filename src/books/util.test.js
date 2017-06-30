import { isLastFridayOfTheMonth, isDateOnHalloween } from './util'

describe('util', () => {
  describe('isLastFridayOfTheMonth', () => {
    it('returns true with last friday of a month', () => {
      expect(isLastFridayOfTheMonth(31, 3, 2017)).toBe(true)
      expect(isLastFridayOfTheMonth(28, 10, 2016)).toBe(true)
    })
    it('returns false with not last friday of a month', () => {
      expect(isLastFridayOfTheMonth(1, 3, 2017)).toBe(false)
      expect(isLastFridayOfTheMonth(31, 10, 2016)).toBe(false)
      expect(isLastFridayOfTheMonth(14, 10, 2015)).toBe(false)
    })
  })

  describe('isDateOnHalloween', () => {
    it('returns true if date on halloween', () => {
      expect(isDateOnHalloween(31, 10)).toBe(true)
    })
    it('returns false if date not on halloween', () => {
      expect(isDateOnHalloween(1, 3)).toBe(false)
      expect(isDateOnHalloween(28, 10)).toBe(false)
      expect(isDateOnHalloween(14, 10)).toBe(false)
    })
  })
})
