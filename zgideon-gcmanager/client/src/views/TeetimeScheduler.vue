<template>
    <div class="content-bg">
        <div class="header" id="header">
            <span id="headerTitle">Schedule a Tee Time</span>
        </div>
        <div id="calendar">
            <FullCalendar />
            <br>
        </div>
    </div>
</template>

<script setup>
import FullCalendar from "../components/TeetimeCalendar.vue"
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
    font-size: 32px;
    padding-bottom: 15px;
    border: 2px;
    border-color: white;
}

.content-bg {
    background-color: lightblue;
    padding: 30px ;
}

#calendar {
    background: white;
    padding: 30px;
    border-radius: 10px;
    max-width: 500px;
    margin: auto;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

.calendar-container {
    max-width: 450px;
    margin: auto;
    font-family: sans-serif;
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
    padding: 10px;
    border: 1px solid #ddd;
    cursor: pointer;
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

.tee-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.tee-button {
    padding: 8px 12px;
    background: #00994d;
    border: none;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

.tee-button:hover {
    background: #007a3d;
}

.confirmation {
    margin-top: 15px;
    padding: 10px;
    background: #e6ffe6;
    border-left: 4px solid #00994d;
}
</style>