<script lang="ts">
  import { slide } from 'svelte/transition';
  export let info: string;
</script>

{#if info}
  <div transition:slide class="holder">
    <div class="content">{info}</div>
    <button class="close" on:click={() => (info = '')}>Close</button>
  </div>
{/if}

<style>
  .holder {
    margin-left: auto;
    margin-right: auto;
    border-radius: 5px;
    box-shadow: var(--shadow);
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
    max-width: 800px;
  }
  .content {
    margin: 10px;
  }
  .close {
    margin: 10px;
  }
  button {
    padding: 0.3em;
  }
</style>
