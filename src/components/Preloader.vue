<template>
    <transition name="fade">
        <div class="preloader flex flex-col text-white justify-center items-center">
            <img alt="Vitess Logo" class="w-32" src="../assets/logo.svg" />
            <div class="ml-2 lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div></div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Preloader'
}
</script>

<style lang="scss" scoped>
.preloader {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 10;
    transition: all 0.8s;
    @apply bg-gray-100;
}

.lds-ellipsis {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
}

.lds-ellipsis div {
    position: absolute;
    top: 33px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $ma-primary;
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
    left: 8px;
    animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
    left: 8px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
    left: 32px;
    animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
    left: 56px;
    animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
    0% {
        transform: scale(0);
    }
    100% {
        transform: scale(1);
    }
}

@keyframes lds-ellipsis3 {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(0);
    }
}

@keyframes lds-ellipsis2 {
    0% {
        transform: translate(0, 0);
    }
    100% {
        transform: translate(24px, 0);
    }
}
</style>
