<template>
  <div class="divider"><slot/></div>
</template>

<style lang="scss" scoped>
.divider {
  margin: auto;
  margin-bottom: 25px;
  width: 550px;
  border-bottom: 1.5px solid rgb(88, 88, 88);
  border-bottom-left-radius: 13px;
  border-bottom-right-radius: 13px;
  // border-top: 1.5px solid rgb(97, 79, 79);
  // border-top-left-radius: 13px;
  // border-top-right-radius: 13px;
  @media screen and (max-width: 600px) {
    width: 250px;
    border-top: none;
  }
}
</style>