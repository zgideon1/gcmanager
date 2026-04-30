<template>
    <div class="container">
        <div class="selectpanel">
            <h3>Select Score</h3>
            <select class="selectScore" v-model.number="selectedScoreId">
                <option disabled value="">-- Select Date --</option>
                <option
                    v-for="sc in scores"
                    :key="sc.id"
                    :value="sc.id"
                >
                    {{ formatDate(sc.timeval) }}
                </option>
            </select>
        </div>
        <div class="upanel">
            <table class="scorecard-table" v-if="holes.length">
                <tr class="scorecard-title">
                    <th colspan="21">
                        <div class="title-row">
                            <span class="left">{{ formatDate(selectedScore?.timeval) }}</span>
                            <span class="right">{{ scorecard.name }}</span>
                        </div>
                    </th>
                </tr>
                <template v-for="(group, index) in groupedHoles" :key="index">

                    <tr class="holegroup">
                        <th class="scorecard-cell" colspan="10">
                            {{ index === 0 ? 'Front 9' : index === 1 ? 'Back 9' : 'Extra ' + (index + 1) }}
                        </th>
                        <th class="totals">Totals</th>
                    </tr>

                    <tr class="scorecard-row">
                        <th class="scorecard-cell">Hole</th>
                        <td class="scorecard-cell" v-for="hole in group" :key="'h' + hole.holenum">
                            {{ hole.holenum }}
                        </td>
                        <td></td>
                    </tr>

                    <tr class="scorecard-row">
                        <th class="scorecard-cell">Par</th>
                        <td class="scorecard-cell" v-for="hole in group" :key="'p' + hole.par">
                            {{ hole.par}}
                        </td>
                        <td class="totals">{{ getTotalPar(index, group) }}</td>
                    </tr>

                    <tr class="scorecard-row">
                        <th class="scorecard-cell">Yardage <br> (yds)</th>
                        <td class="scorecard-cell" v-for="hole in group" :key="'y' + hole.yardage">
                            {{hole.yardage}}
                        </td>
                        <td class="totals">{{ getTotalYardage(index, group) }}</td>
                    </tr>

                    <tr class="scorecard-row">
                        <th class="scorecard-cell">Strokes</th>
                        <td class="strokes-cell" v-for="hole in group" :key="'s' + hole.id">
                            {{ getStrokeForHole(hole) }}
                        </td>

                        <td class="totals">
                            {{ getTotalScore(index, group) }}
                        </td>
                    </tr>

                    <tr class="spacer-row">
                        <td colspan="11"></td>
                    </tr>
                </template>
            </table>
        </div>
    </div>
</template> 

<script>
import ScorecardService from "@/services/ScorecardService";
import ScoresService from "@/services/ScoresService";

export default {
    data() {
        return {
            error: null,
            scname: null,
            scorecard: null,
            holes: [],
            scores: [],
            holeCount: '',
            showError: false,
            selectedScoreId: null,
        }
    },
    async mounted() {
        try{
            // Retrieve Scorecard for user
            const sc_id = this.$store.state.user.scorecard_id
            const res = await ScorecardService.getScorecard(sc_id)
            this.scorecard = res.data
            this.holes = this.scorecard.holes

        } catch (err) {
            this.error = "User scorecard could not be retrieved"
        }   
        
        try {
            // Retrieve user's scores
            const res = await ScoresService.getScore(this.$store.state.user.uid)
            this.scores = res.data

            this.selectedScoreId = this.scores[0].id
        } catch (err) {
            this.error = "Scores could not be retrieved"
        }
    },
    methods: {
        getTotalScore(groupIndex, group) {
            return group.reduce((sum, hole) => {
                const hs = this.selectedScore?.hole_scores?.find(
                    h => Number(h.score_holeid) === Number(hole.id)
                )
                return sum + (hs ? Number(hs.strokes) : 0)
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
        getStrokeForHole(hole) {
            const hs = this.selectedScore?.hole_scores?.find(
                h => Number(h.score_holeid) === Number(hole.id)
            )
            return hs ? hs.strokes : '-'
        },
        formatDate(dateStr) {
        if (!dateStr) return ''

        return new Date(dateStr).toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: 'numeric'
        })},
    },
    computed: {
        groupedHoles() {
            const groups = []
            for (let i = 0; i < this.holes.length; i += 9) {
                groups.push(this.holes.slice(i, i + 9))
            }
            return groups
        },
        selectedScore() {
            return this.scores.find(s => s.id === this.selectedScoreId) || null
        },
        hole_scores() {
           if (!this.selectedScore?.hole_scores) return []

            const map = new Map()

            this.selectedScore.hole_scores.forEach(hs => {
                map.set(Number(hs.score_holeid), Number(hs.strokes))
            })

            return this.holes.map(hole => ({
                score_holeid: hole.id,
                strokes: map.get(Number(hole.id)) ?? null
            }))
        }
    },
}
</script>

<style scoped>
.container {
    height: 97%;
    margin-top: 10px;
}

.selectScore {
    height: 50px;
    width: 100%;
    font-size: large;
    border-radius: 12px;
}

.upanel {
    margin-left: 20px;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    min-width: 150px;
    overflow-y: scroll;
    overflow-x: scroll;

    display: flex;
    flex-direction: column;
    height: 90%;
    width: 70%;
}
.selectpanel {
    margin-left: 20px;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    min-width: 150px;

    font-size: x-large;

    display: flex;
    flex-direction: column;
    height: 90%;
    width: 13%;
}
.scorecard-table {
    border-collapse: collapse;
    margin-top: 20px;
    background-color: white;
    margin: 0 auto;
}

.holegroup {
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    font-size: large;
}

.scorecard-row {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
}

.scorecard-cell {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
    width: 45px;
    height: 50px;
}

.scorecard-title {
    text-align: center;
    background: blue;
    color: white;
    font-size: x-large;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.totals {
    background-color: lightgray;
    font-size: large;
    padding-left: 8px;
    padding-right: 8px;
    border: 2px solid blue;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.strokes-cell {
    background-color: rgb(0, 140, 255);
    color: white;
    font-size: large;
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    border-right: 2px solid white;
}

.title-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    box-sizing: border-box;
}

.spacer-row {
    height: 15px;
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