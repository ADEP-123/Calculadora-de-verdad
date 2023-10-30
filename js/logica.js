
const teclado = document.getElementById("teclado");
teclado.addEventListener("click", (e) => {
    e.stopPropagation();
    e.preventDefault();
    const tabIng = document.getElementById("tab_ing")
    const target = e.target;
    if (target.tagName == "BUTTON") {
        if (target.id == "del") {
            tabIng.value = tabIng.value.slice(0, -1);
        }
        else if (target.id == "clear") {
            tabIng.value = "";
        }
        else if (target.id == "calc") {
            if (target.tagName == "BUTTON" && target.dataset.value == "calc") {
                const tabIng = document.getElementById("tab_ing");
                const valIncQ = document.getElementById("valIncQ").value;
                const valIncP = document.getElementById("valIncP").value;
                const valIncR = document.getElementById("valIncR").value;


                const resultado = calcularValorDeVerdad(tabIng.value, valIncP, valIncQ, valIncR);

                if (resultado === true) {
                    document.getElementById("respuesta").innerHTML = `La expresion ingresada da como resultado: Verdadero`
                }
                else if (resultado === false) {
                    document.getElementById("respuesta").innerHTML = `La expresion ingresada da como resultado: Falso`
                } else {
                    document.getElementById("respuesta").innerHTML = `Revisa la expresion parece haber un error de escritura`
                }

                console.log("Resultado de la expresión:", resultado);
            }

        }
        else {
            tabIng.value += target.dataset.value
        }
        // console.log({ value: target.dataset.value, id: target.id });
    }

});


function calcularValorDeVerdad(expresion, valorP, valorQ, valorR) {
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

    if (valorR == "verdad") {
        valorR = true
    } else {
        valorR = false
    }

    console.log({ expAntes: expresion });
    expresion = expresion.replace(/v/g, '||');
    expresion = expresion.replace(/¬/g, '!');
    expresion = expresion.replace(/\^/g, '&&');

    expresion = expresion.replace(/r/g, valorR);
    expresion = expresion.replace(/p/g, valorP);
    expresion = expresion.replace(/q/g, valorQ);

    console.log({ expDespues: expresion });

    try {
        const resultado = eval(expresion);
        return resultado;
    } catch (error) {
        if (error.message == "truetrue is not defined" || error.message == "truefalse is not defined" || error.message == "falsefalse is not defined" || error.message == "falsetrue is not defined") {
            return "Revise la expresion parece haber un error de escritura";
        }
        console.error("Error al evaluar la expresión:", { error: error.message });
        return "Error";
    }
}