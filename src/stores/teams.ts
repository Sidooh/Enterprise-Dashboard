import { defineStore } from "pinia";
import axios from "axios";
import { Team } from "@/utils/types";
import { logger } from "@/utils/logger";

export const useTeamStore = defineStore("team", {
    state: () => ({
        teams: <Team[]>[],
    }),

    actions: {
        async fetchTeams() {
            try {
                const { data } = await axios.get('teams')

                this.teams = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async create(team: Team) {
            try {
                const { data } = await axios.post('/teams', team)

                this.teams.push(data.data)

                return data.data
            } catch (e: any) {
                logger.error(e)
                if (e.response.status === 422 && Boolean(e.response.data)) {
                    throw new Error(e.response.data.errors[0].message)
                } else {
                    throw new Error("Something went wrong.")
                }
            }
        }
    }
})