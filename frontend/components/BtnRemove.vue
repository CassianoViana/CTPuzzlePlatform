<template>
  <el-button
    style="font-weight: bold"
    icon="el-icon-delete-solid"
    size="small"
    v-bind="$attrs"
    type="danger"
    @click="$emit('click')"
    ><slot>Remover</slot></el-button
  >
</template>
<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "nuxt-property-decorator";
@Component
export default class BtnRemove extends Vue {
  @Prop({ default: "Remover" }) title!: string;
}
</script>