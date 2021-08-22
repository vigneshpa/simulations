# Simulations
> This repository is under developement! If you wish to contribute your time go ahed and do that. Give me a pull request if you are done.

This git repository has some simulations to learn physics visually and it is not intended for professional prototyping or testing  as the accuracy will be very low.

> The acuracy of the simulations depend on the frame rate of the browser and for each frame the simulation do many calculations. The framerate and accuracy will drop if the performance is low or throttled.

## Why?

There are many softwares for simulations but they are all designed to be used used for prototyping and for testing designs. But the simulations in this repo are different because the are realtime. You can actually see how the components behave and change the parameters while the simulation is running.

## Build Instructions

The pre-built HTML, CSS and JavaScript are availabe in the folder 'docs', so there is no need to build these simulations if you are not changing the actual source code.

### Command to build all simulations
 ```shell
 gulp
 ```

### Command to build specfic simulation
 ```shell
 gulp <simulation_name>
 ```

### Command to start developement server with HMR
 ```shell
 gulp dev-<simulation_name>
 ```

## How it works

Most of the simulations in this repo are written in [Svelte](https://svelte.dev/) along with [TypeScript](https://www.typescriptlang.org/) and [SASS](https://sass-lang.com/). They are compiled, bundled, minified and optimised by the [webpack](https://webpack.js.org/) module bundler. The tasks are orchestrated by the [Gulp](https://gulpjs.com/) task runner.

The simulations utilises the [Window.requestAnimationFrame()](https://developer.mozilla.org/docs/Web/API/window/requestAnimationFrame) API to do the integration calculations of the simulation and to prepare the animation frames before the browser renders them.
For each frame the time interval between the frames are calculated and the integrations are done within this time interval. If this time interval exceeds 500ms ( It occours when the performance is very low or is being throttled) a warning will be shown to the user.

## How it is organised

The source code lies within the [src](./src) folder. For each simulation there must be folder for the simulation inside the [src](./src) folder.
This simulation folder must contain an 'index.ts' file which is the entry point of the bundler for that simulation. Every folder inside the [src](./src) directory must correspond to a simulation unless the folder is [lib](./src/lib) where a common library for all simulations is seated.