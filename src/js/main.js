import init from "./wasm_loader.js";

let isPageLoaded = false;
const canvasElement = document.getElementById("bevy");
const initErrMsg =
  "Using exceptions for control flow, don't mind me. This isn't actually an error!";

window.bevyLoadingBarFetch = async (resource) => {
  if (!resource.toString().includes("Fox.glb.meta")) {
    return fetch(resource);
  }

  if (!isPageLoaded) {
    isPageLoaded = true;
    canvasElement.classList.add("visible");
    canvasElement.focus();
  }

  return new Response(null, { status: 404 });
};

init().catch((error) => {
  if (!error.message.startsWith(initErrMsg)) {
    throw error;
  }
});

console.log(`Animation controls:
- Spacebar: play / pause
- Arrow up / down: speed up / slow down animation playback
- Arrow left / right: seek backward / forward
- Digit 1 / 3 / 5: play the animation <digit> times
- L: loop the animation forever
- Enter or return: change animation`);
