<template>
  <div class="container">
    <h2>Post a New Score:</h2>
<!--<label class="scorecard-name"> {{ scorecard.name }}</label> -->
    <div class="scorecard">
      <div class="scorecard-row">
        <!--replace with scorecard.n-->
        <label>Hole: {{ n }}</label>
      </div>

      <div class="scorecard-row">
        <!--replace with scorecard.par.holenum-->
        <label>Par: {{ n }}</label>
      </div>

      <div class="scorecard-row">
        <label>Strokes: {{ n }}</label>
        <input
          type="number"
          v-model="scores[n - 1]"
          min="1"
        />
      </div>
  </div>
  <button @click="submitScore">Submit Score</button>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ScoresService from '@/services/ScoresService'
import ScorecardService from '@/services/ScorecardService'

const scorecard = ref(null)
const scores = ref(Array(18).fill(null))

// onMounted(async () => {
//   const res = await ScoresService.getScorecard()
//   scorecard.value = res.data
// })

// const submitScore = async () => {
//   const payload = {
//     gametype: 'stroke',
//     dateval: new Date(),
//     holes: scores.value
//   }

//   await ScoresService.postScore(payload)
// }
</script>

<style scoped>
</style>