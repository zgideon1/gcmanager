<template>
  <div class="container">
    <h2>Post a New Score:</h2>
    <div class="upanel">
            <div class="upanel-top">
                <table class="scorecard-table" id='scorecardheader' v-if="holes.length">
                    <tr>
                        <th id="scorecard-title" colspan='10'>{{ scorecard.name }}</th>
                    </tr>

                    <template v-for="(group, index) in groupedHoles" :key="index">
        
                        <tr class="section-header">
                            <th colspan="10">
                                {{ index === 0 ? 'Front 9' : index === 1 ? 'Back 9' : 'Extra ' + (index + 1) }}
                            </th>
                        </tr>

                        <tr>
                            <th>Hole</th>
                            <td v-for="hole in group" :key="'h' + hole.holenum">
                                {{ hole.holenum }}
                            </td>
                        </tr>

                        <tr>
                            <th>Par</th>
                            <td v-for="hole in group" :key="'p' + hole.par">
                                {{ hole.par}}
                            </td>
                        </tr>

                        <tr>
                            <th>Yardage <br> (yds)</th>
                            <td v-for="hole in group" :key="'y' + hole.yardage">
                                {{hole.yardage}}
                            </td>
                        </tr>

                        <tr>
                            <th>Strokes</th>
                            <td v-for="(hole, i) in group" :key="'s' + hole.id">
                                <input
                                type="number"
                                v-model="hole_scores[index * 9 + i].strokes"
                                class="cell-input"
                                />
                            </td>
                        </tr>

                        <tr class="spacer-row">
                            <td colspan="10"></td>
                        </tr>
                    </template>
                </table>
            </div>
        </div>
    <button @click="submitScore">Submit Score</button>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import ScoresService from '@/services/ScoresService'
import ScorecardService from '@/services/ScorecardService'

export default {
  data() {
        return {
            error: null,
            scname: null,
            scorecard: null,
            holes: [],
            holeCount: '',
            showError: false,
            hole_scores: null
        }
    },

    async mounted() {
        try{
            // Retrieve Scorecard for user
            const sc_id = this.$store.state.user.scorecard_id
            const res = await ScorecardService.getScorecard(sc_id)
            this.scorecard = res.data
            this.holes = this.scorecard.holes

            this.hole_scores = this.holes.map(hole => ({
                score_holeid: hole.id,
                strokes: null,
            }))

            console.log(this.hole_scores)

        } catch (err) {
            this.error = err
        }      
    },
    methods: {
      promptAdd() {
            this.showEditConfirm = true;
        },
        cancelAdd() {
            this.showEditConfirm = false;
        },
        async submitScore(){
            try {
                const now = new Date()

                const submittedScore = {
                    score_uid: this.$store.state.user.uid,
                    hole_scores: this.hole_scores,
                    timeval: now
                }
                
                const res = await ScoresService.postScore(submittedScore)
            } catch (err) {
                this.error = err
                this.showError = true
            }
        }
    },
    computed: {
        groupedHoles() {
            const groups = []
            for (let i = 0; i < this.holes.length; i += 9) {
                groups.push(this.holes.slice(i, i + 9))
            }
            return groups
        }
    }
}
</script>

<style scoped>
.content {
    display: flex;
    padding-left: 10px;
    gap: 20px;
}

.scorecard-table {
    border-collapse: collapse;
    margin-top: 20px;
}

.scorecard-table th,
.scorecard-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
}

.cell-input {
    width: 50px;
    text-align: center;
}

.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    background: rgba(0,0,0,0.4);

    display: flex;
    justify-content: center;
    align-items: center;

    z-index: 1000;
}
.modal {
    background: white;
    padding: 25px;
    border-radius: 10px;
    width: 300px;
    text-align: center;
}

.modal-buttons {
    margin-top: 15px;
    display: flex;
    justify-content: space-around;
}

.modal-buttons button {
    padding: 8px 16px;
    cursor: pointer;
}
</style>