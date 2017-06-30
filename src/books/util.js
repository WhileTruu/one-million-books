/*
  @param dd: day in the month
  @param mm: number of the month (1-12)
  @return: boolean whether date is on halloween
*/
export function isDateOnHalloween(dd, mm) {
  return dd === 31 && mm === 10
}

const lastDaysOfYear = (y) => [
  31,
  0 === y % 4 && 0 !== y % 100 || 0 === y % 400 ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
]

/*
  @param dd: day in the month
  @param mm: number of the month (1-12)
  @param yyyy: year
  @return: boolean whether date is the last friday of a month
*/
export function isLastFridayOfTheMonth(dd, mm, yyyy) {
  mm = mm - 1
  return new Date(
    Date.UTC(
      yyyy,
      mm,
      lastDaysOfYear(yyyy)[mm] -
        ((new Date(Date.UTC(yyyy, mm, lastDaysOfYear(yyyy)[mm])).getDay() + 2) % 7),
    )
  ).getUTCDate() === dd
}
