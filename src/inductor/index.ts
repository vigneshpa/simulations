import './style.css'; // importing style sheet

const visiblePercision = 1;

// Maximums
const voltageMax = 10;
const currentMax = 2;
const resistanceMax = 10;
const inductanceMax = 10;

// Controlables
const controls = {
  Voltage: 0, // in Volts (V)
  Resistance: 5, // in Ohms (Ω)
  Inductance: 5, // in Henries (H)
};

// Constants
const sineWaveFrequency = 0.2; // in Hertz (Hz)
const sineWaveAngularVelocity = 2 * Math.PI * sineWaveFrequency; // in rad/sec as ω=2πf
const initialInductorCurrent = () => -(voltageMax / (controls.Inductance * sineWaveAngularVelocity)); // as -I₀=-E₀/Lω
const angularVelocityCurrentRatio = 1;
const integrateResistorCurrent = (delta: number) => controls.Voltage / controls.Resistance; // as V=iR
const integrateInductorCurrent = (delta: number) => (currentIntegral += (delta * controls.Voltage) / controls.Inductance); // as V=-L(di/dt)
const integrateResIndCurrent = (delta: number) =>
  (currentIntegral += (delta * (controls.Voltage - currentIntegral * controls.Resistance)) / controls.Inductance); // as V=-L(di/dt)+iR

// Load Type emun
const enum LoadType {
  Resistive,
  Inductive,
  InductiveCorrected,
  ResInd,
}

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

// Adding wheel element
const wheelEl = document.createElement('img');
wheelEl.id = 'flywheel';
wheelEl.src = require('./flywheel.svg');
document.getElementById('view')!.append(wheelEl);

const changeGenerateSine = (checked: boolean) => {
  generatorStartTS = null;
  currentIntegral = 0;
  rps = 0;
  generateSine = !!checked;
  if (generateSine && loadtype === LoadType.InductiveCorrected) currentIntegral = initialInductorCurrent();
};

const changeCircuitType = (loadt: LoadType) => {
  loadtype = loadt;
  if (generateSine) changeGenerateSine(true);
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

const step: FrameRequestCallback = timeStamp => {
  const delta = (timeStamp - previousTS) / 1000; // calculating delta and converting it to seconds

  const current = integrateCurrent(delta);

  rps = angularVelocityCurrentRatio * current;

  wheelR += rps * delta * 360;
  if (wheelR > -5000 && wheelR < 5000) wheelR = wheelR % 360;
  wheelEl.style.transform = `rotate(${wheelR}deg)`;

  // --
  curEl.innerText = current.toFixed(visiblePercision);
  curPgr.value = current + currentMax;
  if (!generatorStartTS) generatorStartTS = timeStamp;
  if (generateSine) voltageControl.change(voltageMax * Math.sin(((timeStamp - generatorStartTS) * sineWaveAngularVelocity) / 1000));
  previousTS = timeStamp;
  window.requestAnimationFrame(step);
};
window.requestAnimationFrame(step);

// Populating controls -----

// Shortcut functions
const br = () => document.createElement('br');

// getting control element
const controlsDiv = document.getElementById('controls')!;

// Appending current
const curEl = document.createElement('span');
curEl.innerText = '0.0';
controlsDiv.append('Current : ', curEl, 'A', br());

// Appending current progress
const curPgr = document.createElement('progress');
curPgr.max = currentMax * 2;
curPgr.value = 2;
controlsDiv.append(curPgr, br());

// Appending controls.Voltage
const voltageControl = createControl('Voltage', voltageMax, -voltageMax, 'V');
controlsDiv.append(...voltageControl.nodes, br());

// Appending generate sine
const generateSineInp = document.createElement('input');
generateSineInp.type = 'checkbox';
generateSineInp.id = 'generateSine';
generateSineInp.onchange = ev => changeGenerateSine(generateSineInp.checked);
const generateSineInpLbl = document.createElement('label');
generateSineInpLbl.htmlFor = 'generateSine';
generateSineInpLbl.innerText = `Generate Sine Wave (${sineWaveFrequency}Hz)`;
controlsDiv.append(generateSineInp, generateSineInpLbl, br());

// Appending circuit type selector
const circuitDiv = document.createElement('div');
const circuitDivHeading = document.createElement('h4');
circuitDivHeading.innerText = 'Select Circuit Type:';
circuitDiv.append(circuitDivHeading);
const handlers = {
  'Pure Resistor': () => changeCircuitType(LoadType.Resistive),
  'Pure Inductor': () => changeCircuitType(LoadType.Inductive),
  'Pure Inductor (initial current corrected)': () => changeCircuitType(LoadType.InductiveCorrected),
  'RL Series Circuit': () => changeCircuitType(LoadType.ResInd),
};
for (const text in handlers) {
  if (Object.prototype.hasOwnProperty.call(handlers, text)) {
    const inpt = document.createElement('input');
    inpt.type = 'radio';
    inpt.name = 'circuitType';
    if (text === 'Pure Resistor') inpt.checked = true;
    inpt.id = text;
    inpt.onchange = (<any>handlers)[text];
    circuitDiv.append(inpt);
    const lbl = document.createElement('label');
    lbl.innerText = text;
    lbl.htmlFor = text;
    circuitDiv.append(lbl, br());
  }
}
controlsDiv.append(circuitDiv);

// Appending circuit components
const componentsDiv = document.createElement('div');
const constantsDivHeading = document.createElement('h4');
constantsDivHeading.innerText = 'Circuit Components';
componentsDiv.append(constantsDivHeading);

// Inductance control
componentsDiv.append(...createControl('Inductance', inductanceMax, 0.1, 'H').nodes);

// I

componentsDiv.append(...createControl('Resistance', resistanceMax, 0.1, 'Ω').nodes);
controlsDiv.append(componentsDiv);

function createControl(name: keyof typeof controls, max: number, min: number, unitSymbol: string) {
  const labelEl = document.createElement('label');
  labelEl.htmlFor = name;
  const valueEl = document.createElement('span');
  valueEl.innerText = controls[name] as unknown as string;
  labelEl.append(name + ' : ', valueEl, unitSymbol);
  const contorlEL = document.createElement('input');
  contorlEL.type = 'range';
  contorlEL.max = max + '';
  contorlEL.min = min + '';
  contorlEL.step = '0.1';
  contorlEL.id = name;
  const change = (value: number) => (valueEl.innerText = ((<any>contorlEL).value = controls[name] = value).toFixed(visiblePercision));
  change(controls[name]);
  contorlEL.oninput = ev => (valueEl.innerText = (controls[name] = +contorlEL.value).toFixed(visiblePercision));
  return { nodes: [labelEl, br(), contorlEL, br()], change };
}
