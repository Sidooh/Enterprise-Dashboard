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
            <div class="sidebar-content scrollbar">
                <ul class="sidebar-nav mb-3 flex-column">
                    <li class="nav-item">
                        <a class="nav-link dropdown-indicator collapsed" href="#dashboard"
                           role="button" data-bs-toggle="collapse" aria-expanded="false"
                           aria-controls="dashboard">
                            <div class="d-flex align-items-center">
                                <span class="nav-link-icon">
                                    <font-awesome-icon :icon="faChartPie"/>
                                </span>
                                <span class="nav-link-text ps-1">Dashboard</span>
                            </div>
                        </a>
                        <ul class="nav collapse" id="dashboard" style="">
                            <li class="nav-item">
                                <a class="nav-link" href="../../../index.html">
                                    <div class="d-flex align-items-center"><span
                                        class="nav-link-text ps-1">Default</span></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../../../dashboard/analytics.html">
                                    <div class="d-flex align-items-center"><span
                                        class="nav-link-text ps-1">Analytics</span></div>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../../../dashboard/crm.html">
                                    <div class="d-flex align-items-center"><span class="nav-link-text ps-1">CRM</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li class="nav-item">
                        <!-- label-->
                        <div class="row sidebar-label-wrapper mt-3 mb-2">
                            <div class="col-auto sidebar-label">App</div>
                            <div class="col ps-0">
                                <hr class="mb-0 sidebar-divider">
                            </div>
                        </div>
                        <a class="nav-link" href="../../../app/chat.html" role="button">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><svg
                                class="svg-inline--fa fa-comments fa-w-18" aria-hidden="true" focusable="false"
                                data-prefix="fas" data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor"
                                                                             d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
                                <!-- <span class="fas fa-comments"></span> Font Awesome fontawesome.com --></span><span
                                class="nav-link-text ps-1">Chat</span></div>
                        </a>
                        <a class="nav-link dropdown-indicator" href="#e-learning" role="button"
                           data-bs-toggle="collapse" aria-expanded="false" aria-controls="e-learning">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><svg
                                class="svg-inline--fa fa-graduation-cap fa-w-20" aria-hidden="true" focusable="false"
                                data-prefix="fas" data-icon="graduation-cap" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path
                                fill="currentColor"
                                d="M622.34 153.2L343.4 67.5c-15.2-4.67-31.6-4.67-46.79 0L17.66 153.2c-23.54 7.23-23.54 38.36 0 45.59l48.63 14.94c-10.67 13.19-17.23 29.28-17.88 46.9C38.78 266.15 32 276.11 32 288c0 10.78 5.68 19.85 13.86 25.65L20.33 428.53C18.11 438.52 25.71 448 35.94 448h56.11c10.24 0 17.84-9.48 15.62-19.47L82.14 313.65C90.32 307.85 96 298.78 96 288c0-11.57-6.47-21.25-15.66-26.87.76-15.02 8.44-28.3 20.69-36.72L296.6 284.5c9.06 2.78 26.44 6.25 46.79 0l278.95-85.7c23.55-7.24 23.55-38.36 0-45.6zM352.79 315.09c-28.53 8.76-52.84 3.92-65.59 0l-145.02-44.55L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.18-113.47-145.03 44.56z"></path></svg>
                                <!-- <span class="fas fa-graduation-cap"></span> Font Awesome fontawesome.com --></span><span
                                class="nav-link-text ps-1">E learning</span><span
                                class="badge rounded-pill ms-2 badge-soft-success">New</span></div>
                        </a>
                        <ul class="nav collapse" id="e-learning">
                            <li class="nav-item"><a class="nav-link dropdown-indicator" href="#course"
                                                    data-bs-toggle="collapse" aria-expanded="false"
                                                    aria-controls="e-learning">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Course</span>
                                </div>
                            </a>
                                <ul class="nav collapse" id="course">
                                    <li class="nav-item">
                                        <a class="nav-link" href="../../../app/e-learning/course/course-list.html">
                                            <div class="d-flex align-items-center">
                                                <span class="nav-link-text ps-1">Course list</span>
                                            </div>
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="../../../app/e-learning/course/course-grid.html">
                                            <div class="d-flex align-items-center">
                                                <span class="nav-link-text ps-1">Course grid</span>
                                            </div>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="../../../app/e-learning/student-overview.html">
                                    <div class="d-flex align-items-center"><span
                                        class="nav-link-text ps-1">Student overview</span></div>
                                </a>
                            </li>
                            <li class="nav-item"><a class="nav-link"
                                                    href="../../../app/e-learning/trainer-profile.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Trainer profile</span></div>
                            </a>
                            </li>
                        </ul>
                        <a class="nav-link" href="../../../app/kanban.html" role="button">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><svg
                                class="svg-inline--fa fa-trello fa-w-14" aria-hidden="true" focusable="false"
                                data-prefix="fab" data-icon="trello" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor"
                                                                             d="M392.3 32H56.1C25.1 32 0 57.1 0 88c-.1 0 0-4 0 336 0 30.9 25.1 56 56 56h336.2c30.8-.2 55.7-25.2 55.7-56V88c.1-30.8-24.8-55.8-55.6-56zM197 371.3c-.2 14.7-12.1 26.6-26.9 26.6H87.4c-14.8.1-26.9-11.8-27-26.6V117.1c0-14.8 12-26.9 26.9-26.9h82.9c14.8 0 26.9 12 26.9 26.9v254.2zm193.1-112c0 14.8-12 26.9-26.9 26.9h-81c-14.8 0-26.9-12-26.9-26.9V117.2c0-14.8 12-26.9 26.8-26.9h81.1c14.8 0 26.9 12 26.9 26.9v142.1z"></path></svg>
                                <!-- <span class="fab fa-trello"></span> Font Awesome fontawesome.com --></span><span
                                class="nav-link-text ps-1">Kanban</span></div>
                        </a>
                        <a class="nav-link dropdown-indicator" href="#social" role="button" data-bs-toggle="collapse"
                           aria-expanded="false" aria-controls="social">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><svg
                                class="svg-inline--fa fa-share-alt fa-w-14" aria-hidden="true" focusable="false"
                                data-prefix="fas" data-icon="share-alt" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor"
                                                                             d="M352 320c-22.608 0-43.387 7.819-59.79 20.895l-102.486-64.054a96.551 96.551 0 0 0 0-41.683l102.486-64.054C308.613 184.181 329.392 192 352 192c53.019 0 96-42.981 96-96S405.019 0 352 0s-96 42.981-96 96c0 7.158.79 14.13 2.276 20.841L155.79 180.895C139.387 167.819 118.608 160 96 160c-53.019 0-96 42.981-96 96s42.981 96 96 96c22.608 0 43.387-7.819 59.79-20.895l102.486 64.054A96.301 96.301 0 0 0 256 416c0 53.019 42.981 96 96 96s96-42.981 96-96-42.981-96-96-96z"></path></svg>
                                <!-- <span class="fas fa-share-alt"></span> Font Awesome fontawesome.com --></span><span
                                class="nav-link-text ps-1">Social</span></div>
                        </a>
                        <ul class="nav collapse" id="social">
                            <li class="nav-item"><a class="nav-link" href="../../../app/social/feed.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Feed</span>
                                </div>
                            </a>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/social/activity-log.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Activity log</span></div>
                            </a>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/social/notifications.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Notifications</span></div>
                            </a>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/social/followers.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Followers</span>
                                </div>
                            </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faChartPie } from '@fortawesome/free-solid-svg-icons'
