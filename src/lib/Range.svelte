<script lang="ts">
  export let value: number;
  export let min: number = 0;
  export let max: number;
  export let name: string;
  export let unit: string;
  export let step: number = max * 0.01;
  import { slide } from 'svelte/transition';
</script>

<template>
  <div transition:slide>
    <label for={name}>{name} : {value.toFixed(2)}{unit}</label><br />
    <input id={name} type="range" bind:value {min} {max} {step} />
  </div>
</template>

<style>
  input[type='range'] {
    width: 90%;
    max-width: 300px;
    margin-bottom: 20px;
  }
</style>
