import dayjs from 'dayjs'
import RelativeTime from "dayjs/plugin/relativeTime"
import Calendar from "dayjs/plugin/calendar"

dayjs.extend(RelativeTime)
dayjs.extend(Calendar)

export default dayjs
export const dayjsCalender = (date) => {
    return dayjs(date).calendar(null, {
        sameDay: '[Today at] h:mm A', // The same day ( Today at 2:30 AM )
        nextDay: '[Tomorrow]', // The next day ( Tomorrow at 2:30 AM )
        nextWeek: 'MMMM DD [at] h:mm A', // The next week ( Sunday at 2:30 AM )
        lastDay: '[Yesterday]', // The day before ( Yesterday at 2:30 AM )
        lastWeek: 'MMMM DD [at] h:mm A', // Last week ( Last Monday at 2:30 AM )
        sameElse: 'MMMM DD [at] h:mm A' // Everything else ( 7/10/2011 )
    })
}