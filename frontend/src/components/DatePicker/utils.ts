import { SHORT_MONTH_NAMES } from './constants'

export function chunkArray<T>(arr: T[], size: number) {
  let index = 0
  const arrayLength = arr.length
  const tempArray = []

  for (index = 0; index < arrayLength; index += size) {
    const chunk = arr.slice(index, index + size)
    // Do something if you want with the group
    tempArray.push(chunk)
  }

  return tempArray
}

export class DateColumnArithemetic {
  constructor(
    private dates: Date[],
    private viewingDate: Date | null,
    private selectedDate: Date | null,
    private years: boolean,
    private months: boolean,
  ) {
    //
  }

  selected(n: Date) {
    if (this.months) {
      return n.getMonth() === this.selectedDate?.getMonth()
    } else if (this.years) {
      return n.getFullYear() === this.viewingDate?.getFullYear()
    }
    return n.getTime() === this.selectedDate?.getTime()
  }

  outOfMonth(i: number, n: Date) {
    return (
      ((i === 0 && n.getDate() > 7) ||
        (i === this.dates.length - 1 && n.getDate() <= 7)) &&
      !(this.months || this.years)
    )
  }

  getButtonText(n: Date) {
    if (this.months) {
      return SHORT_MONTH_NAMES[n.getMonth()]
    } else if (this.years) {
      return n.getFullYear()
    }
    return n.getDate()
  }
}

export function getMonths(date: Date) {
  const currentYear = date.getFullYear()
  const currentDate = date.getDate()
  return [...new Array(12)].map(
    (_, idx) => new Date(currentYear, idx, currentDate),
  )
}

export function getNearbyYears(date: Date, n = 18): Date[] {
  // n=18 is 3 rows of 6
  const currentYear = date.getFullYear()
  const offset = Math.floor((currentYear - 2000) / n)
  const startValue = 2000 + offset * n
  return [...new Array(n)].map(
    (_, idx) => new Date(startValue + idx, date.getMonth(), date.getDate()),
  )
}

export function getWeeksOfMonth(input: Date): Date[][] {
  const date = new Date(input)
  const year = date.getFullYear()
  const month = date.getMonth()

  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const lastDateOfMonth = new Date(year, month + 1, 0).getDate()
  const lastDayOfMonth = new Date(year, month + 1, 0).getDay()
  const lastDayOfLastMonth = new Date(year, month, 0).getDate()

  const weeks: Date[][] = []
  const firstWeekDiff = lastDayOfLastMonth - firstDayOfMonth
  const daysInMonth = lastDateOfMonth + firstDayOfMonth + (7 - lastDayOfMonth)
  const numberOfWeeks = Math.round(daysInMonth / 7)

  ;[...new Array(numberOfWeeks)].forEach((_, idx) => {
    const start = weeks?.[idx - 1]?.[6]?.getDate?.() ?? firstWeekDiff
    const week = [...new Array(7)].map((__, jdx) => {
      // First week of month
      if (idx === 0) {
        if (jdx >= firstDayOfMonth) {
          return new Date(year, month, jdx - firstDayOfMonth + 1)
        } else {
          return new Date(
            year,
            month - 1,
            lastDayOfLastMonth - (firstDayOfMonth - jdx - 1),
          )
        }
      }
      // Last week of month
      if (start + 1 + jdx > lastDateOfMonth) {
        return new Date(year, month + 1, start + 1 + jdx - lastDateOfMonth)
      }

      // Any other day
      return new Date(year, month, start + 1 + jdx)
    })

    weeks.push(week)
  })

  return weeks
    .reduce((a, v) => a.concat(v), [])
    .reduce(
      (a, v, idx) => {
        a[idx % 7].push(v)
        return a
      },
      [[], [], [], [], [], [], []] as Date[][],
    )
}
