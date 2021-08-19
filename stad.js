let tablebody = document.getElementById("tablastad");

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
    let top5 = estadisticas(partidos);
    console.log(top5)
};
init();

function estadisticas(partidos) {
    let estadisticas = [];
    for (let i = 0; i < partidos.length; i++) {
        let estad = partidos[i].status;
        if (estad !== "FINISHED") {
            continue
        }

        let equipolocal = partidos[i].homeTeam.name;
        let idequipolocal = partidos[i].homeTeam.id;
        let golesequipolocal = partidos[i].score.fullTime.homeTeam;

        let equipovisitante = partidos[i].awayTeam.name;
        let idequipovisitante = partidos[i].awayTeam.id;
        let golesequipovisitante = partidos[i].score.fullTime.awayTeam;
       


        let localencontrado;
        estadisticas.forEach(eqecontrado => {
            if (eqecontrado.id === idequipolocal) {
                localencontrado = eqecontrado
            }
        })
        if (localencontrado == undefined) {
            estadisticas.push({
                id: idequipolocal,
                name: equipolocal,
                goals: golesequipolocal,
                matches: 1,
                
            })
        } else {
            localencontrado.matches++
            localencontrado.goals += golesequipolocal
        }
        let visitanteencontrado;
        estadisticas.forEach(visencontrado => {
            if (visencontrado.id === idequipovisitante) {
                visitanteencontrado = visencontrado
            }
        })
        if (visitanteencontrado == undefined) {
            estadisticas.push({
                id: idequipovisitante,
                name: equipovisitante,
                goals: golesequipovisitante,
                matches: 1,
                
            })
        } else {
            visitanteencontrado.matches++
            visitanteencontrado.goals += golesequipovisitante
        }

    }
    for (let i = 0; i < estadisticas.length; i++) {
        let mediagoles = estadisticas[i].goals / estadisticas[i].matches
        estadisticas[i].average = mediagoles
        estadisticas[i].average = mediagoles.toFixed(2);

    }
    estadisticas.sort((a, b) => b.average - a.average)
    creartabla(estadisticas)
}
// estadisticas(data.matches)

function creartabla(estadisticas) {
    let top5 = estadisticas.slice(0, 5)

    for (let i = 0; i < top5.length; i++) {
        let tr = document.createElement("tr");
        tr.innerHTML = `<td><img src = "https://crests.football-data.org/${top5[i].id}.svg" width="40"/><td>${top5[i].name}</td><td>${top5[i].goals}</td><td>${top5[i].matches}</td><td>${top5[i].average}</td>`;
        tablebody.appendChild(tr);
    };
};