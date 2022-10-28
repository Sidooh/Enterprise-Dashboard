<template>
    <nav class="navbar navbar-light bg-white navbar-top navbar-expand pe-3">
        <button class="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3" type="button" data-bs-toggle="collapse" data-bs-target="#navbarVerticalCollapse" aria-controls="navbarVerticalCollapse" aria-expanded="false" aria-label="Toggle Navigation"><span class="navbar-toggle-icon"><span class="toggle-line"></span></span></button>
        <a class="navbar-brand me-1 me-sm-3" href="../../index.html">
            <div class="d-flex align-items-center">
                <img class="me-2" src="../../assets/img/icons/spot-illustrations/falcon.png" alt="" width="40">
            </div>
        </a>
        <ul class="navbar-nav align-items-center d-none d-lg-block">
            <li class="nav-item">
                <div class="search-box" data-list="{&quot;valueNames&quot;:[&quot;title&quot;]}">
                    <form class="position-relative" data-bs-toggle="search" data-bs-display="static" aria-expanded="false">
                        <input class="form-control search-input fuzzy-search" type="search" placeholder="Search..." aria-label="Search">
                        <svg class="svg-inline--fa fa-search fa-w-16 search-box-icon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path></svg><!-- <span class="fas fa-search search-box-icon"></span> Font Awesome fontawesome.com -->
                    </form>
                    <div class="btn-close-falcon-container position-absolute end-0 top-50 translate-middle shadow-none" data-bs-dismiss="search"><button class="btn btn-link btn-close-falcon p-0" aria-label="Close"></button></div>
                </div>
            </li>
        </ul>
        <ul class="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
            <li class="nav-item dropdown">
                <a class="nav-link notification-indicator notification-indicator-primary px-0 fa-icon-wait" id="navbarDropdownNotification" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" data-hide-on-body-scroll="data-hide-on-body-scroll"><svg class="svg-inline--fa fa-bell fa-w-14" data-fa-transform="shrink-6" style="font-size: 33px;transform-origin: 0.4375em 0.5em;" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><g transform="translate(224 256)"><g transform="translate(0, 0)  scale(0.625, 0.625)  rotate(0 0 0)"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z" transform="translate(-224 -256)"></path></g></g></svg><!-- <span class="fas fa-bell" data-fa-transform="shrink-6" style="font-size: 33px;"></span> Font Awesome fontawesome.com --></a>
                <div class="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end dropdown-menu-card dropdown-menu-notification dropdown-caret-bg" aria-labelledby="navbarDropdownNotification">
                    <div class="card card-notification shadow-none">
                        <div class="card-header">
                            <div class="row justify-content-between align-items-center">
                                <div class="col-auto">
                                    <h6 class="card-header-title mb-0">Notifications</h6>
                                </div>
                                <div class="col-auto ps-0 ps-sm-3"><a class="card-link fw-normal" href="#">Mark all as read</a></div>
                            </div>
                        </div>
                        <div class="scrollbar-overlay" style="max-height:19rem" data-simplebar="init"><div class="simplebar-wrapper" style="margin: 0px;"><div class="simplebar-height-auto-observer-wrapper"><div class="simplebar-height-auto-observer"></div></div><div class="simplebar-mask"><div class="simplebar-offset" style="right: 0px; bottom: 0px;"><div class="simplebar-content-wrapper" tabindex="0" role="region" aria-label="scrollable content" style="height: auto; overflow: hidden;"><div class="simplebar-content" style="padding: 0px;">
                            <div class="list-group list-group-flush fw-normal fs--1">
                                <div class="list-group-title border-bottom">NEW</div>
                                <div class="list-group-item">
                                    <a class="notification notification-flush notification-unread" href="#!">
                                        <div class="notification-avatar">
                                            <div class="avatar avatar-2xl me-3">
                                                <img class="rounded-circle" src="../../assets/img/team/1-thumb.png" alt="">
                                            </div>
                                        </div>
                                        <div class="notification-body">
                                            <p class="mb-1"><strong>Emma Watson</strong> replied to your comment : "Hello world 😍"</p>
                                            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">💬</span>Just now</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="list-group-item">
                                    <a class="notification notification-flush notification-unread" href="#!">
                                        <div class="notification-avatar">
                                            <div class="avatar avatar-2xl me-3">
                                                <div class="avatar-name rounded-circle"><span>AB</span></div>
                                            </div>
                                        </div>
                                        <div class="notification-body">
                                            <p class="mb-1"><strong>Albert Brooks</strong> reacted to <strong>Mia Khalifa's</strong> status</p>
                                            <span class="notification-time"><svg class="svg-inline--fa fa-gratipay fa-w-16 me-2 text-danger" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="gratipay" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512" data-fa-i2svg=""><path fill="currentColor" d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm114.6 226.4l-113 152.7-112.7-152.7c-8.7-11.9-19.1-50.4 13.6-72 28.1-18.1 54.6-4.2 68.5 11.9 15.9 17.9 46.6 16.9 61.7 0 13.9-16.1 40.4-30 68.1-11.9 32.9 21.6 22.6 60 13.8 72z"></path></svg><!-- <span class="me-2 fab fa-gratipay text-danger"></span> Font Awesome fontawesome.com -->9hr</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="list-group-title border-bottom">EARLIER</div>
                                <div class="list-group-item">
                                    <a class="notification notification-flush" href="#!">
                                        <div class="notification-avatar">
                                            <div class="avatar avatar-2xl me-3">
                                                <img class="rounded-circle" src="../../assets/img/icons/weather-sm.jpg" alt="">
                                            </div>
                                        </div>
                                        <div class="notification-body">
                                            <p class="mb-1">The forecast today shows a low of 20℃ in California. See today's weather.</p>
                                            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">🌤️</span>1d</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="list-group-item">
                                    <a class="border-bottom-0 notification-unread  notification notification-flush" href="#!">
                                        <div class="notification-avatar">
                                            <div class="avatar avatar-xl me-3">
                                                <img class="rounded-circle" src="../../assets/img/logos/oxford.png" alt="">
                                            </div>
                                        </div>
                                        <div class="notification-body">
                                            <p class="mb-1"><strong>University of Oxford</strong> created an event : "Causal Inference Hilary 2019"</p>
                                            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">✌️</span>1w</span>
                                        </div>
                                    </a>
                                </div>
                                <div class="list-group-item">
                                    <a class="border-bottom-0 notification notification-flush" href="#!">
                                        <div class="notification-avatar">
                                            <div class="avatar avatar-xl me-3">
                                                <img class="rounded-circle" src="../../assets/img/team/10.jpg" alt="">
                                            </div>
                                        </div>
                                        <div class="notification-body">
                                            <p class="mb-1"><strong>James Cameron</strong> invited to join the group: United Nations International Children's Fund</p>
                                            <span class="notification-time"><span class="me-2" role="img" aria-label="Emoji">🙋‍</span>2d</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div></div></div></div><div class="simplebar-placeholder" style="width: 0px; height: 0px;"></div></div><div class="simplebar-track simplebar-horizontal" style="visibility: hidden;"><div class="simplebar-scrollbar" style="width: 0px; display: none;"></div></div><div class="simplebar-track simplebar-vertical" style="visibility: hidden;"><div class="simplebar-scrollbar" style="height: 0px; display: none;"></div></div></div>
                        <div class="card-footer text-center border-top"><a class="card-link d-block" href="../../app/social/notifications.html">View all</a></div>
                    </div>
                </div>
            </li>
            <li class="nav-item dropdown">
                <a class="nav-link pe-0 ps-2" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <div class="avatar avatar-xl">
                    <img class="rounded-circle" src="/images/2-thumb.png" alt="">
                </div>
            </a>
                <div class="dropdown-menu dropdown-caret dropdown-caret dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
                    <div class="bg-white dark__bg-1000 rounded-2 py-2">
                        <a class="dropdown-item fw-bold text-warning" href="#!"><svg class="svg-inline--fa fa-crown fa-w-20 me-1" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="crown" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg=""><path fill="currentColor" d="M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"></path></svg><!-- <span class="fas fa-crown me-1"></span> Font Awesome fontawesome.com --><span>Go Pro</span></a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#!">Set status</a>
                        <a class="dropdown-item" href="../../pages/user/profile.html">Profile &amp; account</a>
                        <a class="dropdown-item" href="#!">Feedback</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="../../pages/user/settings.html">Settings</a>
                        <a class="dropdown-item" href="../../pages/authentication/card/logout.html">Logout</a>
                    </div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script setup>

</script>

<style scoped>
.search-box {
    position: relative;
    width: 21rem;
    font-size: .8333333333rem;
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