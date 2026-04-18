<template>
  <div class="calendar-layout">
    <div class="employee-panel">
      <h3>Select Employee</h3>
      <select v-model="selectedEmployeeId" id="selectMenu">
          <option disabled value="">-- Select Employee --</option>
          <option
              v-for="emp in employees"
              :key="emp.id"
              :value="emp.id"
          >
              {{ emp.id }} {{ emp.firstname }} {{ emp.lastname }}
          </option>
      </select>
    </div>
      <div class="calendar-container">
          <FullCalendar ref="calendar" :options="calendarOptions" />
          <div v-if="showError" v-html="error" class="error"></div>
      </div>
  </div>
</template>

<script>
import EmployeeService from "@/services/EmployeeService"
import EmployeeScheduleService from "@/services/EmployeeScheduleService"

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
      employees: [],
      selectedEmployeeId: null,
      showError: false,
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

  async mounted() {
    this.calendarOptions.events = this.fetchEvents
    this.calendarOptions.dateClick = this.handleScheduleClick
    this.calendarOptions.eventClick = this.handleDeleteClick

    this.calendarOptions.eventResize = this.handleEventUpdate
    this.calendarOptions.eventDrop = this.handleEventUpdate

    try {
    const res = await EmployeeService.getEmployees()
    this.employees = res.data

    if (this.employees.length > 0) {
      this.selectedEmployeeId = this.employees[0].id
    }

    } catch (err) {
        this.error = "Failed to load employees"
        this.showError = true
    }
  },

  methods: {

    async fetchEvents(fetchInfo, successCallback, failureCallback) {
      try {
        const res = await EmployeeScheduleService.getSchedules()

        const events = res.data.map(schedule => ({
            id: schedule.sid,
            title: schedule.firstname,
            start: schedule.starttime,
            end: schedule.endtime,
            extendedProps: {
                employeeId: schedule.schedule_employeeid
            }
        }))

        successCallback(events)

      } catch (err) {
        failureCallback(err)
      }
    },

    async handleScheduleClick(info) { 
      this.error = null

      const now = new Date()
      const start = new Date(info.date)

      if (start < now) {
        this.error = "Cannot schedule a shift in the past."
        this.showError = true
        return
      }

      const hoursInput = prompt("Shift length (hours)?")
      const hours = parseInt(hoursInput, 10)

      if (!Number.isInteger(hours) || hours <= 0) {
        this.error = "Shift length must be a positive whole number."
        this.showError = true
        return
      }

      const end = new Date(start.getTime() + hours * 60 * 60 * 1000)

      const maxTime = new Date(start)
      maxTime.setHours(21, 0, 0, 0)

      if (end > maxTime) {
        this.error = "Shift cannot extend past 9:00 PM."
        this.showError = true
        return
      }

      const newSchedule = {
        schedule_employeeid: this.selectedEmployeeId,
        starttime: start,
        endtime: end
      }

      try{
        const res = await EmployeeScheduleService.createSchedule(newSchedule)

        const newEvent = {
        id: res.data.sid,
        title: res.data.firstname,
        start: start,
        end: end,
        }

        const calendarApi = this.$refs.calendar.getApi()
        calendarApi.addEvent(newEvent)
      } catch (err) {
        this.error = "Employee could not be scheduled"
        this.showError = true
      }
    },

    async handleDeleteClick(info) {
      this.error = null
      const now = new Date()
      const selectedDate = new Date(info.event.start)

      if (selectedDate < now) {
        this.error = "Cannot delete a past schedule"
        this.showError = true
        return
      }

      if (!confirm("Delete this schedule?")) return

      try {
        await EmployeeScheduleService.deleteSchedule(info.event.id)

        info.event.remove()
      } catch (err) {
        this.error = 'Contact admin to delete schedule'
        this.showError = true
      }
    },
    async handleEventUpdate(info) {
      this.error = null

      const now = new Date()
      const start = new Date(info.event.start)
      const end = new Date(info.event.end)

      if (start < now) {
        this.error = "Cannot edit past shifts"
        this.showError = true
        info.revert()
        return
      }

      const maxTime = new Date(start)
      maxTime.setHours(21, 0, 0, 0)

      if (end > maxTime) {
        this.error = "Shift cannot extend past 9:00 PM."
        this.showError = true
        info.revert()
        return
      }

      const updatedSchedule = {
          schedule_employeeid: info.event.extendedProps.employeeId,
          starttime: info.event.start,
          endtime: info.event.end
        }

        try {
            await EmployeeScheduleService.updateSchedule(info.event.id, updatedSchedule)
        } catch (err) {
            this.error = "Shift update failed."
            this.showError = true
            info.revert()
        }
    }
  }
}
</script>

<style scoped>
.calendar-layout {
    display: flex;
    height: 100%;
    width: 100%;
}

.employee-panel {
  width: 20%;
  height: 100%;
  border-right: 3px solid blue;
  padding-left: 10px;
}

#selectMenu {
  border: 2px solid lightblue;
  border-radius: 6px;
  height: 7%;
  width: 90%;
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

</style>