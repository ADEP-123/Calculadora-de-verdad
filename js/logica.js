const teclado = document.getElementById("teclado");
teclado.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const tabIng = document.getElementById("tab_ing")
    const target = e.target;
    if (target.tagName == "BUTTON") {
        if (target.id == "del") {
            tabIng.value = tabIng.value.slice(0, -1);
        } else if (target.id == "clear") {
            tabIng.value = "";
        } else {
            tabIng.value += target.dataset.value
        }
        console.log({ value: target.dataset.value, id: target.id });
    }

});

const tabIngreso = document.getElementById("tabIngres");
tabIngreso.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const target = e.target;
    if (target.tagName == "BUTTON" && target.dataset.value == "calc") {
        const tabIng = document.getElementById("tab_ing");
        const valIncQ = document.getElementById("valIncQ").value;
        const valIncP = document.getElementById("valIncP").value;

        const resultado = calcularValorDeVerdad(tabIng.value, valIncP, valIncQ);

        console.log("Resultado de la expresión:", resultado);
    }
});

function calcularValorDeVerdad(expresion, valorP, valorQ) {
    if (valorP == "verdad") {
        valorP = true
    } else {
        valorP = false
    }

    if (valorQ == "verdad") {
        valorQ = true
    } else {
        valorQ = false
    }
    console.log(expresion);
    expresion = expresion.replace(/v/g, '||');
    expresion = expresion.replace(/¬/g, '!');
    expresion = expresion.replace(/\^/g, '&&');

    expresion = expresion.replace(/p/g, valorP);
    expresion = expresion.replace(/q/g, valorQ);
    console.log(expresion);
    try {
        const resultado = eval(expresion);
        return resultado;
    } catch (error) {
        console.error("Error al evaluar la expresión:", {error:error.message});
        return "Error";
    }
}