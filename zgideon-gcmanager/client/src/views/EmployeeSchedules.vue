<template>
    <div class="content-bg">
        <div class="header" id="header">
            <span id="headerTitle">Employee Scheduling</span>
        </div>
        <div id="calendar">
            <FullCalendar />
        </div>
    </div>
</template>

<script setup>
import FullCalendar from "../components/EmployeeCalendar.vue"
</script>

<script>
export default {
    components: {FullCalendar},
}
</script>

<style>
#header {
    align-self: center;
    justify-self: center;
    font-size: 40px;
    color: black;
    padding-bottom: 15px;
    border: 2px;
    border-color: white;
}

.content-bg {
    background-color: lightblue;
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
}

#calendar {
    background: white;
    border-radius: 10px;
    flex: 1 1 auto;
    min-width: 90%;
    display: flex;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.calendar-container, 
.calendar-container > * {
    min-width: 75%;
}
.calendar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    text-align: center;
}

.calendar-days {
    font-weight: bold;
    margin-top: 10px;
}

.date-cell {
    border: 1px solid #ddd;
    cursor: pointer;
    min-width:100%;
}

.date-cell.inactive {
    background: #f4f4f4;
    cursor: default;
}

.date-cell.selected {
    background: #0077cc;
    color: white;
}

.tee-times {
    margin-top: 20px;
}
</style>