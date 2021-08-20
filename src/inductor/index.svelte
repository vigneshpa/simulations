<script lang="ts">
  import Template from '../Template.svelte';
  import Range from '../Range.svelte';
  import Progress from '../Progress.svelte';
  import Info from '../Info.svelte';
  const flywheelImg: string = require('./flywheel.svg');

  // Maxima
  const voltageMax = 10;
  const currentMax = 2;
  const resistanceMax = 10;
  const inductanceMax = 10;

  // Controlables
  let voltage = 0; // in Volts (V)
  let resistance = 5; // in Ohms (Ω)
  let inductance = 5; // in Henries (H)

  // Constants
  const sineWaveFrequency = 0.2; // in Hertz (Hz)
  const sineWaveAngularVelocity = 2 * Math.PI * sineWaveFrequency; // in rad/sec as ω=2πf
  const angularVelocityCurrentRatio = 1; // truns per ampere
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
  const circuitTypes = [
    { text: 'Pure Resistor', type: LoadType.Resistive },
    { text: 'Pure Inductor', type: LoadType.Inductive },
    { text: 'Pure Inductor (initial current corrected)', type: LoadType.InductiveCorrected },
    { text: 'RL Series Circuit', type: LoadType.ResInd },
  ];

  // Internal variables
  let current: number = 0; // Curent integral in Ampere (A)
  let wheelR: number = 0; // Wheel angle in turns
  let loadtype: LoadType = LoadType.Resistive; // Type of load
  let generateSine: boolean = false; // weather to generate sine wave
  let generatorStartTS: number | null = null; // sine wave generator start timestap
  let previousTS: number = 0; // previous timestamp
  let info: string = '';

  // integration function variable
  let integrateCurrent = integrateResistorCurrent;

  const onGenerateSineChange = (checked: boolean) => {
    generatorStartTS = null;
    current = 0;
    generateSine = !!checked;
    if (generateSine && loadtype === LoadType.InductiveCorrected) current = initialInductorCurrent();
  };
  $: onGenerateSineChange(generateSine);
  const onLoadChange = (loadt: LoadType) => {
    if (generateSine) onGenerateSineChange(true);
    switch (loadt) {
      case LoadType.Resistive:
        integrateCurrent = integrateResistorCurrent;
        break;
      case LoadType.Inductive:
      case LoadType.InductiveCorrected:
        integrateCurrent = integrateInductorCurrent;
        break;
      case LoadType.ResInd:
        integrateCurrent = integrateResIndCurrent;
        break;
      default:
        integrateCurrent = integrateResistorCurrent;
    }
  };
  $: onLoadChange(loadtype);

  const step: FrameRequestCallback = timeStamp => {
    const delta = (timeStamp - previousTS) / 1000; // calculating delta and converting it to seconds
    if (delta > 0.25) info = "It looks like you have left this tab or your browser's preformance is slow and this simulation may be inaccurate!";
    if (!generatorStartTS) generatorStartTS = timeStamp;
    if (generateSine) voltage = voltageMax * Math.sin(((timeStamp - generatorStartTS) * sineWaveAngularVelocity) / 1000);

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
      <input type="checkbox" bind:checked={generateSine} on:change id="generateSine" />
      <label for="generateSine">Generate Sine Wave ({sineWaveFrequency}Hz)</label>
    </div>
    <h4>Select Circuit Type:</h4>
    <div>
      {#each circuitTypes as { type, text }}
        <input type="radio" name="circuitType" id={type + 'ltype'} bind:group={loadtype} value={type} />
        <label for={type + 'ltype'}>{text}</label>
        <br />
      {/each}
    </div>
    <h3>Circuit Components</h3>
    <Range name="Inductance" unit="H" bind:value={inductance} min={0.1} max={inductanceMax} />
    <Range name="Resistance" unit="Ω" bind:value={resistance} min={0.1} max={resistanceMax} />
  </span>
</Template>

<style>
  img {
    width: 80%;
    max-width: 300px;
    filter: var(--image-filter);
  }
</style>
