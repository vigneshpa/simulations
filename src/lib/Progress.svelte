<script lang="ts">
  export let value: number;
  export let min: number = 0;
  export let max: number;
  export let name: string;
  export let unit: string;
  export let precision: number = 2;
</script>

<div>
  <label for={name}>{name} : {value.toFixed(precision)}{unit}</label><br />
  <progress id={name} type="range" max={max - min} value={value - min} />
</div>

<style>
  progress {
    width: 90%;
    max-width: 300px;
    margin-bottom: 20px;
  }
</style>
