<template>
    <nav class="sidebar sidebar-expand-xl position-fixed">
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
            <div class="sidebar-content">
                <ul class="sidebar-nav mb-3 flex-column">
                    <li class="nav-item">
                        <a class="nav-link dropdown-indicator collapsed" href="#dashboard"
                           role="button" data-bs-toggle="collapse" aria-expanded="false"
                           aria-controls="dashboard">
                            <div class="d-flex align-items-center">
                            <span class="nav-link-icon">
                                <svg
                                    class="svg-inline--fa fa-chart-pie fa-w-17" aria-hidden="true" focusable="false"
                                    data-prefix="fas" data-icon="chart-pie" role="img"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 544 512" data-fa-i2svg="">
                                    <path fill="currentColor"
                                          d="M527.79 288H290.5l158.03 158.03c6.04 6.04 15.98 6.53 22.19.68 38.7-36.46 65.32-85.61 73.13-140.86 1.34-9.46-6.51-17.85-16.06-17.85zm-15.83-64.8C503.72 103.74 408.26 8.28 288.8.04 279.68-.59 272 7.1 272 16.24V240h223.77c9.14 0 16.82-7.68 16.19-16.8zM224 288V50.71c0-9.55-8.39-17.4-17.84-16.06C86.99 51.49-4.1 155.6.14 280.37 4.5 408.51 114.83 513.59 243.03 511.98c50.4-.63 96.97-16.87 135.26-44.03 7.9-5.6 8.42-17.23 1.57-24.08L224 288z"></path></svg>
                            </span><span
                                class="nav-link-text ps-1">Dashboard</span></div>
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
                        <div class="row navbar-vertical-label-wrapper mt-3 mb-2">
                            <div class="col-auto navbar-vertical-label">App</div>
                            <div class="col ps-0">
                                <hr class="mb-0 navbar-vertical-divider">
                            </div>
                        </div>
                        <a class="nav-link" href="../../../app/calendar.html" role="button">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><svg
                                class="svg-inline--fa fa-calendar-alt fa-w-14" aria-hidden="true" focusable="false"
                                data-prefix="fas" data-icon="calendar-alt" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor"
                                                                             d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>
                                <!-- <span class="fas fa-calendar-alt"></span> Font Awesome fontawesome.com --></span><span
                                class="nav-link-text ps-1">Calendar</span></div>
                        </a>
                        <a class="nav-link" href="../../../app/chat.html" role="button">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><svg
                                class="svg-inline--fa fa-comments fa-w-18" aria-hidden="true" focusable="false"
                                data-prefix="fas" data-icon="comments" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512" data-fa-i2svg=""><path fill="currentColor"
                                                                             d="M416 192c0-88.4-93.1-160-208-160S0 103.6 0 192c0 34.3 14.1 65.9 38 92-13.4 30.2-35.5 54.2-35.8 54.5-2.2 2.3-2.8 5.7-1.5 8.7S4.8 352 8 352c36.6 0 66.9-12.3 88.7-25 32.2 15.7 70.3 25 111.3 25 114.9 0 208-71.6 208-160zm122 220c23.9-26 38-57.7 38-92 0-66.9-53.5-124.2-129.3-148.1.9 6.6 1.3 13.3 1.3 20.1 0 105.9-107.7 192-240 192-10.8 0-21.3-.8-31.7-1.9C207.8 439.6 281.8 480 368 480c41 0 79.1-9.2 111.3-25 21.8 12.7 52.1 25 88.7 25 3.2 0 6.1-1.9 7.3-4.8 1.3-2.9.7-6.3-1.5-8.7-.3-.3-22.4-24.2-35.8-54.5z"></path></svg>
                                <!-- <span class="fas fa-comments"></span> Font Awesome fontawesome.com --></span><span
                                class="nav-link-text ps-1">Chat</span></div>
                        </a>
                        <a class="nav-link dropdown-indicator collapsed" href="#email" role="button"
                           data-bs-toggle="collapse" aria-expanded="false" aria-controls="email">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><svg
                                class="svg-inline--fa fa-envelope-open fa-w-16" aria-hidden="true" focusable="false"
                                data-prefix="fas" data-icon="envelope-open" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path
                                fill="currentColor"
                                d="M512 464c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V200.724a48 48 0 0 1 18.387-37.776c24.913-19.529 45.501-35.365 164.2-121.511C199.412 29.17 232.797-.347 256 .003c23.198-.354 56.596 29.172 73.413 41.433 118.687 86.137 139.303 101.995 164.2 121.512A48 48 0 0 1 512 200.724V464zm-65.666-196.605c-2.563-3.728-7.7-4.595-11.339-1.907-22.845 16.873-55.462 40.705-105.582 77.079-16.825 12.266-50.21 41.781-73.413 41.43-23.211.344-56.559-29.143-73.413-41.43-50.114-36.37-82.734-60.204-105.582-77.079-3.639-2.688-8.776-1.821-11.339 1.907l-9.072 13.196a7.998 7.998 0 0 0 1.839 10.967c22.887 16.899 55.454 40.69 105.303 76.868 20.274 14.781 56.524 47.813 92.264 47.573 35.724.242 71.961-32.771 92.263-47.573 49.85-36.179 82.418-59.97 105.303-76.868a7.998 7.998 0 0 0 1.839-10.967l-9.071-13.196z"></path></svg>
                                <!-- <span class="fas fa-envelope-open"></span> Font Awesome fontawesome.com --></span><span
                                class="nav-link-text ps-1">Email</span></div>
                        </a>
                        <ul class="nav collapse" id="email" style="">
                            <li class="nav-item"><a class="nav-link" href="../../../app/email/inbox.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Inbox</span>
                                </div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/email/email-detail.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Email detail</span></div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/email/compose.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Compose</span>
                                </div>
                            </a><!-- more inner pages-->
                            </li>
                        </ul>
                        <a class="nav-link dropdown-indicator" href="#events" role="button" data-bs-toggle="collapse"
                           aria-expanded="false" aria-controls="events">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><svg
                                class="svg-inline--fa fa-calendar-day fa-w-14" aria-hidden="true" focusable="false"
                                data-prefix="fas" data-icon="calendar-day" role="img" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor"
                                                                             d="M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm64-192c0-8.8 7.2-16 16-16h96c8.8 0 16 7.2 16 16v96c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16v-96zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"></path></svg>
                                <!-- <span class="fas fa-calendar-day"></span> Font Awesome fontawesome.com --></span><span
                                class="nav-link-text ps-1">Events</span></div>
                        </a>
                        <ul class="nav collapse" id="events">
                            <li class="nav-item"><a class="nav-link" href="../../../app/events/create-an-event.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Create an event</span></div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/events/event-detail.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Event detail</span></div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/events/event-list.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Event list</span></div>
                            </a><!-- more inner pages-->
                            </li>
                        </ul>
                        <a class="nav-link dropdown-indicator" href="#e-commerce" role="button"
                           data-bs-toggle="collapse" aria-expanded="false" aria-controls="e-commerce">
                            <div class="d-flex align-items-center"><span class="nav-link-icon"><svg
                                class="svg-inline--fa fa-shopping-cart fa-w-18" aria-hidden="true" focusable="false"
                                data-prefix="fas" data-icon="shopping-cart" role="img"
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" data-fa-i2svg=""><path
                                fill="currentColor"
                                d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>
                                <!-- <span class="fas fa-shopping-cart"></span> Font Awesome fontawesome.com --></span><span
                                class="nav-link-text ps-1">E commerce</span></div>
                        </a>
                        <ul class="nav collapse" id="e-commerce">
                            <li class="nav-item"><a class="nav-link dropdown-indicator" href="#product"
                                                    data-bs-toggle="collapse" aria-expanded="false"
                                                    aria-controls="e-commerce">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Product</span>
                                </div>
                            </a><!-- more inner pages-->
                                <ul class="nav collapse" id="product">
                                    <li class="nav-item"><a class="nav-link"
                                                            href="../../../app/e-commerce/product/product-list.html">
                                        <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Product list</span>
                                        </div>
                                    </a><!-- more inner pages-->
                                    </li>
                                    <li class="nav-item"><a class="nav-link"
                                                            href="../../../app/e-commerce/product/product-grid.html">
                                        <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Product grid</span>
                                        </div>
                                    </a><!-- more inner pages-->
                                    </li>
                                    <li class="nav-item"><a class="nav-link"
                                                            href="../../../app/e-commerce/product/product-details.html">
                                        <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Product details</span>
                                        </div>
                                    </a><!-- more inner pages-->
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link dropdown-indicator" href="#orders"
                                                    data-bs-toggle="collapse" aria-expanded="false"
                                                    aria-controls="e-commerce">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Orders</span>
                                </div>
                            </a><!-- more inner pages-->
                                <ul class="nav collapse" id="orders">
                                    <li class="nav-item"><a class="nav-link"
                                                            href="../../../app/e-commerce/orders/order-list.html">
                                        <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Order list</span>
                                        </div>
                                    </a><!-- more inner pages-->
                                    </li>
                                    <li class="nav-item"><a class="nav-link"
                                                            href="../../../app/e-commerce/orders/order-details.html">
                                        <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Order details</span>
                                        </div>
                                    </a><!-- more inner pages-->
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/e-commerce/customers.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Customers</span>
                                </div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link"
                                                    href="../../../app/e-commerce/customer-details.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Customer details</span></div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/e-commerce/shopping-cart.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Shopping cart</span></div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/e-commerce/checkout.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Checkout</span>
                                </div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/e-commerce/billing.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Billing</span>
                                </div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/e-commerce/invoice.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Invoice</span>
                                </div>
                            </a><!-- more inner pages-->
                            </li>
                        </ul>
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
                            </a><!-- more inner pages-->
                                <ul class="nav collapse" id="course">
                                    <li class="nav-item"><a class="nav-link"
                                                            href="../../../app/e-learning/course/course-list.html">
                                        <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Course list</span>
                                        </div>
                                    </a><!-- more inner pages-->
                                    </li>
                                    <li class="nav-item"><a class="nav-link"
                                                            href="../../../app/e-learning/course/course-grid.html">
                                        <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Course grid</span>
                                        </div>
                                    </a><!-- more inner pages-->
                                    </li>
                                    <li class="nav-item"><a class="nav-link"
                                                            href="../../../app/e-learning/course/course-details.html">
                                        <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Course details</span>
                                        </div>
                                    </a><!-- more inner pages-->
                                    </li>
                                    <li class="nav-item"><a class="nav-link"
                                                            href="../../../app/e-learning/course/create-a-course.html">
                                        <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Create a course</span>
                                        </div>
                                    </a><!-- more inner pages-->
                                    </li>
                                </ul>
                            </li>
                            <li class="nav-item"><a class="nav-link"
                                                    href="../../../app/e-learning/student-overview.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Student overview</span></div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link"
                                                    href="../../../app/e-learning/trainer-profile.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Trainer profile</span></div>
                            </a><!-- more inner pages-->
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
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/social/activity-log.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Activity log</span></div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/social/notifications.html">
                                <div class="d-flex align-items-center"><span
                                    class="nav-link-text ps-1">Notifications</span></div>
                            </a><!-- more inner pages-->
                            </li>
                            <li class="nav-item"><a class="nav-link" href="../../../app/social/followers.html">
                                <div class="d-flex align-items-center"><span class="nav-link-text ps-1">Followers</span>
                                </div>
                            </a><!-- more inner pages-->
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
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
    padding: 0;
    display: inline-block;
    width: 100%;
    overflow-y: auto;
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
    color: var(--bs-gray-700);
}

.sidebar .sidebar-nav .nav-link {
    word-break: break-word;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
}

.sidebar .dropdown-indicator {
    padding-right: 1rem !important;
}

.sidebar .nav-link {
    outline: none;
}

.dropdown-indicator {
    position: relative;
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

@media (min-width: 1200px) {
    .sidebar.sidebar-expand-xl {
        max-width: 12.625rem;
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

    .sidebar.sidebar-expand-xl .nav-link {
        padding: .35rem 0;
    }

    .sidebar-expand-xl .sidebar-nav .nav-link {
        padding-right: .5rem;
        padding-left: .5rem;
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