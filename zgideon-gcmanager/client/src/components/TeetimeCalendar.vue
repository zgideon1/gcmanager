<template>
  <div class="calendar-container">
    <FullCalendar ref="calendar" :options="calendarOptions" />
      <br>
      <div v-html="error" class="error"></div>
  </div>
</template>

<script>
import TeetimeService from "@/services/TeetimeService"

import FullCalendar from "@fullcalendar/vue3"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"

export default {
  components: {
    FullCalendar
  },

  data() {
    return {
      error: null,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridDay",

        slotMinTime: "06:00:00",
        slotMaxTime: "20:00:00",

        slotLabelInterval: "00:08:00",
        
        slotDuration: "00:08:00",
        snapDuration: "00:08:00",

        selectable: true,

        events: [],

        dateClick: null,
        eventClick: null
      }
    }
  },

  mounted() {
    this.calendarOptions.events = this.fetchEvents
    this.calendarOptions.dateClick = this.handleDateClick
    this.calendarOptions.eventClick = this.handleEventClick
  },

  methods: {

    async fetchEvents(fetchInfo, successCallback, failureCallback) {
      try {
        const res = await TeetimeService.getAvailableTimes()

        const events = res.data.map(tt => ({
            id: tt.teeid,
            title: `${tt.user.firstname} (${tt.numofplayers})`,
            start: tt.timeval,
            end: new Date(new Date(tt.timeval).getTime() + 8 * 60000)
        }))

        successCallback(events)

      } catch (err) {
        failureCallback(err)
      }
    },

    async handleDateClick(info) {
      let players = parseInt(prompt("Number of players?"), 10)
    
      let cart = prompt("Will the player(s) have a cart? (Y/N)")
      let hasCart = false

      if(cart === 'Y' || cart === 'y') {
        hasCart = true;
      }
      else {
        hasCart = false;
      }

      let startHole = parseInt(prompt("Starting hole? (1 or 10)"), 10)

      const newBooking = {
        timeval: info.dateStr,
        tt_user_id: this.$store.state.user.uid,
        cart: hasCart,
        numofplayers: players,
        startHole
      }

      try{
        const res = await TeetimeService.bookTeeTime(newBooking)

        const newEvent = {
          id: res.data.teeid,
          title: `${this.$store.state.user.firstname} (${res.data.numofplayers})`,
          start: res.data.timeval,
          end: new Date(new Date(res.data.timeval).getTime() + 8 * 60000)
        }

        const calendarApi = this.$refs.calendar.getApi()
        calendarApi.addEvent(newEvent)
      } catch (err) {
        this.error = "Tee time could not be booked."
      }
    },

    async handleEventClick(info) {

      if (!confirm("Delete this tee time?")) return

      try {
        await TeetimeService.deleteTeeTime(info.event.id)

        info.event.remove()
      } catch (err) {
        this.error = 'Contact admin to delete tee time.'
      }
    }
  }
}
</script>

<style>
.calendar-container {
  max-width: 900px;
  margin: auto;
}
.error {
    justify-content: center;
    align-content: center;
    align-self: center;
    display: flex;
    color:red;
}

</style>