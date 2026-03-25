<template>
  <div class="calendar-layout">
    <div class="employee-panel">
      <h3>Select Employee</h3>
      <select v-model="selectedEmployeeId">
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
          <br>
          <div v-html="error" class="error"></div>
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
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        initialView: "timeGridWeek",

        slotMinTime: "06:00:00",
        slotMaxTime: "20:00:00",

        slotDuration:"00:30:00",
        slotLabelInterval: "01:00:00",
        snapDuration: "00:15:00",
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

        businessHours: {
            daysOfWeek: [1, 2, 3, 4, 5],
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
    this.calendarOptions.dateClick = this.handleDateClick
    this.calendarOptions.eventClick = this.handleEventClick

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

    async handleDateClick(info) { 
      let hours = parseFloat(prompt("Shift length (hours)?"))
      
      if (!hours) return
      const start = new Date(info.date)
      const end = new Date(start.getTime() + hours * 60 * 60 * 1000)

      const newSchedule = {
        schedule_employeeid: this.selectedEmployeeId,
        starttime: start,
        endtime: end
      }

      try{
        const res = await EmployeeScheduleService.createSchedule(newSchedule)

        const newEvent = {
        id: res.data.id,
        start: res.data.startTime,
        end: res.data.endTime
        }

        const calendarApi = this.$refs.calendar.getApi()
        calendarApi.addEvent(newEvent)
      } catch (err) {
        this.error = "Employee could not be scheduled"
      }
    },

    async handleEventClick(info) {

      if (!confirm("Delete this schedule?")) return

      try {
        await EmployeeScheduleService.deleteSchedule(info.event.id)

        info.event.remove()
      } catch (err) {
        this.error = 'Contact admin to delete schedule'
      }
    },
    async handleEventUpdate(info) {
        const updatedSchedule = {
            schedule_employeeid: info.event.extendedProps.employeeId,
            starttime: info.event.start,
            endtime: info.event.end
        }

        try {
            await EmployeeScheduleService.updateSchedule(info.event.id, updatedSchedule)
        } catch (err) {
            this.error = "Shift update failed."
            info.revert()
        }
    }
  }
}
</script>

<style>
.calendar-layout {
    display: flex;
    height: 100%;
    width: 100%;
}

.employee-panel {
  width: 15%;
  height: 100%;
}

.calendar-container {
  flex: 1;
  height: 100%;
}
.error {
    justify-content: center;
    align-content: center;
    align-self: center;
    display: flex;
    color:red;
}

</style>