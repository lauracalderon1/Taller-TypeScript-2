import { Serie } from './serie.js';
import { Data } from './data.js';

const seriesContainer: HTMLElement = document.getElementById("series")!;
let averageSeasons: number = 0;
const dataContainer: HTMLElement = document.getElementById("tabla-datos")!;
const cardContainer: HTMLElement = document.getElementById("container-card")!;

function displayTableElements(seriesData: Serie[]): void {
    seriesData.forEach((serie) => {
        let tableRow = document.createElement('tr');

        tableRow.innerHTML =  `<th>${serie.id}</th>
                                <td class="text-primary">${serie.nombre}</td>
                                <td>${serie.plataforma}</td>
                                <td>${serie.temporadas}</td>`;

        seriesContainer.appendChild(tableRow);
        averageSeasons += serie.temporadas;
    });

    averageSeasons /= seriesData.length;

    document.getElementById("average")!.innerHTML = "Seasons Average: " + averageSeasons;
}

displayTableElements(Data);

dataContainer.addEventListener("click", function(event) {
    const targetElement = event.target as HTMLElement;

    if (targetElement.tagName == "TH" || targetElement.tagName == "TD") {
        const row = targetElement.parentElement as HTMLTableRowElement;
        const id = row.cells[0].textContent;

        Data.forEach((serie) => {
            if (id !== null && parseInt(id) === serie.id) {
                let selectedSerie: Serie = serie;
                showSerieDetails(selectedSerie);
            }
        });
    }
});

function showSerieDetails(selectedSerie: Serie) {
    let newCard = document.createElement("div");
    newCard.className = "card";
    newCard.style.width = "20rem";

    newCard.innerHTML = `<img class="card-img-top" src="${selectedSerie.imagen}" alt="Imagen">`;
    let cardBody = document.createElement("div");
    cardBody.className = "card-body";
    cardBody.innerHTML =   `<h3 class="card-title" style="font-weight: bold;">${selectedSerie.nombre}</h3>
                            <p class="card-text">${selectedSerie.descripcion}</p>
                            <a href="${selectedSerie.link}" target="_blank">${selectedSerie.link}</a>`;

    newCard.appendChild(cardBody);
    cardContainer.innerHTML = "";
    cardContainer.appendChild(newCard);
}