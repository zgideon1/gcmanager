<template>
  <div class="calendar-container">
    <FullCalendar ref="calendar" :options="calendarOptions" />
      <div v-if="showError" v-html="error" class="error"></div>
  </div>
  <div class="upanel" v-if="showTournament">
    <div class="upanel-top">
        <h4>Tournament Date: </h4>
        <label> {{ formatDate(newTournament.starttime) }} </label>

        <h4>Tournament Name: </h4>
        <input type="text"
            placeholder="Boone County Shriners"
            v-model="newTournament.name"
        />

        <h4>Head of Tournament Contact Email: </h4>
        <input type="email"
            placeholder="example@gmail.com"
            v-model="newTournament.contactemail"
        />

        <h4>Game type: </h4>
        <input type="text"
            placeholder="Strokes"
            v-model="newTournament.gametype"
        />

        <h4>Estimated Amount of Players?: </h4>
        <input type="number"
            v-model.number="newTournament.estamtplayers"
        />
    </div>
    <div class="upanel-bottom">
        <button type="button" @click="addTournament">Schedule Tournament</button>
        <button type="button" @click="cancelAdd">Cancel</button>
    </div>
  </div>
</template>

<script>
import TournamentService from "@/services/TournamentService"

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
      showTournament: false,
      newTournament: {
        name: '',
        contactemail: '',
        starttime: null,
        endtime: null,
        gametype: '',
        estamtplayers: 0,
      },
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",

        slotMinTime: "06:00:00",
        slotMaxTime: "21:00:00",

        slotDuration:"00:30:00",
        slotLabelInterval: "01:00:00",
        snapDuration: "00:15:00",
        allDaySlot: false,

        width: '100%',
        height: '100%',

        selectable: true,
        editable: true,
        eventResizableFromStart: true,

        headerToolbar: {
            left: "prev,next today",
            center: "title",
            right: "timeGridDay,timeGridWeek"
        },

        scrollTime: "08:00:00",

        events: [],

        dateClick: null,
        eventClick: null
      }
    }
  },

  mounted() {
    this.fetchEvents()
    this.calendarOptions.dateClick = this.handleDateClick
    this.calendarOptions.eventClick = this.handleEventClick

    this.calendarOptions.eventResize = this.editTournament
  },

  methods: {
    formatDate(date) {
        return new Date(date).toLocaleString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        })
    },

    async fetchEvents(fetchInfo, successCallback, failureCallback) {
      try {
        const res = await TournamentService.getTournaments()

        this.calendarOptions.events = res.data.map(t => ({
            id: t.tournid,
            title: `TOURNAMENT: ${t.name}, ${t.estamtplayers} players`,
            start: t.starttime,
            end: t.endtime
        }))

      } catch (err) {
        this.error = err
        this.showError = true
      }
    },

    async handleDateClick(info) {
      const now = new Date()
      const selectedDate = new Date(info.dateStr)

      if (selectedDate < now) {
        this.error = "Cannot book a tournament in the past."
        this.showError = true
        return
      }

      this.showTournament = true

      this.$nextTick(() => {
        this.resizeCalendar()
    })

      this.newTournament.starttime = selectedDate
      this.newTournament.endtime = new Date(
        selectedDate.getTime() + 4 * 60 * 60 * 1000
    )
    },

    async addTournament() {
      try{
        const res = await TournamentService.createTournament(this.newTournament)

        const newEvent = {
          id: res.data.tournid,
          title: `${res.data.name}, ${res.data.estamtplayers} players`,
          start: res.data.starttime,
          end: res.data.endtime
        }

        const calendarApi = this.$refs.calendar.getApi()
        calendarApi.addEvent(newEvent)
      } catch (err) {
        this.error = "Tournament could not be scheduled."
        this.showError = true
      }

      this.newTournament = null
      this.showTournament = false

      this.$nextTick(() => {
        this.resizeCalendar()
    })
    },

    cancelAdd() {
        this.showTournament = false
        this.$nextTick(() => {
            this.resizeCalendar()
        })
    },

    resizeCalendar() {
        const calendarApi = this.$refs.calendar.getApi()
        calendarApi.updateSize()
    },


    async handleEventClick(info) {
      const now = new Date()
      const selectedDate = new Date(info.dateStr)

      if (selectedDate < now) {
        this.error = "Cannot delete a tournament in the past."
        this.showError = true
        return
      }

      if (!confirm("Delete this tournament?")) return

      try {
        await TournamentService.deleteTournament(info.event.id)

        info.event.remove()
      } catch (err) {
        this.error = 'Could not delete tournament.'
        this.showError = true
      }
    },
    async editTournament(info) {
        if(this.$store.state.user.role != 3) {
            return;
        }

        const now = new Date()
        const start = new Date(info.event.start)
        const end = new Date(info.event.end)

        if (start < now) {
            this.error = "Cannot edit past tournaments"
            this.showError = true
            info.revert()
            return
        }

        const maxTime = new Date(start)
        maxTime.setHours(21, 0, 0, 0)
        if (end > maxTime) {
            this.error = "Tournament cannot extend past 9:00 PM."
            this.showError = true
            info.revert()
            return
        }

        const updatedTournament = {
            tournid: info.event.extendedProps.tournid,
            starttime: info.event.start,
            endtime: info.event.end
        }

        try {
            await TournamentService.editTournament(info.event.id, updatedTournament)
        } catch(err) {
            this.error = "Tournament update failed."
            this.showError = true
            info.revert()
        }
    }
  }
}
</script>

<style scoped>
.upanel {
    width: 20%;
    height: 100%;
    margin-left: 15px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    overflow-y: scroll;
}

.upanel-top {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}

.upanel-top h4 {
  font-size: large;
}

.upanel-top label {
  font-size: larger;
  color: blue;
}

.upanel-top input {
  padding: 8px 5px;
  border-radius: 6px;
  border: 1px solid blue;
  font-size: 16px;
  transition: border 0.2s, box-shadow 0.2s;
}

.upanel-top input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.upanel-bottom {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 5px;
}

.upanel-bottom button {
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  background-color: #3b82f6;
  color: white;
}

.upanel-bottom button:hover {
  background-color: #2563eb;
}

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