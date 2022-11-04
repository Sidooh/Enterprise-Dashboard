import { IconProp } from "@fortawesome/fontawesome-svg-core";

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