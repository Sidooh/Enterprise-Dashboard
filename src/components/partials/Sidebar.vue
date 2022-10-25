<template>
    <div class="sidebar position-fixed top-0 start-0 bottom-0 bg-light border-end">
        <div class="d-flex align-items-center p-3">
            <a href="" class="sidebar-logo text-uppercase fw-bold text-decoration-none">Sidooh</a>
            <font-awesome-icon :icon="faCircleLeft" class="ms-auto fs-5 sidebar-toggle"/>
        </div>

        <ul class="sidebar-menu p-3 m-0">
            <li class="sidebar-menu-item active">
                <a href="#">
                    <font-awesome-icon :icon="faDashboard" class="sidebar-menu-item-icon"/>
                    Dashboard
                </a>
            </li>
            <li class="sidebar-menu-divider mt-3 mb-1 text-uppercase">Custom</li>
            <li class="sidebar-menu-item">
                <a href="#">
                    <font-awesome-icon :icon="faDashboard" class="sidebar-menu-item-icon"/>
                    Pages
                </a>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { faCircleLeft, faDashboard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'</script>

<style scoped>
.sidebar {
    width: 16rem;
}

.sidebar-toggle {
    cursor: pointer;
}

.sidebar-toggle:hover {
    color: var(--bs-indigo)
}

.sidebar-menu {
    list-style-type: none;
}

.sidebar-menu-item a {
    text-decoration: none;
    display: flex;
    align-items: center;
    padding: .5rem .75rem;
    color: var(--bs-dark);
    border-radius: .3rem;
    font-size: .875rem;
}

.sidebar-menu-item a:hover {
    background-color: var(--bs-gray-200);
}

.sidebar-menu-item.active a {
    background-color: var(--bs-indigo);
    color: var(--bs-light);
    box-shadow: 0 .25rem .25rem rgba(0, 0, 0, .25);
}

.sidebar-menu-item-icon {
    margin-right: .5rem;
    font-size: 1rem;
}

.sidebar-menu-divider {
    font-size: .75rem;
    margin: 0;
    color: var(--bs-gray-600);
}
</style>