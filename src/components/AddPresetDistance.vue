<template>
    <center-modal :footer='false' @close="close" v-show="isModalVisible">
        <template v-slot:header>
            <h2 class="noselect-nodrag">Ajouter une distance</h2>
            <span @click="close" class="w-6 close-icon"><img alt="close the modal" class="noselect-nodrag"
                                                             src="../assets/icons/cancel.svg"/></span>
        </template>
        <template class="flex justify-center content-center" v-slot:body>
            <div class="bg-primary p-2 rounded-l-lg rounded-t-lg flex justify-between">
                <label class="pr-2 text-white" for="distanceLabel">Libellé</label>
                <input class="pl-4 text-right bg-transparent outline-none text-white" id="distanceLabel"
                       placeholder="ex: Tour du lac..." v-model="label"/>
            </div>
            <div class="bg-primary p-2 mt-2 rounded-l-lg rounded-t-lg flex justify-between">
                <label class="pr-2 text-white" for="distanceValue">Distance</label>
                <div>
                    <input class="pl-4 text-right bg-transparent outline-none text-white" id="distanceValue"
                           placeholder="12.5" v-model="distance"/>
                    <span class="pl-2 text-white">km</span>
                </div>

            </div>
            <div class="flex justify-center" v-if="newDistance && distance !==''">
                <button @click="addDistance" aria-label="Add distance"
                        class="btn noselect-nodrag outline-none focus:outline-none rounded-lg mt-2 pl-2 pr-2 pt-1 pb-1 border-primary border"
                        type="button">
                    Ajouter
                </button>
            </div>
            <div v-else-if="matchDistanceLabel !== ''">
                <p class="text-center pt-1 mt-2">Cette distance existe, sous le nom <b>{{matchDistanceLabel}}</b></p>
            </div>
            <div v-else-if="matchDistanceValue !== ''">
                <p class="text-center pt-1 mt-2">Ce nom existe, associé à <b>{{matchDistanceValue}}km</b></p>
            </div>
        </template>
    </center-modal>
</template>

<script>
    import CenterModal from '@/components/CenterModal'

    export default {
        name: "Settings",
        data() {
            return {
                isModalVisible: true,
                label: '',
                distance: '',
                newDistance: false,
                matchDistanceLabel: '',
                matchDistanceValue: ''
            }
        },
        components: {CenterModal},
        mounted() {
        },
        methods: {
            close() {
                this.$emit('close');
            },
            addDistance() {
                this.$store.commit('addPresetDistance', {label: this.label, distance: this.distance});
                this.label = '';
                this.distance = '';
                this.close();
            }
        },
        watch: {
            label: function (newVal, oldVal) {
                this.label = newVal.length > 30 ? oldVal : newVal;

                if (this.$store.state.defaultDistances.find(defaultDist =>
                    defaultDist.label === this.label)) {
                    this.newDistance = false;
                    this.matchDistanceValue = this.$store.state.defaultDistances.find(defaultDist =>
                        defaultDist.label === this.label).distance;
                    console.log(this.matchDistanceValue)
                } else {
                    this.newDistance = true;
                    this.matchDistanceValue = '';
                }

            },
            distance: function (newVal, oldVal) {
                if (this.distance !== '') {
                    // check leading zero is followed by zero or , / .
                    if (this.distance.match(/^0{2,}(?![.,])/g)) {
                        // if yes : cancelling the input
                        this.distance = oldVal
                    }
                    // removing all others leading zeros by
                    this.distance = this.distance.replace(/^0([0-9]+)/g, '$1');

                    // if distance matches at least partially with the pattern ?
                    if (this.distance.match(/\d{0,9}([.,]\d{0,4})?/g)) {
                        // if not exactly match
                        if (this.distance.match(/\d{0,9}([.,]\d{0,4})?/g)[0] !== this.distance) {
                            // cancelling the input
                            this.distance = oldVal
                        }
                        // else : cancelling the input
                    } else {
                        this.distance = oldVal;
                        this.matchDistanceLabel = '';

                    }
                }
                if (this.$store.state.defaultDistances.find(defaultDist =>
                    defaultDist.distance === this.distance)) {
                    this.newDistance = false;
                    this.matchDistanceLabel = this.$store.state.defaultDistances.find(defaultDist =>
                        defaultDist.distance === this.distance).label;
                    console.log(this.matchDistanceLabel)
                } else {
                    this.newDistance = true;
                    this.matchDistanceLabel = '';
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    .link {
        text-decoration: underline;
        text-decoration-color: $ma-secondary;
        transition: all 500ms;

        &:hover {
            text-decoration-color: $ma-primary;
        }
    }

    .close-icon {
        transition: all 200ms;
        cursor: pointer;

        &:hover {
            transform: scale(1.2);
        }
    }

</style>