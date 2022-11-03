<script setup lang="ts"></script>

<template>
    <div class="row no-gutters vh-100">
        <router-view/>
        <div class="d-none d-md-flex h-100 justify-content-center align-items-center col-sm-6 bg-auth">
            <a class="d-flex flex-column align-items-center text-decoration-none" href="/">
                <img class="me-2" src="/sidooh.png" alt="" width="500">
                <span class="service-name">Enterprise</span>
            </a>
        </div>
    </div>
</template>

<style>
.step-header {
    display: flex;
    align-items: center;
}

.step-header .step {
    width: 2rem;
    height: 1rem;
    background-color: #0F1B4C;
    margin: 1rem .3rem 0;
    border-radius: 1rem;
}

.step-header .step.active {
    width: 4rem;
}

.step-header .step.active ~ .step {
    color: #777;
    background-color: #ddd;
}

.step-header .step .exclaim {
    position: absolute;
    top: -.4rem;
    right: -.4rem;
}

.bg-auth {
    /*background-color: #0F1B4C;*/
    background-color: gold;
}

.service-name {
    font-family: 'Pacifico', cursive;
    font-size: 30pt;
    color: #fff;
}

article {
    margin: 10px;
    width: calc(100% - 20px);
    max-width: 720px;
    min-height: 480px;
    perspective: 1000px;
}

article header {
    display: flex;
    justify-content: center;
    align-items: center;
}

.progress-step {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    margin: 20px 75px 30px;
    color: #fff;
    background-color: #070068;
    font-weight: bold;
}

.progress-step .exclaim {
    position: absolute;
    top: -.3rem;
    right: -.3rem;
}

.progress-step span {
    font-size: 10pt;
}

.progress-step .title {
    color: #070068;
    font-weight: bold;
}

.progress-step.active ~ .progress-step .title {
    color: #777;
    font-weight: normal;
}

.progress-step .title {
    bottom: -1.3rem;
    font-size: 10pt;
    white-space: nowrap;
}

.progress-step.active ~ .progress-step {
    color: #777;
    background-color: #ccc;
}

.progress-step.active ~ .progress-step::before {
    background-color: #ccc;
}

.progress-step:before {
    content: '';
    position: absolute;
    left: -150px;
    width: 150px;
    height: 2px;
    background-color: #070068;
    z-index: 10;
}

.progress-step:first-child::before {
    display: none;
}

section {
    width: 100%;
    border-radius: 0 !important;
}

section h2 {
    font-size: 1.6rem;
    color: #070068;
    margin: 0;
}

.animate-in {
    transform-origin: top;
    animation: in .6s ease-in-out;
}

.animate-out {
    transform-origin: top left;
    animation: out .6s ease-in-out;
}

.animate-invalid {
    /*transform-origin: bottom left;*/
    animation: invalid .4s ease-in-out;
}

@keyframes in {
    0% {
        opacity: 0;
        transform: rotateX(-90deg);
    }
    100% {
        opacity: 1;
        transform: rotateX(0deg);
    }
}

@keyframes out {
    0% {
        transform: translateY(0px) rotate(0deg);
    }
    60% {
        transform: rotate(10deg);
    }
    100% {
        transform: translateY(1000px);
    }
}

@keyframes invalid {
    0% {
        transform: translateX(0);
    }
    20% {
        transform: translateX(40px);
    }
    40% {
        transform: translateX(20px);
    }
    60% {
        transform: translateX(40px);
    }
    80% {
        transform: translateX(20px);
    }
    100% {
        transform: translateX(0);
    }
}
</style>