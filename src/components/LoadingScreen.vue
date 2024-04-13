<template>
  <div class="loading">
    <div class="obj"></div>
    <div class="obj"></div>
    <div class="obj"></div>
    <div class="obj"></div>
    <div class="obj"></div>
    <div class="obj"></div>
    <div class="obj"></div>
    <div class="obj"></div>
  </div>
</template>

<style scoped>
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 40px;
  display: flex;
  align-items: center
}

.obj {
  width: 4px;
  height: 48px;
  background: #fff;
  margin: 0 9px;
  border-radius: 16px;
  animation: loading .8s infinite;
}

.obj:nth-child(2) {
  animation-delay: .1s;
}

.obj:nth-child(3) {
  animation-delay: .2s;
}

.obj:nth-child(4) {
  animation-delay: .3s;
}

.obj:nth-child(5) {
  animation-delay: .4s;
}

.obj:nth-child(6) {
  animation-delay: .5s;
}

.obj:nth-child(7) {
  animation-delay: .6s;
}

.obj:nth-child(8) {
  animation-delay: .7s;
}

@keyframes loading {
  0% {
    height: 0;
  }

  50% {
    height: 48px;
  }

  100% {
    height: 0;
  }
}
</style>