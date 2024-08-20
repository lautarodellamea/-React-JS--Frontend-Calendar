// transformamos las fechas de string a date

import { parseISO } from "date-fns"

export const convertsToDateEvents = (events = []) => {



  return events.map(event => {

    event.start = parseISO(event.start)
    event.end = parseISO(event.end)


    return event
  })


}