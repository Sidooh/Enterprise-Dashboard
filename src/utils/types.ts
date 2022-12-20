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

export type Voucher = Model & {
    type: string
    balance: number
    account_id: number
    voucher_type_id: number
}

export type VoucherType = Model & {
    name: string
    is_locked: boolean
    limit_amount: number
    expires_at: string
    settings: string
    vouchers: Voucher[]
}

export type VoucherTransaction = Model & {
    type: string
    amount: number
    description: string
    status: Status
}

export type FloatAccount = Model & {
    account_id: number
    balance: number
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
    accounts: Account[]
}