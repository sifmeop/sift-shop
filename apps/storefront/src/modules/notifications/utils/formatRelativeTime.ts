import { day } from '~/common/lib/dayjs'

export const formatRelativeTime = (date: string) => {
  const dateObj = day(date)

  if (dateObj.isToday()) {
    return `Today at ${dateObj.format('HH:mm')}`
  }

  if (dateObj.isYesterday()) {
    return `Yesterday at ${dateObj.format('HH:mm')}`
  }

  return dateObj.format('DD/MM/YYYY')
}
