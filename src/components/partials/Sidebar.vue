<template>
    <nav class="sidebar sidebar-expand-xl position-fixed ps-3 bg-white">
        <div class="d-flex align-items-center">
            <div class="toggle-icon-wrapper">
                <button class="btn sidebar-toggler-humburger-icon sidebar-toggle" data-bs-toggle="tooltip"
                        data-bs-placement="left" aria-label="Toggle Navigation"
                        data-bs-original-title="Toggle Navigation">
                    <span class="sidebar-toggle-icon"><span class="toggle-line"></span></span>
                </button>
            </div>
            <a class="sidebar-brand" href="/">
                <div class="d-flex align-items-center py-3">
                    <img class="me-2" src="/sidooh.png" alt="" width="75">
                </div>
            </a>
        </div>

        <div class="collapse sidebar-collapse" id="sidebarCollapse">
            <div class="sidebar-content scrollbar d-flex justify-content-between">
                <ul class="sidebar-nav mb-3 flex-column">
                    <li class="nav-item accordion" id="accordionExample">
                        <div v-for="(link, i) in navLinks" :key="`nav-link-${i}`">
                            <div v-if="link.label" class="row sidebar-label-wrapper mt-3 mb-2">
                                <div class="col-auto sidebar-label">{{ link.label }}</div>
                                <div class="col ps-0">
                                    <hr class="mb-0 sidebar-divider">
                                </div>
                            </div>

                            <div v-for="(child, i) in link.children" :key="`child-${i}`">
                                <div v-if="child.children">
                                    <div class="accordion-item">
                                        <a class="nav-link dropdown-indicator collapsed"
                                           :href="`#${child.name.replace(/ +/g, '')}`"
                                           role="button" data-bs-toggle="collapse" aria-expanded="false">
                                            <div class="d-flex align-items-center">
                                                <span class="nav-link-icon">
                                                    <font-awesome-icon :icon="child.icon"/>
                                                </span>
                                                <span class="nav-link-text ps-1">{{ child.name }}</span>
                                            </div>
                                        </a>

                                        <ul class="nav accordion-collapse collapse" :id="child.name.replace(/ +/g, '')"
                                            data-bs-parent="#accordionExample">
                                            <li v-for="(gChild, i) in child.children" :key="`g-child-${i}`"
                                                class="nav-item">
                                                <a class="nav-link" :class="{'dropdown-indicator': gChild.children}"
                                                   data-bs-toggle="collapse"
                                                   :href="`#${gChild.name.replace(/ +/g, '')}`">
                                                    <div class="d-flex align-items-center">
                                                        <span class="nav-link-text ps-1">{{ gChild.name }}</span>
                                                    </div>
                                                </a>
                                                <ul v-if="gChild.children" class="nav collapse"
                                                    :id="gChild.name.replace(/ +/g, '')">
                                                    <li class="nav-item" v-for="(ggChild, i) in gChild.children"
                                                        :key="`gg-child-${i}`">
                                                        <a class="nav-link">
                                                            <div class="d-flex align-items-center">
                                                                <span class="nav-link-text ps-1">
                                                                    {{ ggChild.name }}
                                                                </span>
                                                            </div>
                                                        </a>
                                                    </li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <router-link v-else :to="{name:child.label}" class="nav-link">
                                    <div class="d-flex align-items-center">
                                        <span class="nav-link-icon"><font-awesome-icon :icon="child.icon"/></span>
                                        <span class="nav-link-text ps-1">{{ child.name }}</span>
                                    </div>
                                </router-link>
                            </div>
                        </div>
                    </li>
                </ul>

                <ul class="sidebar-nav mt-3 flex-column">
                    <li class="nav-item">
                        <a class="nav-link cursor-pointer" @click="logout">
                            <div class="d-flex align-items-center">
                                <span class="nav-link-icon"><font-awesome-icon :icon="faDoorOpen"/></span>
                                <span class="nav-link-text ps-1">Sign Out</span>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
    faChartPie,
    faCloudBolt,
    faCoins,
    faDoorOpen,
    faIdCard,
    faUserAlt,
    faUsers
} from '@fortawesome/free-solid-svg-icons'
import { onMounted } from "vue";
import { useAuthStore } from "@/stores/auth";
import { NavLinkType } from "@/utils/types";

