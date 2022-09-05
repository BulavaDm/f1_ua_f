<template>
    <div class="standings">
        <div class="standings__drivers drivers">
            <div class="drivers__editor">
                <div class="drivers__details">
                    <div class="drivers__name">
                        <app-base-input
                            v-model="driver.name"
                            :label="'Пілот'"
                        />
                    </div>
                    <div class="drivers__team">
                        <app-base-select ref="team"
                            :label="'Команда'"
                            :selected-option="selectedTeam"
                            :options="teams"
                            @select="selectTeam"
                        />
                    </div>
                </div>
                <div class="drivers__control">
                    <div class="drivers__control-btn">
                        <app-control-btn
                            :text="'Очистити'"
                            @action="clearDriver"
                        />
                    </div>
                    <div class="drivers__control-btn">
                        <app-control-btn
                            :text="isUpdateDriver ? 'Зберегти' : 'Створити'"
                            @action="doActionDriver"
                        />
                    </div>
                </div>
            </div>
            <div class="drivers__view">
                <div class="drivers__all">
                    <div class="drivers__label">
                        Усі пілоти
                    </div>
                    <div class="drivers__drivers" ref="driversList">
                        <div v-if="!isLoadedDrivers" class="drivers__wrapper" :style="{ 'maxHeight': maxHeight.driversList }">
                            <div v-for="driver in drivers" :key="driver.id" class="drivers__card">
                                <driver-card
                                    :id="driver.id"
                                    :name="driver.name"
                                    :team="driver.teamName"
                                    :points="driver.points"
                                    @update="updateDriver"
                                    @delete="deleteDriver"
                                    @update-points="updateDriverPoints"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="drivers__update">
                    <div class="drivers__control-btn">
                        <app-control-btn
                            :text="'Зберегти'"
                            @action="saveDriverResults"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="standings__teams teams">
            <div class="teams__editor">
                <div class="teams__name">
                    <app-base-input
                        v-model="team.name"
                        :label="'Назва команди'"
                    />
                </div>
                <div class="teams__control">
                    <div class="teams__control-btn">
                        <app-control-btn
                            :text="'Очистити'"
                            @action="clearTeam"
                        />
                    </div>
                    <div class="teams__control-btn">
                        <app-control-btn
                            :text="isUpdateTeam ? 'Зберегти' : 'Створити'"
                            @action="doActionTeam"
                        />
                    </div>
                </div>
            </div>
            <div class="teams__view">
                <div class="teams__all">
                    <div class="teams__label">
                        Усі команди
                    </div>
                    <div class="teams__teams" ref="teamsList">
                        <div v-if="!isLoadedTeams" class="teams__wrapper" :style="{ 'maxHeight': maxHeight.teamsList }">
                            <div v-for="team in teams" :key="team.id" class="teams__card">
                                <team-card
                                    :id="team.id"
                                    :name="team.name"
                                    :points="team.points"
                                    @update="updateTeam"
                                    @delete="deleteTeam"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TeamCard from "./TeamCard";
    import DriverCard from "./DriverCard";
    import { child, get, getDatabase, ref as dRef, remove, set, update } from "firebase/database";
    import { generateTemporaryId } from "../../helpers/common";
    import _sortBy from "lodash.sortby";

    export default {
        name: "StandingsControl",

        components: {
            DriverCard,
            TeamCard
        },

        data() {
            return {
                driver: {
                    name : ''
                },
                selectedTeam: null,

                team: {
                    name : ''
                },

                isLoadedTeams: false,
                isLoadedDrivers: false,
                drivers: [],
                teams: [],

                isUpdateTeam: false,
                isUpdateDriver: false,

                maxHeight: {
                    teamsList: '',
                    driversList: ''
                },
            }
        },

        created() {
            this.getAllDrivers();
        },

        mounted() {
            this.calculateMaxHeight();
        },

        methods: {
            getAllDrivers() {
                this.isLoadedDrivers = true;

                const dbRef = dRef(getDatabase());

                get(child(dbRef, 'drivers'))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const driversKeys = Object.keys(snapshot.val());

                            const drivers = driversKeys.map((key) => {
                                const driver = snapshot.val()[key];
                                driver.id = key;
                                return driver;
                            });

                            this.drivers = _sortBy(drivers, (driver) => parseFloat(driver.points)).reverse();
                        } else {
                            this.drivers = [];
                        }

                        this.getAllTeams();
                    })
                    .finally(() => {
                        this.isLoadedDrivers = false;
                    })
            },

            getAllTeams() {
                this.isLoadedTeams = true;

                const dbRef = dRef(getDatabase());

                get(child(dbRef, 'teams'))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const teamsKeys = Object.keys(snapshot.val());

                            const teams = teamsKeys.map((key) => {
                                const team = snapshot.val()[key];
                                team.id = key;
                                team.points =
                                    this.drivers
                                        .filter((driver) => driver.teamId === key)
                                        .reduce((prev, current) => prev + parseInt(current.points), 0);

                                return team;
                            });

                            this.teams = _sortBy(teams, (team) => parseFloat(team.points)).reverse();
                        } else {
                            this.teams = [];
                        }
                    })
                    .finally(() => {
                        this.isLoadedTeams = false;
                    })
            },

            calculateMaxHeight() {
                this.maxHeight.teamsList = `${this.$refs.teamsList.offsetHeight}px`;
                this.maxHeight.driversList = `${this.$refs.driversList.offsetHeight - 20}px`;
            },

            clearTeam() {
                this.team.name = '';
                this.isUpdateTeam = false;
            },

            doActionTeam() {
                if (!this.isUpdateTeam) {
                    this.createTeam();
                } else {
                    this.changeTeam();
                }
            },

            doActionDriver() {
                if (!this.isUpdateDriver) {
                    this.createDriver();
                } else {
                    this.changeDriver();
                }
            },

            createDriver() {
                const id = generateTemporaryId();
                const db = getDatabase();

                set(dRef(db, `drivers/${id}`), {
                    name: this.driver.name,
                    teamId: this.selectedTeam.id,
                    teamName: this.selectedTeam.name,
                    points: 0
                })
                    .then(() => {
                        this.getAllDrivers();
                        this.clearDriver();
                    });
            },

            changeDriver() {
                const id = this.driver.id;
                const db = getDatabase();

                update(dRef(db, `drivers/${id}`), {
                    name: this.driver.name,
                    teamId: this.selectedTeam.id,
                    teamName: this.selectedTeam.name,
                })
                    .then(() => {
                        this.getAllDrivers();
                        this.clearDriver();
                    });
            },

            deleteDriver(id) {
                const db = getDatabase();

                remove(dRef(db, `drivers/${id}`))
                    .then(() => {
                        this.getAllDrivers();
                    });
            },

            createTeam() {
                const id = generateTemporaryId();
                const db = getDatabase();

                set(dRef(db, `teams/${id}`), {
                    name: this.team.name
                })
                    .then(() => {
                        this.getAllTeams();
                        this.clearTeam();
                    });
            },

            changeTeam() {
                const id = this.team.id;
                const db = getDatabase();

                update(dRef(db, `teams/${id}`), {
                    name: this.team.name,
                })
                    .then(() => {
                        this.getAllTeams();
                        this.clearTeam();
                    });
            },

            deleteTeam(id) {
                const db = getDatabase();

                remove(dRef(db, `teams/${id}`))
                    .then(() => {
                        this.getAllTeams();
                    });
            },

            updateTeam(id) {
                const selectedTeam = this.teams.find((team) => team.id === id);
                this.team = { ...selectedTeam };
                this.isUpdateTeam = true;
            },

            updateDriver(id) {
                const selectedDriver = this.drivers.find((driver) => driver.id === id);
                this.driver = { ...selectedDriver };
                this.selectedTeam = this.teams.find((team) => team.id === selectedDriver.teamId);
                this.isUpdateDriver = true;
            },

            selectTeam(team) {
                this.selectedTeam = team;
            },

            clearDriver() {
                this.driver.name = '';
                this.$refs.team.clearSelectedOption();
                this.isUpdateDriver = false;
            },

            updateDriverPoints(id, points) {
                const driver = this.drivers.find((driver) => driver.id === id);
                driver.points = points;
            },

            saveDriverResults() {
                const db = getDatabase();

                this.drivers.forEach((driver) => {
                    const id = driver.id;

                    update(dRef(db, `drivers/${id}`), {
                        points: driver.points,
                    })
                })

                this.getAllDrivers();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .standings {
        padding: 30px;
        display: flex;
        height: 100%;

        &__drivers {
            width: 50%;
            padding-right: 30px;
        }

        &__teams {
            width: 50%;
        }
    }

    .drivers, .teams {
        display: flex;

        &__editor {
            width: 50%;
            padding-right: 30px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }

        &__view {
            width: 50%;
        }

        &__all {
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        &__name {
            margin-bottom: 15px;
        }

        &__control, &__update {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 15px;
        }

        &__control-btn {
            width: 200px;
            padding: 15px;
            background: #C1CFEA;

            &:not(:last-child) {
                margin-right: 15px;
            }
        }

        &__teams, &__drivers {
            height: 100%;
            flex-grow: 1;
        }

        &__card {
            &:not(:last-child) {
                margin-bottom: 15px;
            }
        }

        &__wrapper {
            height: 100%;
            overflow-y: auto;
            scrollbar-width: none;
        }

        &__label {
            margin-bottom: 8px;
        }
    }

    .drivers__view {
        display: flex;
        flex-direction: column;
    }
</style>