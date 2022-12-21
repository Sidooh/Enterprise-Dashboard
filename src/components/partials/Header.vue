<template>
    <nav class="navbar navbar-light bg-white navbar-top navbar-expand pe-3">
        <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button"
                data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse"
                aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span
            class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
        <a class="navbar-brand me-1 me-sm-3" href="../../index.html">
            <div class="d-flex align-items-center">
                <img class="me-2" src="/sidooh.png" alt="" width="75">
            </div>
        </a>
        <ul class="navbar-nav align-items-center d-none d-lg-block">
            <li class="nav-item">
                <b>{{ store.user?.enterprise?.name }}</b>
<!--                <div class="search-box">
                    <form class="position-relative" data-bs-toggle="search" data-bs-display="static"
                          aria-expanded="false">
                        <input class="form-control search-input fuzzy-search" type="search" placeholder="Search..."
                               aria-label="Search">
                        <svg class="svg-inline&#45;&#45;fa fa-search fa-w-16 search-box-icon" aria-hidden="true"
                             focusable="false" data-prefix="fas" data-icon="search" role="img"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                            <path fill="currentColor"
                                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                        </svg>&lt;!&ndash; <span class="fas fa-search search-box-icon"></span> Font Awesome fontawesome.com &ndash;&gt;
                    </form>
                    <div class="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none"
                         data-bs-dismiss="search">
                        <button class="btn btn-link btn-close-falcon p-0" aria-label="Close"></button>
                    </div>
                </div>-->
            </li>
        </ul>
        <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
            <li class="nav-item dropdown">
                <a class="nav-link notification-indicator notification-indicator-primary px-0 fa-icon-wait"
                   id="navbarDropdownNotification" role="button" data-bs-toggle="dropdown" aria-haspopup="true"
                   aria-expanded="false" data-hide-on-body-scroll="data-hide-on-body-scroll">
                    <svg class="svg-inline--fa fa-bell fa-w-14" data-fa-transform="shrink-6"
                         style="font-size: 33px;transform-origin: 0.4375em 0.5em;" aria-hidden="true" focusable="false"
                         data-prefix="fas" data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 448 512" data-fa-i2svg="">
                        <g transform="translate(224 256)">
                            <g transform="translate(0, 0)  scale(0.625, 0.625)  rotate(0 0 0)">
                                <path fill="currentColor"
                                      d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"
                                      transform="translate(-224 -256)"></path>
                            </g>
                        </g>
                    </svg>
                    <!-- <span class="fas fa-bell" data-fa-transform="shrink-6" style="font-size: 33px;"></span> Font Awesome fontawesome.com -->
                </a>
                <div
                    class="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end dropdown-menu-card dropdown-menu-notification dropdown-caret-bg"
                    aria-labelledby="navbarDropdownNotification">
                    <div class="card card-notification shadow-none">
                        <div class="card-header">
                            <div class="row justify-content-between align-items-center">
                                <div class="col-auto">
                                    <h6 class="card-header-title mb-0">Notifications</h6>
                                </div>
                                <div class="col-auto ps-0 ps-sm-3"><a class="card-link fw-normal" href="#">Mark all as
                                    read</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link pe-0 ps-2" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown"
                   aria-expanded="false">
                    <div class="avatar avatar-xl">
                        <img class="rounded-circle" src="/images/2-thumb.png" alt="">
                    </div>
                </a>
                <div class="dropdown-menu dropdown-menu-end py-0">
                    <div class="bg-white rounded-2 py-2">
                        <a class="dropdown-item" href="#">Profile &amp; account</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Settings</a>
                        <a class="dropdown-item cursor-pointer" @click="logout">Sign Out</a>
                    </div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore()

const logout = () => store.logout()
</script>

<style scoped>
.navbar-brand {
    display: none;
    opacity: 0;
}

.sidebar-collapsed .navbar-brand {
    display: block;
    opacity: 1;
}

.search-box {
    position: relative;
    width: 21rem;
    font-size: .8rem;
}

.search-box .search-input {
    padding-left: 3rem;
    padding-right: 2rem;
    border: 0;
    background-color: var(--bs-gray-100);
    line-height: 1.7;
    -webkit-box-shadow: none;
    box-shadow: none;
}

.search-box .search-input::placeholder {
    color: var(--bs-gray-400);
    font-size: 10pt;
}

.search-box .search-box-icon {
    position: absolute;
    color: var(--bs-gray-400);
    top: 50%;
    left: .9rem;
    -webkit-transform: translateY(-48%);
    -ms-transform: translateY(-48%);
    transform: translateY(-48%);
}
</style>