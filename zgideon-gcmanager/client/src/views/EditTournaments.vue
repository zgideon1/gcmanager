<template>
    <div class="content">
        <div class="header" id="header">
            <span id="headerTitle">Schedule a Tournament</span>
        </div>
        <div id="calendar">
            <FullCalendar />
            <br>
        </div>
    </div>
</template>

<script setup>
import FullCalendar from "../components/TournamentsCalendar.vue"
</script>

<script>
export default {
    components: {FullCalendar},
}
</script>

<style scoped>
#header {
    align-self: center;
    justify-self: center;
    font-size: 40px;
    padding-bottom: 10px;
    border: 2px;
    border-color: white;
}

.content {
    background-color: lightblue;
    flex: 1;
    display: flex;
    flex-direction: column;
    height: 95%;
    width: 100%;
}

 #calendar {
    background: white;
    padding: 10px;
    border-radius: 10px;
    display: flex;
    height: 100%;
    margin: 10px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    color: black;
}

</style>