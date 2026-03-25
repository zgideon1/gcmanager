<template>
  <div class="container">
    <h2>Scorecard</h2>

    <div v-if="scorecard">
      <table>
        <thead>
          <tr>
            <th>Hole</th>
            <th v-for="n in 18" :key="n">{{ n }}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Par</td>
            <td v-for="n in 18" :key="n">
              {{ scorecard[`hole_${n}`] }}
            </td>
          </tr>

          <tr>
            <td>Your Score</td>
            <td v-for="n in 18" :key="n">
              <input
                type="number"
                v-model="scores[n - 1]"
                min="1"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <button @click="submitScore">Submit Score</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ScoresService from '@/services/ScoresService'

const scorecard = ref(null)
const scores = ref(Array(18).fill(null))

onMounted(async () => {
  const res = await ScoresService.getScorecard()
  scorecard.value = res.data
})

const submitScore = async () => {
  const payload = {
    gametype: 'stroke',
    dateval: new Date(),
    holes: scores.value
  }

  await ScoresService.postScore(payload)
}
</script>