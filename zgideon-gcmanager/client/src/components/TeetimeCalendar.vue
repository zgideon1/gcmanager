<template>
  <div class="calendar-container">
    <FullCalendar ref="calendar" :options="calendarOptions" />
      <div v-if="showError" v-html="error" class="error"></div>
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
      showError: false,
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridDay",

        slotMinTime: "06:00:00",
        slotMaxTime: "20:00:00",

        slotLabelInterval: "00:08:00",
        
        slotDuration: "00:08:00",
        snapDuration: "00:08:00",

        allDaySlot: false,

        height: '100%',

        selectable: true,

        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,timeGridWeek"
        },

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
      this.error = null
      const now = new Date()
      const selectedDate = new Date(info.dateStr)

      if (selectedDate < now) {
        this.error = "Cannot book a tee time in the past."
        this.showError = true
        return
      }
      const playersInput = prompt("Number of players?")
      const players = parseInt(playersInput, 10)

      if (!Number.isInteger(players) || players <= 0 || players > 4) {
        this.error = "Players must be an integer between 1 and 4."
        this.showError = true
        return
      }
    
      const cart = prompt("Will the player(s) have a cart? (Y/N)")
      if (!cart || !['Y', 'y', 'N', 'n'].includes(cart)) {
        this.error = "Cart must be Y or N."
        this.showError = true
        return
      }
      const hasCart = cart.toLowerCase() === 'y'

      const holeInput = prompt("Starting hole? (1 or 10)")
      const startHole = parseInt(holeInput, 10)

      if (!Number.isInteger(startHole) || (startHole !== 1 && startHole !== 10)) {
        this.error = "Starting hole must be either 1 or 10."
        this.showError = true
        return
      }

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
        this.showError = true
      }
    },

    async handleEventClick(info) {
      this.error = null
      const now = new Date()
      const selectedDate = new Date(info.dateStr)

      if (selectedDate < now) {
        this.error = "Cannot delete a tee time in the past."
        this.showError = true
        return
      }

      if (!confirm("Delete this tee time?")) return

      try {
        await TeetimeService.deleteTeeTime(info.event.id)

        info.event.remove()
      } catch (err) {
        this.error = 'Contact admin to delete tee time.'
        this.showError = true
      }
    }
  }
}
</script>

<style scoped>
.calendar-container {
  flex: 1;
  height: 100%;
  padding-left: 15px;
}
.error {
    justify-content: center;
    align-content: center;
    align-self: center;
    display: flex;
    color:red;
    font-size: 20px;
    padding: 15px 25px;
    border-radius: 10px;
    background-color: white;
}

.fc .fc-col-header-cell-cushion {
  color: black; 
}

</style>