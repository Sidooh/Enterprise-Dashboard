import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Status } from "@/utils/enums";

export type NavLinkChildType = {
    name: string
    to?: string
    active?: boolean
    icon?: IconProp
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
    type: string
    limit: number
    status: Status
}

export type FloatTransaction = Model & {
    amount: number
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