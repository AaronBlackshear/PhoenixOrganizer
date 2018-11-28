import moment from 'moment'

const setCalendarEvents = (value, events, currentMonth) => {
  let filteredEvents = events.filter(event => {
    return moment(event.event_date).date() === value.date();
  });

  if (filteredEvents[0]) {
    if (
      moment(filteredEvents[0].event_date).month() + 1 === currentMonth
      && value.month() + 1 === currentMonth
      && value.year() === moment(filteredEvents[0].event_date).year()
    ) {
      return filteredEvents;
    }
  }
}

export default setCalendarEvents;