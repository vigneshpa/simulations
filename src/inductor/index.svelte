<script lang="ts">
  import Template from '../Template.svelte';
  import Range from '../Range.svelte';
  import Progress from '../Progress.svelte';
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
  const initialInductorCurrent = () => -(voltageMax / (inductance * sineWaveAngularVelocity)); // as -I₀=-E₀/Lω
  const angularVelocityCurrentRatio = 1;
  const integrateResistorCurrent = (delta: number) => voltage / resistance; // as V=iR
  const integrateInductorCurrent = (delta: number) => (currentIntegral += (delta * voltage) / inductance); // as V=-L(di/dt)
  const integrateResIndCurrent = (delta: number) => (currentIntegral += (delta * (voltage - currentIntegral * resistance)) / inductance); // as V=-L(di/dt)+iR

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
  let currentIntegral: number = 0; // Curent integral in Ampere (A)
  let rps = 0; // Angular velocity in rotations per second
  let wheelR: number = 0; // Wheel angle in turns
  let loadtype: LoadType = LoadType.Resistive;
  let generateSine: boolean = false;
  let generatorStartTS: number | null = null;
  let previousTS: number = 0;

  // integration function variable
  let integrateCurrent = integrateResistorCurrent;

  const onGenerateSineChange = (checked: boolean) => {
    generatorStartTS = null;
    currentIntegral = 0;
    rps = 0;
    generateSine = !!checked;
    if (generateSine && loadtype === LoadType.InductiveCorrected) currentIntegral = initialInductorCurrent();
  };
  $: onGenerateSineChange(generateSine);
  const onLoadChange = (loadt: LoadType) => {
    loadtype = loadt;
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

    currentIntegral = integrateCurrent(delta);

    rps = angularVelocityCurrentRatio * currentIntegral;

    // changing wheel angle
    wheelR += rps * delta;
    if (wheelR < -4 || wheelR > 4) wheelR = wheelR % 1;
    if (!generatorStartTS) generatorStartTS = timeStamp;
    if (generateSine) voltage = voltageMax * Math.sin(((timeStamp - generatorStartTS) * sineWaveAngularVelocity) / 1000);
    previousTS = timeStamp;
    window.requestAnimationFrame(step);
  };
  window.requestAnimationFrame(step);
</script>

<Template>
  <span slot="header">Visualising Current as angular velocity</span>
  <img slot="view" src={flywheelImg} style="transform:rotate({wheelR}turn)" alt="" />
  <span slot="controls">
    <Progress name="Current" unit="A" value={currentIntegral} max={currentMax} min={-currentMax} />
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
