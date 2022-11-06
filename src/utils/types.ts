import type { IconProp } from "@fortawesome/fontawesome-svg-core";

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
    status: string
}