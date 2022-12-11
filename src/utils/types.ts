import { Status } from "@/utils/enums";
import { RouteLocationRaw } from "vue-router";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export type NavLinkChildType = {
    name: string
    to: RouteLocationRaw
    active?: boolean
    icon?: IconDefinition
    children?: NavLinkChildType[]
}
export type NavLinkType = {
    label?: string
    children: NavLinkChildType[]
}

export type Model = {
    id?: number
    created_at?: string
    updated_at?: string
}

export type VoucherType = Model & {
    name: string
    is_locked: boolean
    limit_amount: number
    expires_at: string
    settings: string
}

export type VoucherTransaction = Model & {
    type: number
    amount: number
    description: string
    status: Status
}

export type FloatTransaction = Model & {
    type: number
    amount: number
    description: string
    status: Status
}

export type FloatRequest = Model & {
    amount: number
    status: Status
    modified_by: string
}

export type Account = Model & {
    name: string
    phone: number
    role: string
    status: Status
}

export type Team = Model & {
    name: string
    status: Status
}