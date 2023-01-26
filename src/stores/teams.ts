import { defineStore } from "pinia";
import { Team } from "@/utils/types";
import { logger } from "@nabcellent/sui-vue";
import client from "@/utils/client";

export const useTeamStore = defineStore("team", {
    state: () => ({
        team: <Team>{},
        teams: <Team[]>[],
    }),

    actions: {
        async fetchTeams() {
            try {
                const { data } = await client.get('teams')

                this.teams = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async fetchTeam(id: number) {
            try {
                const { data } = await client.get(`teams/${id}`)

                logger.info(data.data)
                this.team = data.data

                return data.data
            } catch (e) {
                logger.error(e)
            }
        },
        async create(team: Team) {
            try {
                const { data } = await client.post('/teams', team)

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
        },
        async addAccount(teamId: number, account_id: number) {
            try {
                const { data } = await client.post(`/teams/${teamId}/accounts`, { account_id })

                logger.info(data)
                if(data.status) {
                    this.team.accounts.push(data.data)
                } else {
                    throw new Error("Something went wrong")
                }

                return data.data
            } catch (e: any) {
                logger.error(e)

                if ([400, 422].includes(e.response?.status) && Boolean(e.response.data)) {
                    throw new Error(e.response.data.message)
                } else if (e.response?.status === 401 && e.response.data) {
                    throw new Error('Invalid credentials!')
                } else if (e.response?.status === 429) {
                    throw new Error("Sorry! We failed to log you in. Please try again in a few minutes.")
                } else {
                    throw new Error('Something went wrong!')
                }
            }
        }
    }
})