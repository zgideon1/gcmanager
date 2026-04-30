<template>
    <div class="content">
        <div class="sidebar">
            <div class="sidebar-top">
                <h2>Edit Scorecards: </h2>
                <select v-model.number="selectedSCId">
                    <option disabled value="">-- Select Scorecard --</option>
                    <option
                        v-for="sc in scorecards"
                        :key="sc.id"
                        :value="sc.id"
                    >
                        {{ sc.id }} {{ sc.name }}
                    </option>
                </select>
            </div> 
            <div class="sidebar-bottom">
                <button type="button" @click="expandAddSCPage">
                    Add Scorecard
                </button>

                <button type="button" @click="expandEditSCPage">
                    Edit Scorecard
                </button>

                <button type="button" @click="promptDeleteSC(selectedSCId)">
                    Delete Scorecard
                </button>
            </div>
        </div>
        
        <div class="scpanel" v-if="addSCPageExpanded"> 
            <div class="upanel-top">
                <h2>Add Scorecard</h2>
                <div class="formRow">
                    <label for="scNameInput">Name: </label>
                    <input type="text" name="scname" 
                    id="scNameInput" 
                    placeholder="New Scorecard"
                    v-model="scname"/>
                </div>

                <div class="formRow">
                    <label for="holecount">Hole Count: </label>
                    <select id='holeCount' v-model="holeCount" @change="generateHoles">
                        <option disabled value="">-- Select Hole Count --</option>
                        <option value="9">9</option>
                        <option value="18">18</option>
                        <option value="27">27</option>
                        <option value="36">36</option>
                    </select>
                </div>

                <table class="scorecard-table" id='scorecardheader' v-if="holes.length">
                    <tr>
                        <th id="scorecard-title" colspan='11'>{{ scname }}</th>
                    </tr>

                    <template v-for="(group, index) in groupedAddHoles" :key="index">
        
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
                            <td v-for="hole in group" :key="'p' + hole.holenum">
                                <input type="number" v-model="hole.par" class="cell-input"/>
                            </td>
                            <td class="totals">{{ getTotalPar(index, group) }}</td>
                        </tr>

                        <tr>
                            <th>Yardage <br> (yds)</th>
                            <td v-for="hole in group" :key="'y' + hole.holenum">
                                <input type="number" v-model="hole.yardage" class="cell-input"/>
                            </td>
                            <td class="totals">{{ getTotalYardage(index, group) }}</td>
                        </tr>

                        <tr class="spacer-row">
                            <td colspan="10"></td>
                        </tr>
                    </template>
                </table>
            </div>
            <div class="upanel-bottom">
                <div v-if="showError" v-html="error" class="error"></div>
                <button type="button" class="panelButton" @click="addSC()">
                    Add Scorecard
                </button>
            </div>
        </div>

        <div class="scpanel" v-if="editSCPageExpanded">
            <div class="upanel-top">
                <h2>Current Scorecard</h2>

                <label>New name: </label>
                <input 
                    type="text" 
                    name="scname" 
                    id="scNameInput" 
                    v-model="newscname"/>

                <table class="scorecard-table" id='scorecardheader' v-if="selectedSC_holes.length">
                    <tr>
                        <th id="scorecard-title" colspan='11'>{{ selectedSC.name }}</th>
                    </tr>

                    <template v-for="(group, index) in groupedEditHoles" :key="index">
        
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
                            <td v-for="hole in group" :key="'p' + hole.holenum">
                                <input type="number" v-model="hole.par" class="cell-input"/>
                            </td>
                            <td class="totals">{{ getTotalPar(index, group) }}</td>
                        </tr>

                        <tr>
                            <th>Yardage <br> (yds)</th>
                            <td v-for="hole in group" :key="'y' + hole.holenum">
                                <input type="number" v-model="hole.yardage" class="cell-input"/>
                            </td>
                            <td class="totals">{{ getTotalYardage(index, group) }}</td>
                        </tr>

                        <tr class="spacer-row">
                            <td colspan="10"></td>
                        </tr>
                    </template>
                </table>
            </div>
            <div class="upanel-bottom">
                <div v-if="showError" v-html="error" class="error"></div>
                <button type="button" class="panelButton" @click="promptEdit()">
                    Edit Scorecard
                </button>
            </div>
        </div>

        <div v-if="showDeleteConfirm" class="modal-overlay">
            <div class="modal">
                <p>Are you sure you want to delete scorecard
                    <strong>{{ selectedSC.name }}</strong>?
                </p>

                <div class="modal-buttons">
                    <button @click="confirmDelete">Yes</button>
                    <button @click="cancelDelete">Cancel</button>
                </div>
            </div>
        </div>

        <div v-if="showEditConfirm" class="modal-overlay">
            <div class="modal">
                <p>Edited Information:
                    <strong>{{selectedSC.name}}</strong>
                </p>

                <div class="modal-buttons">
                    <button @click="editSC(selectedSCId)">Yes</button>
                    <button @click="cancelEdit">Cancel</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ScorecardService from "@/services/ScorecardService";

