<script lang="ts">
  import Template from '@lib/Template.svelte';
  import Range from '@lib/Range.svelte';
  import Progress from '@lib/Progress.svelte';
  import Info from '@lib/Info.svelte';
  import flywheelImg from './flywheel.svg';

  // Maxima
  const voltageMax = 10;
  const currentMax = 2;
  const resistanceMax = 10;
  const inductanceMax = 0.05;
  const sineWaveFrequencyMax = 100;
  const speedMax = 0.05;

  // Controlables
  let voltage = 0; // in Volts (V)
  let resistance = 5; // in Ohms (Ω)
  let inductance = 0.02; // in Henries (H)
  let sineWaveFrequency = 50; // in Hertz (Hz)
  let sineWaveAngularVelocity = 0;
  $: sineWaveAngularVelocity = 2 * Math.PI * sineWaveFrequency; // in rad/sec as ω=2πf
  let sineWavePhase = 0;
  let speed = 0.01;

  // Constants
  const angularVelocityCurrentRatio = 50; // truns per ampere
  const initialInductorCurrent = () => -(voltageMax / (inductance * sineWaveAngularVelocity)); // as -I₀=-E₀/Lω
  const integrateResistorCurrent = (delta: number) => voltage / resistance; // as V=iR
  const integrateInductorCurrent = (delta: number) => current + (delta * voltage) / inductance; // as V=-L(di/dt)
  const integrateResIndCurrent = (delta: number) => current + (delta * (voltage - current * resistance)) / inductance; // as V=-L(di/dt)+iR

  // Load Type emun
  const enum LoadType {
    Resistive,
    Inductive,
    InductiveCorrected,
    ResInd,
  }

  // Circuit Types
  const circuitTypeInfo: { text: string; integrator: (delta: number) => number }[] = [
    { text: 'Pure Resistor', integrator: integrateResistorCurrent },
    { text: 'Pure Inductor', integrator: integrateInductorCurrent },
    { text: 'Pure Inductor (initial current corrected)', integrator: integrateInductorCurrent },
    { text: 'RL Series Circuit', integrator: integrateResIndCurrent },
  ];

  // Internal variables
  let current: number = 0; // Curent integral in Ampere (A)
  let wheelR: number = 0; // Wheel angle in turns
  let loadtype: LoadType = LoadType.Resistive; // Type of load
  let generateSine: boolean = false; // weather to generate sine wave
  let generatorStartTS: number | null = null; // sine wave generator start timestap
  let previousTS: number = performance.now(); // previous timestamp
  let info: string = '';

  // integration function variable
  let integrateCurrent = integrateResistorCurrent;

  const onGenerateSineChange = (checked: boolean) => {
    generatorStartTS = null;
    current = 0;
    generateSine = !!checked;
    if (generateSine) {
      sineWavePhase = 0;
      if (loadtype === LoadType.InductiveCorrected) current = initialInductorCurrent();
    }
  };
  $: onGenerateSineChange(generateSine);
  const onLoadChange = (loadt: LoadType) => {
    if (generateSine) onGenerateSineChange(true);
    integrateCurrent = circuitTypeInfo[loadt].integrator;
  };
  $: onLoadChange(loadtype);

  const step: FrameRequestCallback = timeStamp => {
    const delta = ((timeStamp - previousTS) * speed) / 1000; // calculating delta and converting it to seconds
    if (timeStamp - previousTS > 500)
      info = "It looks like you have left this tab or your browser's preformance is slow and this simulation may be inaccurate!";
    if (!generatorStartTS) generatorStartTS = timeStamp;
    if (generateSine) voltage = voltageMax * Math.sin((sineWavePhase += sineWaveAngularVelocity * delta));

    current = integrateCurrent(delta);

    // changing wheel angle
    wheelR = (wheelR + angularVelocityCurrentRatio * current * delta) % 1;
    previousTS = timeStamp;
    window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
</script>

<Template>
  <Info bind:info slot="info" />
  <span slot="header">Visualising Current as angular velocity</span>
  <img slot="view" src={flywheelImg} style="transform:rotate({wheelR}turn)" alt="" />
  <span slot="controls">
    <Progress name="Current" unit="A" value={current} max={currentMax} min={-currentMax} />
    <Range name="Voltage" unit="V" bind:value={voltage} min={-voltageMax} max={voltageMax} />
    <div>
      <input type="checkbox" bind:checked={generateSine} on:change id="generateSine" /><label for="generateSine">Generate Sine Wave</label>
      {#if generateSine}
        <Range name="Frequency" unit="Hz" bind:value={sineWaveFrequency} min={1} max={sineWaveFrequencyMax} />
      {/if}
    </div>
    <h4>Select Circuit Type</h4>
    <div>
      {#each circuitTypeInfo as { text }, type}
        <input type="radio" name="circuitType" id={type + 'ltype'} bind:group={loadtype} value={type} /><label for={type + 'ltype'}>{text}</label>
        <br />
      {/each}
    </div>
    <h3>Controlables</h3>
    <Range name="Inductance" unit="H" bind:value={inductance} min={inductanceMax * 0.01} max={inductanceMax} milli precision={1} />
    <Range name="Resistance" unit="Ω" bind:value={resistance} min={resistanceMax * 0.01} max={resistanceMax} precision={1} />
    <Range name="Speed" unit="x" bind:value={speed} max={speedMax} precision={4} />
  </span>
</Template>

<style>
  img {
    width: 80%;
    max-width: 300px;
    filter: var(--image-filter);
  }
</style>
