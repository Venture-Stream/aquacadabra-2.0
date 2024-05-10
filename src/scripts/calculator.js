/**
 * TODO: Refactor the code to use a class - currenty using functions taking directly from old code
 */

const tankSelect = document.getElementById("tank-type");
const measureFormat = document.getElementById("measurement-format");
const sqrSubmit = document.getElementById("sqr-submit");
const cyldSubmit = document.getElementById("cyld-submit");
const sphSubmit = document.getElementById("sph-submit");
const areaSubmit = document.getElementById("area-submit");

// Change tank selected (if select dropdown present)
if (!!tankSelect) {
  tankSelect.addEventListener("change", () => {
    var tanks = document.querySelectorAll("[data-tank]");
    var selectedTank = tankSelect.value;
    tanks.forEach((item) => {
      item.classList.add("hide");
    });
    document
      .querySelector("[ data-" + selectedTank + "]")
      .classList.remove("hide");
  });
}
// change measurements
measureFormat.addEventListener("change", () => {
  let measurementVals = document.querySelectorAll("[data-format]");
  measurementVals.forEach((item) => {
    item.textContent = "(" + measureFormat.value + ")";
    if (item.hasAttribute("data-format-both")) {
      if (item.hasAttribute("data-format-squared")) {
        if (measureFormat.value == "m") {
          item.innerHTML = "(m&sup2;/ft&sup2;)";
        } else {
          item.innerHTML = "(ft&sup2;/m&sup2;)";
        }
      } else {
        if (measureFormat.value == "m") {
          item.innerHTML = "(m/ft)";
        } else {
          item.innerHTML = "(ft/m)";
        }
      }
    }
  });
  if (!!sqrSubmit) {
    calculateSqr();
  }
  if (!!cyldSubmit) {
    calculateCyld();
  }
  if (!!sphSubmit) {
    calculateSph();
  }
  if (!!areaSubmit) {
    calculateArea();
  }
});

if (!!sqrSubmit) {
  sqrSubmit.addEventListener("click", () => {
    calculateSqr();
  });
}
if (!!cyldSubmit) {
  cyldSubmit.addEventListener("click", () => {
    calculateCyld();
  });
}
if (!!sphSubmit) {
  sphSubmit.addEventListener("click", () => {
    calculateSph();
  });
}
if (!!areaSubmit) {
  areaSubmit.addEventListener("click", () => {
    calculateArea();
  });
}

// the maths part

const calculateArea = () => {
  let width = parseFloat(document.getElementById("sqr-width").value);
  let length = parseFloat(document.getElementById("sqr-length").value);
  let depth = parseFloat(document.getElementById("sqr-height").value);

  const result = document.getElementById("sqr-area");
  const resultWidth = document.getElementById("sqr-result-width");
  const resultHeight = document.getElementById("sqr-result-length");

  const symbol = document.getElementById("symbol").innerText;

  const unit = document.getElementById("measurement-format").value;

  let extra = "0",
    _area = "",
    _width = "",
    _length = "";

  if (isNaN(width) || isNaN(length) || isNaN(depth)) {
  } else {
    if (unit == "m") {
      extra = 0.6;
      _area += renderArea(width, length, depth, extra) + "m" + symbol + " / ";
      _width += renderDimension(width, depth, extra) + "m / ";
      _length += renderDimension(length, depth, extra) + "m / ";

      extra = 2;
      _area +=
        renderArea(width * 3.28084, length * 3.28084, depth * 3.28084, extra) +
        "ft" +
        symbol;
      _width += renderDimension(width * 3.28084, depth * 3.28084, extra) + "ft";
      _length +=
        renderDimension(length * 3.28084, depth * 3.28084, extra) + "ft";
    } else if (unit == "ft") {
      extra = 2;
      _area += renderArea(width, length, depth, extra) + "ft" + symbol + " / ";
      _width += renderDimension(width, depth, extra) + "ft / ";
      _length += renderDimension(length, depth, extra) + "ft / ";

      extra = 0.6;
      _area +=
        renderArea(width * 0.3048, length * 0.3048, depth * 0.3048, extra) +
        "m" +
        symbol;
      _width += renderDimension(width * 0.3048, depth * 0.3048, extra) + "m";
      _length += renderDimension(length * 0.3048, depth * 0.3048, extra) + "m";
    }
  }

  result.setAttribute("value", _area);
  resultWidth.setAttribute("value", _width);
  resultHeight.setAttribute("value", _length);
};

