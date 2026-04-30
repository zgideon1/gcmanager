<template>
  <div class="container">
    <div class="upanel">
        <h2 class="pagetitle"> Post a New Score:</h2>
            <table class="scorecard-table" id='scorecardheader' v-if="holes.length">
                <tr class="scorecard-title">
                    <th colspan="21">
                        <div class="title-row">
                            <span class="left">{{ formatDate(selectedScore?.timeval) }}</span>
                            <span class="right">{{ scorecard.name }}</span>
                        </div>
                    </th>
                </tr>

                <template v-for="(group, index) in groupedHoles" :key="index">
                    
                    <tr class="section-header">
                        <th colspan="10">
                            {{ index === 0 ? 'Front 9' : index === 1 ? 'Back 9' : 'Extra ' + (index + 1) }}
                        </th>
                        <th>Totals</th>
                    </tr>

                    <tr>
                        <th>Hole</th>
                        <td v-for="hole in group" :key="'h' + hole.holenum">
                            {{ hole.holenum }}
                        </td>
                        <td></td>
                    </tr>

                    <tr>
                        <th>Par</th>
                        <td v-for="hole in group" :key="'p' + hole.par">
                            {{ hole.par}}
                        </td>
                        <td class="totals">{{ getTotalPar(index, group) }}</td>
                    </tr>

                    <tr>
                        <th>Yardage <br> (yds)</th>
                        <td v-for="hole in group" :key="'y' + hole.yardage">
                            {{hole.yardage}}
                        </td>
                        <td class="totals">{{ getTotalYardage(index, group) }}</td>
                    </tr>

                    <tr>
                        <th>Strokes</th>
                        <td v-for="(hole, i) in group" :key="'s' + hole.id">
                            <input
                            type="number"
                            v-model.number="hole_scores[index * 9 + i].strokes"
                            class="cell-input"
                            />
                        </td>

                        <td class="totalscore">
                            {{ getTotalScore(index, group) }}
                        </td>
                    </tr>

                    <tr class="spacer-row">
                        <td colspan="11"></td>
                    </tr>
                </template>
            </table>
            <div v-if="showError" v-html="error" class="error"></div>
            <div v-if="showSuccess" class="modal-overlay">
                <div class="modal">
                    <h3>Score Submitted Successfully</h3>

                    <div class="modal-buttons">
                        <button @click="closeSuccess">OK</button>
                    </div>
                </div>
            </div>
            <button id="submitScoreButton" @click="submitScore">Submit Score</button>
        </div>
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
            showSuccess: false,
            successTimer: null,
            hole_scores: null,
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
        formatDate() {
            return new Date().toLocaleDateString('en-US', {
                month: '2-digit',
                day: '2-digit',
                year: 'numeric'
            })
        },
        validateScores() {
            return this.hole_scores.every(h => {
                return h.strokes !== null &&
                    h.strokes !== '' &&
                    Number(h.strokes) > 0
            })
        },
        getTotalScore(groupIndex, group) {
            return group.reduce((sum, _, i) => {
                const val = this.hole_scores[groupIndex * 9 + i]?.strokes
                return sum + (val !== null && val !== '' && val !== undefined ? Number(val) : 0)
            }, 0)
        },
        getTotalYardage(groupIndex, group) {
            return group.reduce((sum, _, i) => {
                const val = this.holes[groupIndex * 9 + i]?.yardage
                return sum + (val !== null && val !== '' && val !== undefined ? Number(val) : 0)
            }, 0)
        },
        getTotalPar(groupIndex, group) {
            return group.reduce((sum, _, i) => {
                const val = this.holes[groupIndex * 9 + i]?.par
                return sum + (val !== null && val !== '' && val !== undefined ? Number(val) : 0)
            }, 0)
        },
        async submitScore(){
            if (!this.validateScores()) {
                this.error = "All holes must have a value greater than 0"
                this.showError = true
                return
            }
            try {
                const now = new Date()

                const submittedScore = {
                    score_uid: this.$store.state.user.uid,
                    hole_scores: this.hole_scores,
                    timeval: now
                }
                
                const res = await ScoresService.postScore(submittedScore)

                this.hole_scores = this.holes.map(hole => ({
                    score_holeid: hole.id,
                    strokes: null,
                }))
                this.showSuccessModal()
            } catch (err) {
                this.error = "Could not submit score. Make sure all fields have a value and are positive numbers"
                this.showError = true
            }
        },
        showSuccessModal() {
            this.showSuccess = true

            // auto-close after 10 seconds
            this.successTimer = setTimeout(() => {
                this.closeSuccess()
            }, 10000)
        },

        closeSuccess() {
            this.showSuccess = false

            if (this.successTimer) {
                clearTimeout(this.successTimer)
                this.successTimer = null
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
.container {
  text-align: center;
}

.pagetitle{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: xx-large;
}

.dateContainer {
    border: 2px solid blue;
    width: 59%;
    height: 9%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 auto;
    color: white;
    background-color: blue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: medium;
}

.dateContainer h2{
    margin-left: 15px;
    margin-right: 15px;
}

.scorecard-table {
    border-collapse: collapse;
    margin-top: 20px;
    margin: 0 auto;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: 1
}

.scorecard-title {
    text-align: center;
    background: blue;
    color: white;
    font-size: x-large;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    box-sizing: border-box;
}

.scorecard-table th,
.scorecard-table td {
    border: 1px solid gray;
    padding: 12px;
    text-align: center;
    font-size: larger;
}

.scorecard-table input {
    height: 35px;
    border: 3px solid lightblue;
    border-radius: 12px;
    background-color: blue;
    color: white;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: large;
}

.scorecard-table input:focus {
    background-color: white;
    color: blue;
}

.totals {
    color: blue;
    font-size: large
}

.totalscore {
    color: blue;
    font-size: x-large;
}

.upanel {
    padding: 10px;
    background-color: white;
    justify-content: space-between;
    flex: 1;
    overflow-y: auto;
}

#submitScoreButton {
    justify-self: center;
    height: 9%;
    width: 10%;
    background-color: blue;
    border: 2px solid blue;
    border-radius: 15px;
    transition: transform 0.25s ease, box-shadow 0.25s ease;
    color: white;
    margin-top: 15px;
    font-size: larger;
}
#submitScoreButton:hover {
    background-color: white;
    color: black;
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

.error {
    justify-content: center;
    align-content: center;
    align-self: center;
    display: flex;
    color:red;
    font-size: 20px;
    border-radius: 10px;
    background-color: white;
}
</style>