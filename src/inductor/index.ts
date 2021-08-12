import './style.css'; // importing style sheet

// Constants
const inductance = 10; // in Henries(H)
const resistance = 5; // in Ohms(Ω)
const sineWaveFrequency = 0.2; // in Hertz (Hz)
const sineWaveAngularVelocity = 2 * Math.PI * sineWaveFrequency; // in rad/sec as ω=2πf
const voltageMax = 10;
const currentMax = 2;
const initialInductorCurrent = -voltageMax / (inductance * sineWaveAngularVelocity); // as -I₀=-E₀/Lω
const angularVelocityCurrentRatio = 1;
const integrateResistorCurrent = (delta: number) => voltage / resistance; // as V=iR
const integrateInductorCurrent = (delta: number) => (currentIntegral += (delta * voltage) / inductance); // as V=-L(di/dt)
const integrateResIndCurrent = (delta: number) => (currentIntegral += (delta * (voltage - currentIntegral * resistance)) / inductance); // as V=-L(di/dt)+iR

// Variables
let integrateCurrent = integrateResistorCurrent;
let voltage = 0;
let rps = 0;
let wheelR: number = 0;
let currentIntegral: number = 0;
let loadtype: 'Resistive' | 'Inductive' | 'ResInd' | 'InductiveCorrected' = 'Resistive';
let generateSine: boolean = false;
let generatorStartTS: number | null = null;
let previousTS: number = 0;

const wheelEl = document.getElementById('flywheel')!;
const changeGenerateSine = (checked: boolean) => {
  generatorStartTS = null;
  currentIntegral = 0;
  rps = 0;
  generateSine = !!checked;
  if (generateSine && loadtype === 'InductiveCorrected') currentIntegral = initialInductorCurrent;
};

const changeCircuitType = (loadt: typeof loadtype) => {
  currentIntegral = 0;
  loadtype = loadt;
  if (generateSine) changeGenerateSine(true);
  switch (loadt) {
    case 'Resistive':
      integrateCurrent = integrateResistorCurrent;
      break;
    case 'Inductive':
      integrateCurrent = integrateInductorCurrent;
      break;
    case 'ResInd':
      integrateCurrent = integrateResIndCurrent;
      break;
    case 'InductiveCorrected':
      integrateCurrent = integrateInductorCurrent;
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
  curEl.innerText = current.toFixed(1);
  curPgr.value = current + currentMax;
  if (!generatorStartTS) generatorStartTS = timeStamp;
  if (generateSine)
    (<any>volEl).innerText = ((<any>voltageInp).value = voltage =
      voltageMax * Math.sin(((timeStamp - generatorStartTS) * sineWaveAngularVelocity) / 1000)).toFixed(1);
  previousTS = timeStamp;
  window.requestAnimationFrame(step);
};
window.requestAnimationFrame(step);

// Populating controls

// Shortcut functions
const br = () => document.createElement('br');

// getting control element
const controls = document.getElementById('controls')!;

// Appending current
const curEl = document.createElement('span');
curEl.innerText = '0.0';
controls.append('Current : ', curEl, 'A', br());

// Appending current progress
const curPgr = document.createElement('progress');
curPgr.max = currentMax * 2;
curPgr.value = 2;
controls.append(curPgr, br());

// Appending voltage
const volEl = document.createElement('span');
volEl.innerText = '0.0';
const voltageLablel = document.createElement('label');
voltageLablel.append('Voltage : ', volEl, 'V');
voltageLablel.htmlFor = 'voltage';
controls.append(voltageLablel, br());

// Appending voltage input
const voltageInp = document.createElement('input');
voltageInp.id = 'voltage';
voltageInp.type = 'range';
voltageInp.max = voltageMax as unknown as string;
voltageInp.min = -voltageMax as unknown as string;
voltageInp.step = '0.2';
voltageInp.value = '0';
voltageInp.oninput = ev => (voltage = +(volEl.innerText = voltageInp.value));
controls.append(voltageInp, br());

// Appending generate sine
const generateSineInp = document.createElement('input');
generateSineInp.type = 'checkbox';
generateSineInp.id = 'generateSine';
generateSineInp.onchange = ev => changeGenerateSine(generateSineInp.checked);
const generateSineInpLbl = document.createElement('label');
generateSineInpLbl.htmlFor = 'generateSine';
generateSineInpLbl.innerText = `Generate Sine Wave (${sineWaveFrequency}Hz)`;
controls.append(generateSineInp, generateSineInpLbl, br());

// Appending circuit type selector
const circuitDiv = document.createElement('div');
const circuitDivHeading = document.createElement('h4');
circuitDivHeading.innerText = 'Select Circuit Type:';
circuitDiv.append(circuitDivHeading);
const handlers = {
  'Pure Resistor': () => changeCircuitType('Resistive'),
  'Pure Inductor': () => changeCircuitType('Inductive'),
  'Pure Inductor (initial current corrected)': () => changeCircuitType('InductiveCorrected'),
  'RL Series Circuit': () => changeCircuitType('ResInd'),
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
controls.append(circuitDiv);

// Appending circuit constants
const constantsDiv = document.createElement('div');
const constantsDivHeading = document.createElement('h4');
constantsDivHeading.innerText = 'Circuit Constants';
constantsDiv.append(constantsDivHeading);
constantsDiv.append(`Inductance : ${inductance}H`, br());
constantsDiv.append(`Resistance : ${resistance}Ω`, br());
controls.append(constantsDiv);
