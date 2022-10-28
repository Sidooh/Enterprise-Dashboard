<template>
    <div class="sidebar position-fixed top-0 start-0 bottom-0 bg-light border-end">
        <div class="d-flex align-items-center p-3">
            <a href="" class="sidebar-logo text-uppercase fw-bold">
                <img src="/sidooh.png" alt="" width="75">
            </a>
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
            <li class="sidebar-menu-item has-dropdown">
                <a href="#">
                    <font-awesome-icon :icon="faDashboard" class="sidebar-menu-item-icon"/>
                    Ecommerce
                    <font-awesome-icon :icon="faCaretDown" class="sidebar-menu-item-accordion ms-auto"/>
                </a>
                <ul class="sidebar-dropdown-menu">
                    <li class="sidebar-dropdown-menu-item"><a href="">User Profile</a></li>
                    <li class="sidebar-dropdown-menu-item has-dropdown">
                        <a href="">
                            Blog
                            <font-awesome-icon :icon="faCaretDown" class="sidebar-menu-item-accordion ms-auto"/>
                        </a>
                        <ul class="sidebar-dropdown-menu">
                            <li class="sidebar-dropdown-menu-item"><a href="">Home</a></li>
                            <li class="sidebar-dropdown-menu-item"><a href="">Post</a></li>
                        </ul>
                    </li>
                    <li class="sidebar-dropdown-menu-item has-dropdown">
                        <a href="">
                            Emails
                            <font-awesome-icon :icon="faCaretDown" class="sidebar-menu-item-accordion ms-auto"/>
                        </a>
                        <ul class="sidebar-dropdown-menu">
                            <li class="sidebar-dropdown-menu-item"><a href="">Reset</a></li>
                            <li class="sidebar-dropdown-menu-item"><a href="">Change</a></li>
                            <li class="sidebar-dropdown-menu-item"><a href="">Verify</a></li>
                        </ul>
                    </li>
                    <li class="sidebar-dropdown-menu-item"><a href="">Pricing</a></li>
                    <li class="sidebar-dropdown-menu-item"><a href="">About Us</a></li>
                    <li class="sidebar-dropdown-menu-item"><a href="">Our</a></li>
                </ul>
            </li>
            <li class="sidebar-menu-item has-dropdown">
                <a href="#">
                    <font-awesome-icon :icon="faUserAlt" class="sidebar-menu-item-icon"/>
                    Authentication
                    <font-awesome-icon :icon="faCaretDown" class="sidebar-menu-item-accordion ms-auto"/>
                </a>
                <ul class="sidebar-dropdown-menu">
                    <li class="sidebar-dropdown-menu-item"><a href="">Login</a></li>
                    <li class="sidebar-dropdown-menu-item"><a href="">Registration</a></li>
                    <li class="sidebar-dropdown-menu-item"><a href="">Reset Password</a></li>
                    <li class="sidebar-dropdown-menu-item has-dropdown">
                        <a href="">
                            Blog
                            <font-awesome-icon :icon="faCaretDown" class="sidebar-menu-item-accordion ms-auto"/>
                        </a>
                        <ul class="sidebar-dropdown-menu">
                            <li class="sidebar-dropdown-menu-item"><a href="">Home</a></li>
                            <li class="sidebar-dropdown-menu-item"><a href="">Post</a></li>
                            <li class="sidebar-dropdown-menu-item"><a href="">Home</a></li>
                            <li class="sidebar-dropdown-menu-item"><a href="">Post</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
            <li class="sidebar-menu-divider mt-3 mb-1 text-uppercase">Apps</li>
            <li class="sidebar-menu-item">
                <a href="#">
                    <font-awesome-icon :icon="faDashboard" class="sidebar-menu-item-icon"/>
                    Settings
                </a>
            </li>
            <li class="sidebar-menu-item has-dropdown">
                <a href="#">
                    <font-awesome-icon :icon="faDashboard" class="sidebar-menu-item-icon"/>
                    Pages
                    <font-awesome-icon :icon="faCaretDown" class="sidebar-menu-item-accordion ms-auto"/>
                </a>
                <ul class="sidebar-dropdown-menu">
                    <li class="sidebar-dropdown-menu-item"><a href="">User Profile</a></li>
                    <li class="sidebar-dropdown-menu-item"><a href="">Blog</a></li>
                    <li class="sidebar-dropdown-menu-item"><a href="">Pricing</a></li>
                    <li class="sidebar-dropdown-menu-item"><a href="">About Us</a></li>
                    <li class="sidebar-dropdown-menu-item"><a href="">Our</a></li>
                </ul>
            </li>
        </ul>
    </div>
</template>

<script setup>
import { faCaretDown, faDashboard, faUserAlt } from '@fortawesome/free-solid-svg-icons'
import { faCircleLeft } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { onMounted } from "vue";

let slideUp = (target, duration = 200) => {
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.boxSizing = 'border-box';
    target.style.height = target.offsetHeight + 'px';
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;

    window.setTimeout(() => {
        target.style.display = 'none';
        target.style.removeProperty('height');
        target.style.removeProperty('padding-top');
        target.style.removeProperty('padding-bottom');
        target.style.removeProperty('margin-top');
        target.style.removeProperty('margin-bottom');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}
let slideDown = (target, duration = 200) => {
    target.style.removeProperty('display');

    let display = window.getComputedStyle(target).display;

    if (display === 'none') display = 'block';

    target.style.display = display;

    let height = target.offsetHeight;

    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = 'border-box';
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');

    window.setTimeout(() => {
        target.style.removeProperty('height');
        target.style.removeProperty('overflow');
        target.style.removeProperty('transition-duration');
        target.style.removeProperty('transition-property');
    }, duration);
}
let slideToggle = (target, duration = 200) => {
    return window.getComputedStyle(target).display === 'none'
        ? slideDown(target, duration)
        : slideUp(target, duration)
}

onMounted(() => {
    const sidebar = document.getElementsByClassName('sidebar').item(0),
        sidebarCollapsed = document.getElementsByClassName('sidebar collapsed')

    document.querySelectorAll('.sidebar-dropdown-menu').forEach(menu => slideUp(menu))

    document
        .querySelectorAll('.sidebar-menu-item.has-dropdown > a, .sidebar-dropdown-menu-item.has-dropdown > a').forEach(link => link.addEventListener('click', function (e) {
        e.preventDefault()

        slideToggle(this.nextElementSibling)

        this.parentElement.classList.toggle('focused')
    }))

    document.getElementsByClassName('sidebar-toggle').item(0)
        .addEventListener('click', () => {
            sidebar.classList.toggle('collapsed')

            if (sidebarCollapsed.length) {
                sidebarCollapsed.item(0).addEventListener('mouseleave', () => {
                    document.querySelectorAll('.sidebar-dropdown-menu').forEach(menu => slideUp(menu))

                    document
                        .querySelectorAll('.sidebar-menu-item.has-dropdown, .sidebar-dropdown-menu-item.has-dropdown')
                        .forEach(d => d.classList.remove('focused'))
                })
            }
        })
})
</script>

<style scoped>
.sidebar.collapsed:hover,
.sidebar {
    width: 16rem;
    overflow-y: auto;
    transition: width .2s;
}

.sidebar.collapsed {
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
    box-shadow: 0 .25rem .25rem rgba(0, 0, 0, .25);
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
}
</style>