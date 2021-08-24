<script lang="ts">
  export let value: number;
  export let min: number = 0;
  export let max: number;
  export let name: string;
  export let unit: string;
  export let step: number = max * 0.01;
  export let precision: number = 2;
  import { slide } from 'svelte/transition';
  export let milli: boolean = false;
  export let kilo: boolean = false;
  let factor = (milli ? 1000 : 1) * (kilo ? 0.001 : 1);
</script>

<div transition:slide>
  <label for={name}>{name} : {(value * factor).toFixed(precision)}{milli ? 'm' : ''}{kilo ? 'k' : ''}{unit}</label><br />
  <input id={name} type="range" bind:value {min} {max} {step} />
</div>

<style>
  input[type='range'] {
    width: 90%;
    max-width: 300px;
    margin-bottom: 20px;
  }
</style>
