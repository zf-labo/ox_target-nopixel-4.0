import { createOptions } from "./createOptions.js";

const optionsWrapper = document.getElementById("options-wrapper");
const body = document.body;
const eye = document.getElementById("eyeSvg");
const hex = document.getElementById("hex");

window.addEventListener("message", (event) => {
  optionsWrapper.innerHTML = "";

  switch (event.data.event) {
    case "visible": {
      body.style.visibility = event.data.state ? "visible" : "hidden";
      hex.style.textShadow = "#ffffff00 1px 0 10px";
      hex.style.webkitTextStroke = "1.5px #00f8b8";
      return eye.classList.remove("eye-hover");
    }

    case "leftTarget": {
      hex.style.textShadow = "#ffffff00 1px 0 10px";
      hex.style.webkitTextStroke = "1.5px #00f8b8";
      return eye.classList.remove("eye-hover");
    }

    case "setTarget": {
      eye.classList.add("eye-hover");
      hex.style.textShadow = "#00f8b8 0px 0 20px";
      hex.style.webkitTextStroke = "1.5px #00f8b8";
      
      if (event.data.options) {
        for (const type in event.data.options) {
          event.data.options[type].forEach((data, id) => {
            createOptions(type, data, id + 1);
          });
        }
      }

      if (event.data.zones) {
        for (let i = 0; i < event.data.zones.length; i++) {
          event.data.zones[i].forEach((data, id) => {
            createOptions("zones", data, id + 1, i + 1);
          });
        }
      }
    }
  }
});
