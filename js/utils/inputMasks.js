function maskSoma(input) {
  input.addEventListener("input", () => {
    input.value = input.value
      .replace(/[^0-9]/g, "")
      .slice(0, input.maxLength);
  });
};

function maskNota(input) {
  input.addEventListener("input", () => {
    function format(v) {
      if (!v) return "";
      v = v.replace(/\D/g, "");
      return (Number(v) / 100).toFixed(2).replace(".", ",");
    }

    let max = Number(input.getAttribute("max"));
    let v = input.value.replace(/\D/g, "");

    if (max) {
      let decimal = Number(v || "0") / 100;
      if (decimal > max) {
        v = v.slice(0, -1);
      };
    };

    input.value = format(v);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[maskSoma]").forEach(element => {
    maskSoma(element);
  });

  document.querySelectorAll("[maskNota]").forEach(element => {
    maskNota(element);
  });
});
