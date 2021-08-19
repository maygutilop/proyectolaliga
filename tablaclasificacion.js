const getData = async () => {
    let info = await fetch(
            "https://api.football-data.org/v2/competitions/2014/standings", {
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
            return (data.standings)
        })
        .catch(function (error) {
            console.log(error);
        });
    return info;
};
const init = async () => {
    let standings = await getData();
    console.log(standings[0].table);
    creartabla(standings[0].table);
    };
init();

function creartabla(clasif) {
    let cuerpotabla = document.getElementById("tabclasificacion");
    for (let i = 0; i < clasif.length; i++) {
        const fila = document.createElement("tr");

        let escudo = document.createElement("img")
        escudo.src = clasif[i].team.crestUrl;
        escudo.classList.add("escudoimg")

        let club = document.createElement("p");
        club.innerHTML = clasif[i].team.name;

        let pj = document.createElement("p");
        pj.innerHTML = clasif[i].playedGames;

        let v = document.createElement("p");
        v.innerHTML = clasif[i].won;

        let e = document.createElement("p");
        e.innerHTML = clasif[i].draw;

        let d = document.createElement("p");
        d.innerHTML = clasif[i].lost;

        let gf = document.createElement("p");
        gf.innerHTML = clasif[i].goalsFor;

        let gc = document.createElement("p");
        gc.innerHTML = clasif[i].goalsAgainst;

        let dg = document.createElement("p");
        dg.innerHTML = clasif[i].goalDifference;

        let pts = document.createElement("p");
        pts.innerHTML = clasif[i].points;

        let resultadoclas = [escudo, club, pj, v, e, d, gf, gc, dg, pts]
        for (let j = 0; j < resultadoclas.length; j++) {
            const columna = document.createElement("td")
            columna.append(resultadoclas[j]);
            fila.appendChild(columna)
        }
        cuerpotabla.appendChild(fila)
    }
}