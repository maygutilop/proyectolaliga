let inputBuscar = document.getElementById("buscador")

const getData = async () => {
    let info = await fetch(
            "https://api.football-data.org/v2/competitions/2014/matches", {
                method: "GET",
                headers: {
                    "X-Auth-Token": "0dd5c3af7e464cbaba014ce76d9c3db7",
                },
            }
        )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            return data.matches;
        })
        .catch(function (error) {
            console.log(error);
        });
    return info;
};
const init = async () => {
    let partidos = await getData();
    console.log(partidos);
    creartabla(partidos);
    inputBuscar.addEventListener("keyup", function () {
        buscar(partidos);
    });
    
};
init();
// creartabla(data.matches);

function creartabla(partio) {
    let cuerpotabla = document.getElementById("tabpartidos");
    cuerpotabla.innerHTML = ""
    for (let i = 0; i < partio.length; i++) {
        const fila = document.createElement("tr");

        let escudol = document.createElement("img")
        escudol.src = "https://crests.football-data.org/" + partio[i].homeTeam.id + ".svg";
        escudol.classList.add("escudoimg")

        let escudov = document.createElement("img")
        escudov.src = "https://crests.football-data.org/" + partio[i].awayTeam.id + ".svg";
        escudov.classList.add("escudoimg")

        let eqlocal = document.createElement("p");
        eqlocal.innerHTML = partio[i].homeTeam.name;

        let visitante = document.createElement("p");
        visitante.innerHTML = partio[i].awayTeam.name;

        let fecha = new Date(partio[i].utcDate)

        let jornada = document.createElement("p");
        jornada.innerHTML = partio[i].matchday;

        let resultado = document.createElement("p");
        resultado.innerHTML = partio[i].score.fullTime.homeTeam + "-" + partio[i].score.fullTime.awayTeam;
        if (partio[i].score.fullTime.homeTeam == null) {
           resultado.innerHTML = "proximamente";
        }

        let resultadopartido = [escudol, eqlocal, resultado, escudov, visitante, fecha.toLocaleString(), jornada]
    
        for (let j = 0; j < resultadopartido.length; j++) {
            const columna = document.createElement("td")
            columna.append(resultadopartido[j]);
            fila.appendChild(columna)
        }
        cuerpotabla.appendChild(fila)
    }
}

function buscar(partidos) {
    if (inputBuscar.value == "") {
        creartabla(partidos);
    }
    let filtros = partidos.filter((nombres) => {

        return (
            nombres.homeTeam.name.toLowerCase().includes(inputBuscar.value.toLowerCase()) ||
            nombres.awayTeam.name.toLowerCase().includes(inputBuscar.value.toLowerCase())
        );
    });
    creartabla(filtros);
}