export default {
    data() {
        return {
            error: null,
            addSCPageExpanded: false,
            editSCPageExpanded: false,
            showEditConfirm: false,
            showDeleteConfirm: false,
            activeDropdown: '',
            newSC: null,
            selectedSCId: null,
            selectedSC_holes: [],
            scname: null,
            newscname: null,
            scorecards:[],
            holes: [],
            holeCount: '',
            showError: false,
        }
    },

    async mounted() {
        // Retrieve Scorecards
        try {
            const res1 = await ScorecardService.getScorecards()
            this.scorecards = res1.data

            if (this.scorecards.length > 0) {
                this.selectedSCId = this.scorecards[0].id
            }
        } catch (err) {
            this.error = "Failed to load scorecards"
        }
    },
    watch: {
        selectedSCId(newId) {
            const sc = this.scorecards.find(s => s.id === newId)

            if (sc) {
                this.selectedSC_holes = sc.holes
                    .slice()
                    .sort((a, b) => a.holenum - b.holenum)
                    .map(h => ({ ...h }))

                this.newscname = ''
            } else {
                this.selectedSC_holes = []
                this.newscname = ''
            }
        },
    },
    computed: {
        selectedSC() {
            return this.scorecards?.find(sc => sc.id == this.selectedSCId) || null
        },
        groupedEditHoles() {
            const groups = []
            for (let i = 0; i < this.selectedSC_holes.length; i += 9) {
                groups.push(this.selectedSC_holes.slice(i, i + 9))
            }
            return groups
        },
        groupedAddHoles() {
            const groups = []
            for (let i = 0; i < this.holes.length; i += 9) {
                groups.push(this.holes.slice(i, i + 9))
            }
            return groups
        }
    },
    methods: {
        generateHoles() {
            this.holes = []
            const groups = []

            for (let i = 1; i <= this.holeCount; i++) {
                this.holes.push({
                    holenum: i,
                    par: '',
                    yardage: ''
                })}
        },
        expandAddSCPage() {
            this.addSCPageExpanded = !this.addSCPageExpanded;
            if(this.editSCPageExpanded) {
                this.editSCPageExpanded = false
            }
        },
        expandEditSCPage(){
            this.editSCPageExpanded = !this.editSCPageExpanded
            if(this.addSCPageExpanded) {
                this.addSCPageExpanded = false
            }
        },
        expandDropdown(section) {
            this.activeDropdown = this.activeDropdown === section ? null : section;
        },
        async addSC() {
            try {  
                const scorecard = {
                    name: this.scname,
                    holes: this.holes
                }

                const res = await ScorecardService.createScorecard(scorecard);

                const newList = await ScorecardService.getScorecards()
                this.scorecards = newList.data

                this.selectedSCId = this.scorecards[0]?.id || null
            } catch (err) {
                this.error = "Scorecard could not be created"
                this.showError = true;
                return;
            }
            this.expandAddSCPage()
        },
        promptEdit() {
            if (!this.selectedSC) {
                this.error = "Please select a scorecard to edit.";
                this.showError = true;
                return;
            }
            this.showEditConfirm = true;
        },
        cancelEdit() {
            this.showEditConfirm = false;
        },
        async editSC(id) {
            try {
                let newname = this.selectedSC.name
                if (this.newscname?.trim()) {
                    newname = this.newscname.trim()
                }

                const newData = {
                    name: newname,
                    holes: this.selectedSC_holes 
                }

                const editres = await ScorecardService.editScorecard(id, newData)

                const res = await ScorecardService.getScorecards()
                this.scorecards = res.data

            } catch (err) {
                this.error = "Scorecard could not be edited."
                return;
            }
            this.showEditConfirm = false
        },
        promptDeleteSC(id) {
            if (!id) {
                this.error = "Please select a scorecard to delete.";
                return;
            }
            this.showDeleteConfirm = true;
        },
        async confirmDelete() {
           try {
                await ScorecardService.deleteScorecard(this.selectedSC.id);

                this.showDeleteConfirm = false;
                const res = await ScorecardService.getScorecards();
                this.scorecards = res.data;  
            } catch (err) {
                this.error = "Scorecard could not be deleted.";
            }
        },
        cancelDelete() {
            this.showDeleteConfirm = false;
        },
        getTotalYardage(groupIndex, group) {
            return group.reduce((sum, hole) => {
                return sum + Number(hole.yardage || 0)
            }, 0)
        },
        getTotalPar(groupIndex, group) {
            return group.reduce((sum, hole) => {
                return sum + Number(hole.par || 0)
            }, 0)
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

.sidebar {
    padding-left: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.sidebar-top {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: white;
}

.sidebar-bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
}

.upanel {
    margin-left: 20px;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    min-width: 150px;

    display: flex;
    flex-direction: column;
    height: 90%;
    width: 60%;
}

.upanel-top {
    justify-content: space-between;
    flex: 1;
    overflow-y: auto;
}

.upanel-bottom {
    justify-content: center;
    display: flex;
    flex-direction: column; 
    align-items: center;     
    padding-top: 10px;
    gap: 10px;  
    padding-top: 10px;
}

.scpanel{
    margin-left: 20px;
    padding: 30px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
    min-width: 150px;

    display: flex;
    flex-direction: column;
    height: 90%;
    width: 70%;
}

.label {
    font-size: 0.86rem;
    font-weight: 600;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.value {
    font-size: 0.95rem;
    color: #2c3e50;
    word-break: break-word;
}

#scNameInput {
    height: 30px;
    width: 50%;
    border: 3px solid blue;
    border-radius: 12px;
    font-size: large;
}

#holeCount {
    width: 15%;
}

.formRow {
    display: flex;
    flex-direction: column;
    margin-bottom: 15px;
    gap: 5px;
}

#scorecard-title {
    background: blue;
    border: 2px solid white;
    border-radius: 12px;
    color: white;
    font-size: larger;
}

.scorecard-table {
    border-collapse: collapse;
    margin-top: 20px;
    margin-bottom: 5px;
}

.scorecard-table th,
.scorecard-table td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: center;
}

.spacer-row td {
    height: 15px;
    border: none;
}

.totals {
    color: blue;
    font-size: large
}

.cell-input {
    width: 50px;
    text-align: center;
}

select {
    padding: 15px;
    border-radius: 8px;
    border: none;
    font-size: larger;
    outline: none;
    border: 2px solid blue;
}

button {
    padding: 10px;
    border-radius: 8px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
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