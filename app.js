const movies = [
    {
        id: 1,
        title: "Dune: Part Two",
        year: 2024,
        genero: "Ciencia Ficción",
        director: "Denis Villeneuve",
        synopsis: "Paul Atreides busca consolidar su liderazgo entre los Fremen mientras enfrenta conspiraciones interplanetarias.",
        actors: "Timothée Chalamet, Zendaya, Rebecca Ferguson",
        poster: "https://i.pinimg.com/736x/77/03/8e/77038e7555ce7c1401b1bb5ec9768a67.jpg"
    },
    {
        id: 2,
        title: "Challengers",
        year: 2024,
        genero: "Drama/Romance",
        director: "Luca Guadagnino",
        synopsis: "Un triángulo amoroso se desarrolla en el mundo del tenis entre ex parejas y su entrenador.",
        actors: "Zendaya, Josh O’Connor, Mike Faist",
        poster: "https://i.pinimg.com/736x/c9/11/e7/c911e7bfa6d75a14ac0fb7a9847249a0.jpg"
    },
    {
        id: 3,
        title: "Inside Out 2",
        year: 2024,
        genero: "Animación/Familia",
        director: "Kelsey Mann",
        synopsis: "Vemos cómo evolucionan las emociones de Riley ahora en su adolescencia.",
        actors: "Amy Poehler, Phyllis Smith, Maya Hawke",
        poster: "https://i.pinimg.com/1200x/f8/21/87/f82187292fec23dbbaa815d01a263988.jpg"
    },
    {
        id: 4,
        title: "Proyecto Almanac",
        year: 2015,
        genero: "Ciencia Ficción",
        director: "Dean Israelite",
        synopsis: "Un grupo de amigos descubre planos para construir una máquina del tiempo...",
        actors: "Jonny Weston, Sofia Black-D'Elia",
        poster: "https://i.pinimg.com/736x/1b/6c/8c/1b6c8c241a7280063c26cd55d3d2fe3d.jpg"
    },
    {
        id: 5,
        title: "Babygirl",
        year: 2024,
        genero: "Drama/Romance",
        director: "Halina Reijn",
        synopsis: "Una ejecutiva despierta pasiones y conflictos cuando comienza un affair con un practicante mucho más joven.",
        actors: "Nicole Kidman, Harris Dickinson, Sophie Wilde",
        poster: "https://i.pinimg.com/736x/73/23/b9/7323b93508c1269aee32afcdc85d7c99.jpg"
    },
    {
        id: 6,
        title: "The Black Phone 2",
        year: 2025,
        genero: "Horror",
        director: "Scott Derrickson",
        synopsis: "Secuela de horror centrada en un teléfono que conecta con víctimas del pasado.",
        actors: "Ethan Hawke, Mason Thames",
        poster: "https://i.pinimg.com/736x/01/a8/e7/01a8e71d02bb203a0b83d76cf581315e.jpg"
    },
    {
        id: 7,
        title: "Interstellar",
        year: 2014,
        genero: "Ciencia Ficción",
        director: "Christopher Nolan",
        synopsis: "Un grupo de astronautas viaja a través de un agujero de gusano en busca de un nuevo hogar para la humanidad.",
        actors: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
        poster: "https://i.pinimg.com/1200x/0b/34/ce/0b34ce2145b475247577a5d438a199b0.jpg"

    },
    {
        id: 8,
        title: "F1 The Movie",
        year: 2025,
        genero: "Deportes",
        director: "Joseph Kosinski",
        synopsis: "Un veterano piloto, Sonny Hayes, regresa a la Fórmula 1 con el equipo APXGP; la película sigue la competencia, las tensiones dentro del equipo y los desafíos personales y profesionales en la pista.",
        actors: "Brad Pitt (Sonny Hayes), Damson Idris (Joshua Pearce), Kerry Condon (Kate McKenna), Javier Bardem (Rubén Cervantes), Tobias Menzies (Peter Banning)",
        poster: "https://i.pinimg.com/1200x/00/e6/0b/00e60b42cc1b6838efda56240292bb0b.jpg",
        releaseDate: "2025-06-27"
    }


];


let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let currentMovie = null;


function renderMovies(list) {
    const moviesList = document.getElementById("moviesList");
    moviesList.innerHTML = "";
    list.forEach(movie => {
        const col = document.createElement("div");
        col.className = "col-12 col-sm-6 col-md-4 mb-4";
        col.innerHTML = `
      <div class="card h-100 shadow-sm" data-id="${movie.id}">
        <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
        <span class="badge">${movie.year}</span>
        <div class="card-body d-flex flex-column justify-content-between">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">${movie.synopsis}</p>
          <button class="btn btn-outline-primary btn-sm mt-2">Ver detalles</button>
        </div>
      </div>
    `;
        col.querySelector(".btn-outline-primary").addEventListener("click", (e) => {
            e.stopPropagation();
            showMovieDetail(movie);
        });
        col.querySelector(".card").addEventListener("click", () => showMovieDetail(movie));
        moviesList.appendChild(col);
    });
}

// Mostrar detalle en modal
function showMovieDetail(movie) {
    currentMovie = movie;
    document.getElementById("movieTitle").textContent = movie.title;
    document.getElementById("moviePoster").src = movie.poster;
    document.getElementById("movieDirector").textContent = movie.director;
    document.getElementById("movieYear").textContent = movie.year;
    document.getElementById("movieGenero").textContent = movie.genero;
    document.getElementById("movieSynopsis").textContent = movie.synopsis;
    document.getElementById("movieActors").textContent = movie.actors;

    renderComments(movie.id);

    const modal = new bootstrap.Modal(document.getElementById("movieModal"));
    modal.show();
}

// Favoritos
document.getElementById("addFavorite").addEventListener("click", () => {
    if (!favorites.includes(currentMovie.id)) {
        favorites.push(currentMovie.id);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        alert("Agregada a favoritas ✅");
    }
});

document.getElementById("removeFavorite").addEventListener("click", () => {
    favorites = favorites.filter(id => id !== currentMovie.id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Eliminada de favoritas ❌");
});


document.getElementById("showFavorites").addEventListener("click", () => {
    const favMovies = movies.filter(m => favorites.includes(m.id));
    renderMovies(favMovies);
});

document.getElementById("showAll").addEventListener("click", () => {
    renderMovies(movies);
});

// Búsqueda
document.getElementById("searchInput").addEventListener("input", e => {
    const search = e.target.value.toLowerCase();
    const filtered = movies.filter(m => m.title.toLowerCase().includes(search));
    renderMovies(filtered);
});

// Filtro de año
document.getElementById("yearFilter").addEventListener("change", e => {
    const year = e.target.value;
    if (year) {
        const filtered = movies.filter(m => m.year == year);
        renderMovies(filtered);
    } else {
        renderMovies(movies);
    }
});

// Comentarios
function renderComments(movieId) {
    const commentsList = document.getElementById("commentsList");
    commentsList.innerHTML = "";
    const comments = JSON.parse(localStorage.getItem(`comments_${movieId}`)) || [];
    comments.forEach(c => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = c;
        commentsList.appendChild(li);
    });
}

document.getElementById("addComment").addEventListener("click", () => {
    const input = document.getElementById("commentInput");
    if (input.value.trim()) {
        let comments = JSON.parse(localStorage.getItem(`comments_${currentMovie.id}`)) || [];
        comments.push(input.value);
        localStorage.setItem(`comments_${currentMovie.id}`, JSON.stringify(comments));
        input.value = "";
        renderComments(currentMovie.id);
    }
});

// Inicial
renderMovies(movies);
