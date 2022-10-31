<script setup lang="ts"></script>

<template>
    <main id="top" class="main">
        <div class="container" data-layout="container">
            <router-view/>
        </div>
    </main>
</template>

<style>
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

.progress-step.active {
    background-color: #070068;
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
    border-radius: 0;
}

section h2 {
    font-size: 1.6rem;
    color: #070068;
    margin: 0;
    padding: .75rem;
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