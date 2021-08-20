<script lang="ts">
  export let value: number;
  export let min: number = 0;
  export let max: number;
  export let name: string;
  export let unit: string;
</script>

<template>
  <div>
    <label for={name}>{name} : {value.toFixed(2)}{unit}</label><br />
    <progress id={name} type="range" max={max - min} value={value - min} />
  </div>
</template>

<style>
  progress {
    width: 90%;
    max-width: 300px;
    margin-bottom: 20px;
  }
  label {
    padding: 5px 3px;
    display: inline-block;
    min-width: 100px;
    text-align: center;
  }
</style>