import { onMounted } from "vue";

onMounted(() => {
    let navbarVerticalToggle = document.querySelector('.sidebar-toggle');
    let html = document.querySelector('html');

    if (navbarVerticalToggle) {
        navbarVerticalToggle.addEventListener('click', function (e) {
            navbarVerticalToggle.blur();
            html.classList.toggle('sidebar-collapsed'); // Set collapse state on localStorage

            // let isNavbarVerticalCollapsed = utils.getItemFromStore('isNavbarVerticalCollapsed');
            // utils.setItemToStore('isNavbarVerticalCollapsed', !isNavbarVerticalCollapsed);

            let event = new CustomEvent('sidebar.toggle');

            e.currentTarget.dispatchEvent(event);
        });
    }
})
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
        padding: .35rem 0;
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


/*.sidebar.collapsed {
    width: 4.5rem;
}

.sidebar::-webkit-scrollbar {
    width: .25rem;
}

.sidebar::-webkit-scrollbar-track {
    background-color: var(--bs-gray-300);
}

.sidebar::-webkit-scrollbar-thumb {
    background-color: var(--bs-gray-500);
}

.sidebar::-webkit-scrollbar-thumb:hover {
    background-color: var(--bs-gray-600);
}

.sidebar.collapsed:hover .sidebar-toggle {
    margin-left: auto;
    margin-right: 0;
}

.sidebar.collapsed .sidebar-toggle {
    margin: 0 auto;
    transform: rotateZ(180deg);
}

.sidebar.collapsed:hover .sidebar-logo {
    display: block;
}

.sidebar.collapsed .sidebar-logo {
    display: none;
}

.sidebar-toggle {
    cursor: pointer;
    transition: .2s;
}

.sidebar-toggle:hover {
    color: var(--bs-indigo)
}

.sidebar-menu {
    list-style-type: none;
}

.sidebar-menu-item {
    margin-bottom: .25rem;
}

.sidebar-menu-item a {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: .5rem .75rem;
    color: var(--bs-dark);
    border-radius: .3rem;
    font-size: .875rem;
    white-space: nowrap;
}

.sidebar-menu-item > a {
    overflow: hidden;
}

.sidebar-menu-item.focused > a,
.sidebar-menu-item > a:hover {
    background-color: var(--bs-gray-200);
}

.sidebar-menu-item.active a {
    background-color: var(--bs-indigo);
    color: var(--bs-light);
}

.sidebar-menu-item-accordion {
    transition: transform .2s;
}

.sidebar-dropdown-menu-item.focused > a .sidebar-menu-item-accordion,
.sidebar-menu-item.focused > a .sidebar-menu-item-accordion {
    transform: rotateZ(180deg);
}

.sidebar-menu-item-icon {
    margin-right: .65rem;
    font-size: 1rem;
}

.sidebar.collapsed:hover .sidebar-menu-divider,
.sidebar-menu-divider {
    font-size: .75rem;
    margin: 0;
    color: var(--bs-gray-600);
    transition: opacity .2s;
    opacity: 1;
    visibility: visible;
}

.sidebar.collapsed .sidebar-menu-divider {
    opacity: 0;
    visibility: hidden;
}

.sidebar-dropdown-menu {
    padding-left: 3rem;
}

.sidebar-dropdown-menu .sidebar-dropdown-menu {
    padding-left: 1rem;
    list-style-type: circle;
}

.sidebar-dropdown-menu-item a {
    padding: .375rem .75rem .375rem 0;
}

.sidebar-dropdown-menu-item.focused > a,
.sidebar-dropdown-menu-item a:hover {
    color: var(--bs-indigo);
}*/
</style>