const navLinks: NavLinkType[] = [
    {
        children: [
            {
                name: 'Dashboard',
                icon: faChartPie,
            }
        ]
    },
    {
        label: 'App',
        children: [
            {
                name: 'Voucher Management',
                active: true,
                icon: faCloudBolt,
                children: [
                    {
                        name: 'Types',
                        to: '/',
                        active: true
                    },
                    {
                        name: 'Disbursement',
                        to: '/',
                        active: true
                    },
                ]
            },
            {
                name: 'Float Management',
                active: true,
                icon: faCoins,
                children: [
                    {
                        name: 'Transactions',
                        to: '/',
                        active: true
                    },
                    {
                        name: 'Requests',
                        to: '/',
                        active: true
                    },
                    {
                        name: 'Course',
                        children: [
                            {
                                name: 'list',
                                to: '#'
                            },
                            {
                                name: 'grid',
                                to: '#'
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Account Management',
                active: true,
                icon: faUsers,
                children: [
                    {
                        name: 'Accounts',
                        to: '/',
                        active: true
                    },
                    {
                        name: 'Teams',
                        to: '/',
                        active: true
                    },
                ]
            },
        ]
    },
    {
        label: 'User',
        children: [
            {
                name: 'Account',
                icon: faUserAlt,
            },
            {
                name: 'Profile',
                icon: faIdCard,
            }
        ]
    }
]

onMounted(() => {
    let navbarVerticalToggle = document.querySelector('.sidebar-toggle');
    let html = document.querySelector('html');

    if (navbarVerticalToggle) {
        navbarVerticalToggle.addEventListener('click', function (e) {
            // navbarVerticalToggle?.blur();
            html?.classList.toggle('sidebar-collapsed');

            // Set collapse state on localStorage

            // let isNavbarVerticalCollapsed = utils.getItemFromStore('isNavbarVerticalCollapsed');
            // utils.setItemToStore('isNavbarVerticalCollapsed', !isNavbarVerticalCollapsed);

            let event = new CustomEvent('sidebar.toggle');

            e.currentTarget?.dispatchEvent(event);
        });
    }
})

const logout = () => useAuthStore().logout()
</script>

<style scoped>
.sidebar {
    padding: 0;
    display: inline-block;
    width: 100%;
    transition: width .2s;
}

.sidebar .toggle-icon-wrapper {
    margin-left: -0.75rem;
    padding-left: .125rem;
    margin-right: 1.25rem;
}

.sidebar-toggler-humburger-icon {
    height: 2.5rem;
    width: 2.5rem;
    padding: .3125rem;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-radius: 50%;
    -webkit-box-shadow: none;
    box-shadow: none
}

.sidebar-toggle-icon {
    position: relative;
    height: .125rem;
    width: 1.25rem;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    display: block;
    top: -0.3125rem;
    padding-right: 0;
}

.sidebar-toggle-icon:before {
    top: .3125rem;
}

.sidebar-toggle-icon:after, .sidebar-toggle-icon:before {
    content: "";
    position: absolute;
    height: .125rem;
    background-color: var(--bs-gray-700);
    left: 0;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    border-radius: .25rem;
    width: 100%;
}

.sidebar-toggle-icon:after {
    top: .625rem;
}

.sidebar-toggle-icon .toggle-line {
    display: block;
    height: 100%;
    border-radius: .25rem;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    background-color: var(--bs-gray-700);
}

.sidebar .sidebar-collapse .sidebar-content {
    padding: 0 1rem;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    max-height: calc(100vh - 4.3125rem);
}

.sidebar .sidebar-collapse .sidebar-content > * {
    width: 100%;
    overflow: hidden;
}

.sidebar-nav {
    --sidooh-nav-link-padding-x: 0;
    --sidooh-nav-link-padding-y: 0.5rem;
    --sidooh-nav-link-color: var(--sidebar-color);
    --sidooh-nav-link-hover-color: var(--sidebar-hover-color);
    --sidooh-nav-link-disabled-color: var(--sidebar-disabled-color);
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}

.sidebar .sidebar-nav {
    font-size: .875rem;
    font-weight: 500;
}

.sidebar .sidebar-nav .nav-item .nav-link {
    color: var(--sidebar-link-color);
}

.sidebar .sidebar-nav .nav-link {
    word-break: break-word;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}

.dropdown-indicator {
    position: relative;
}

.dropdown-indicator:after {
    content: "";
    display: block;
    position: absolute;
    right: 5px;
    height: .4rem;
    width: .4rem;
    border-right: 1px solid #5e6e82;
    border-bottom: 1px solid #5e6e82;
    top: 50%;
    -webkit-transform: translateY(-50%) rotate(45deg);
    -ms-transform: translateY(-50%) rotate(45deg);
    transform: translateY(-50%) rotate(45deg);
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    -webkit-transform-origin: center;
    -ms-transform-origin: center;
    transform-origin: center;
    -webkit-transition-property: border-color, -webkit-transform;
    transition-property: border-color, -webkit-transform;
    -o-transition-property: transform, border-color;
    transition-property: transform, border-color;
    transition-property: transform, border-color, -webkit-transform;
}

.sidebar .dropdown-indicator {
    padding-right: 1rem !important;
}

.sidebar .nav-link {
    outline: none;
}

.nav-link {
    display: block;
    padding: var(--sidooh-nav-link-padding-y) var(--sidooh-nav-link-padding-x);
    color: var(--sidooh-nav-link-color);
    -webkit-transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
    -o-transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
    transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out;
}

.sidebar .sidebar-nav .nav-link-icon {
    width: 1.5rem;
    min-width: 1.5rem;
    font-size: .875rem;
}

.nav {
    --nav-link-padding-x: 1rem;
    --nav-link-padding-y: 0.5rem;
    --nav-link-color: var(--link-color);
    --nav-link-hover-color: var(--link-hover-color);
    --nav-link-disabled-color: #748194;

    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding-left: 0;
    margin-bottom: 0;
    list-style: none;
}

.sidebar .sidebar-nav .nav {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-flow: column nowrap;
    flex-flow: column nowrap;
    font-size: .8333333333rem;
}

.sidebar .sidebar-nav .accordion-item {
    border: none;
}

.sidebar .sidebar-nav .nav .nav-item .nav-link {
    padding: .2rem .2rem .2rem 1.5rem;
}

.sidebar .sidebar-nav .nav .nav .nav-item .nav-link {
    padding-left: 2.625rem;
}

.sidebar .sidebar-divider {
    margin-top: .5625rem;
}

@media (min-width: 1200px) {
    .sidebar-expand-xl .sidebar-collapse {
        display: -webkit-box !important;
        display: -ms-flexbox !important;
        display: flex !important;
        -ms-flex-preferred-size: auto;
        flex-basis: auto;
    }

    .sidebar.sidebar-expand-xl {
        max-width: 15.625rem;
        top: 0;
        height: 100vh;
        margin: 0;
    }

    .sidebar.sidebar-expand-xl .sidebar-toggle {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .sidebar-collapsed .sidebar.sidebar-expand-xl .sidebar-toggle-icon {
        padding-right: .3125rem;
    }

    .sidebar-collapsed .sidebar.sidebar-expand-xl .sidebar-toggle-icon:before {
        width: 50%;
    }

    .sidebar-collapsed .sidebar.sidebar-expand-xl .sidebar-toggle-icon:after {
        width: 75%;
    }

    .sidebar.sidebar-expand-xl .sidebar-collapse {
        margin-top: -0.3125rem;
        -webkit-transition: width .2s ease;
        -o-transition: width .2s ease;
        transition: width .2s ease;
        -webkit-transition-property: width, -webkit-box-shadow;
        transition-property: width, -webkit-box-shadow;
        -o-transition-property: width, box-shadow;
        transition-property: width, box-shadow;
        transition-property: width, box-shadow, -webkit-box-shadow;
        display: inline-block !important;
        width: 12.625rem;
    }

    .sidebar.sidebar-expand-xl .sidebar-content {
        width: 12.625rem;
        height: calc(100vh - 4.3125rem);
        padding: .5rem 0 0 0;
    }

    .sidebar-expand-xl .sidebar-nav {
        -webkit-box-orient: horizontal;
        -webkit-box-direction: normal;
        -ms-flex-direction: row;
        flex-direction: row;
    }

    .sidebar-expand-xl .sidebar-nav .nav-link {
        padding-right: .5rem;
        padding-left: .5rem;
    }

    .sidebar.sidebar-expand-xl .nav-link {
        padding: .7rem 0 .3rem;
    }

    .sidebar-collapsed .sidebar-brand {
        opacity: 0;
    }

    .sidebar-collapsed .sidebar.sidebar-expand-xl {
        z-index: 1030;
        width: 3.125rem;
        height: 100vh;
    }

    .sidebar.sidebar-expand-xl .sidebar-collapse {
        margin-top: -0.3125rem;
        -webkit-transition: width .2s ease;
        -o-transition: width .2s ease;
        transition: width .2s ease;
        -webkit-transition-property: width, -webkit-box-shadow;
        transition-property: width, -webkit-box-shadow;
        -o-transition-property: width, box-shadow;
        transition-property: width, box-shadow;
        transition-property: width, box-shadow, -webkit-box-shadow;
        display: inline-block !important;
        width: 12.625rem;
    }

    .sidebar-collapsed .sidebar.sidebar-expand-xl .dropdown-indicator:after,
    .sidebar-collapsed .sidebar.sidebar-expand-xl .nav-link .badge,
    .sidebar-collapsed .sidebar.sidebar-expand-xl .nav-link-text,
    .sidebar-collapsed .sidebar.sidebar-expand-xl .settings {
        opacity: 0;
        -webkit-transition: all .5s ease;
        -o-transition: all .5s ease;
        transition: all .5s ease;
    }

    .sidebar-collapsed .sidebar.sidebar-expand-xl .sidebar-collapse {
        width: 3.125rem !important;
        margin-left: -1rem;
        overflow: hidden;
    }

    .sidebar-collapsed:not(.sidebar-collapsed-hover) .sidebar.sidebar-expand-xl .sidebar-collapse,
    .sidebar-collapsed:not(.sidebar-collapsed-hover) .sidebar.sidebar-expand-xl .nav.collapse.show,
    .sidebar-collapsed:not(.sidebar-collapsed-hover) .sidebar.sidebar-expand-xl .nav-link .badge,
    .sidebar-collapsed:not(.sidebar-collapsed-hover) .sidebar.sidebar-expand-xl .settings,
    .sidebar-collapsed:not(.sidebar-collapsed-hover) .sidebar.sidebar-expand-xl .nav-link-text {
        display: none;
    }

    .sidebar-collapsed .sidebar.sidebar-expand-xl .sidebar-label {
        display: none;
        -webkit-transition: all .5s ease;
        -o-transition: all .5s ease;
        transition: all .5s ease;
    }

    .sidebar-collapsed .sidebar.sidebar-expand-xl .sidebar-content {
        padding-right: 1rem;
        padding-left: 1rem;
    }

    .sidebar-collapsed:not(.sidebar-collapsed-hover) .sidebar.sidebar-expand-xl .sidebar-divider {
        max-width: 2rem;
    }
}
</style>