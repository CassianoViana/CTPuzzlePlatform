<template>
  <i @click="$emit('click')" :style="{'max-width':maxWidth}" 
     v-if="visible" 
    class="material-icons-outlined">{{name}}</i>
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "nuxt-property-decorator";
@Component
//https://material.io/resources/icons/?icon=home&style=baseline
export default class Icon extends Vue {
  @Prop() name!: string;
  @Prop({default:'50px'}) maxWidth!: string;
  visible = false;

  mounted() {
    this.$nextTick(() => {
      this.visible = true;
    });
  }
}
</script>
<style lang="scss">
/* fallback */
@font-face {
  font-family: "Material Icons";
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2) format("woff2");
}
/* fallback */
@font-face {
  font-family: "Material Icons Outlined";
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUce.woff2)
    format("woff2");
}
/* fallback */
@font-face {
  font-family: "Material Icons Round";
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmP.woff2) format("woff2");
}
/* fallback */
@font-face {
  font-family: "Material Icons Sharp";
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/oPWQ_lt5nv4pWNJpghLP75WiFR4kLh3kvmvR.woff2) format("woff2");
}
/* fallback */
@font-face {
  font-family: "Material Icons Two Tone";
  font-style: normal;
  font-weight: 400;
  src: url(/fonts/hESh6WRmNCxEqUmNyh3JDeGxjVVyMg4tHGctNCu0.woff2)
    format("woff2");
}

.material-icons {
  font-family: "Material Icons";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}

.material-icons-outlined {
  font-family: "Material Icons Outlined";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}

.material-icons-round {
  font-family: "Material Icons Round";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}

.material-icons-sharp {
  font-family: "Material Icons Sharp";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}

.material-icons-two-tone {
  font-family: "Material Icons Two Tone";
  font-weight: normal;
  font-style: normal;
  font-size: 24px;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: "liga";
  -webkit-font-smoothing: antialiased;
}
</style>