const renderArea = (width, length, depth, extra) => {
  width = width + depth * 2 + extra;
  length = length + depth * 2 + extra;

  let area = width * length;
  return area.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const renderDimension = (dimension, depth, extra) => {
  dimension = dimension + depth * 2 + extra;
  return dimension.toLocaleString(undefined, { maximumFractionDigits: 2 });
};

const renderUnits = (value) => {
  const unit = document.getElementById("measurement-format").value;

  if (unit == "cm") {
    value = (value / 1000000) * 1000;
  } else if (unit == "Inches") {
    value = value / 61;
  } else if (unit == "mm") {
    value = value / 1000000;
  } else if (unit == "m") {
    value = value * 1000;
  } else if (unit == "ft") {
    value = value * 28.3168;
  }

  return value;
};

let calculateSqr = () => {
  var width = document.getElementById("sqr-width").value;
  var length = document.getElementById("sqr-length").value;
  var height = document.getElementById("sqr-height").value;
  var resultLiter = document.getElementById("sqr-liter");
  var resultGallon = document.getElementById("sqr-euro-gallon");
  var resultUsGallon = document.getElementById("sqr-us-gallon");

  const volume = height * width * length;
  const liter = renderUnits(volume);

  resultLiter.setAttribute(
    "value",
    liter.toLocaleString(undefined, { maximumFractionDigits: 2 }) + "L"
  );
  resultGallon.setAttribute(
    "value",
    (liter / 4.546).toLocaleString(undefined, { maximumFractionDigits: 2 })
  );
  resultUsGallon.setAttribute(
    "value",
    (liter / 3.785).toLocaleString(undefined, { maximumFractionDigits: 2 })
  );
};

let calculateCyld = () => {
  var radius = document.getElementById("cyld-radius").value / 2;
  var height = document.getElementById("cyld-height").value;
  var resultLiter = document.getElementById("cyld-liter");
  var resultGallon = document.getElementById("cyld-euro-gallon");
  var resultUsGallon = document.getElementById("cyld-us-gallon");

  const volume = Math.PI * Math.pow(radius, 2) * height;
  const liter = renderUnits(volume);

  resultLiter.setAttribute(
    "value",
    liter.toLocaleString(undefined, { maximumFractionDigits: 2 }) + "L"
  );
  resultGallon.setAttribute(
    "value",
    (liter / 4.546).toLocaleString(undefined, { maximumFractionDigits: 2 })
  );
  resultUsGallon.setAttribute(
    "value",
    (liter / 3.785).toLocaleString(undefined, { maximumFractionDigits: 2 })
  );
};

let calculateSph = () => {
  const measureFormat = document.getElementById("measurement-format").value;
  var radius = document.getElementById("sph-radius").value / 2;
  var resultLiter = document.getElementById("sph-liter");
  var resultGallon = document.getElementById("sph-euro-gallon");
  var resultUsGallon = document.getElementById("sph-us-gallon");

  const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
  const liter = renderUnits(volume);

  resultLiter.setAttribute(
    "value",
    liter.toLocaleString(undefined, { maximumFractionDigits: 2 }) + "L"
  );
  resultGallon.setAttribute(
    "value",
    (liter / 4.546).toLocaleString(undefined, { maximumFractionDigits: 2 })
  );
  resultUsGallon.setAttribute(
    "value",
    (liter / 3.785).toLocaleString(undefined, { maximumFractionDigits: 2 })
  );
};