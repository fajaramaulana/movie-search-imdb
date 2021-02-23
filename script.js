// const searchButton = document.querySelector(".search-button");
// searchButton.addEventListener("click", function () {
//   const inputKey = document.querySelector(".input-keyword");
//   fetch(
//     `http://www.omdbapi.com/?i=tt3896198&apikey=dce8c870&s=${inputKey.value}`
//   )
//     .then((response) => response.json())
//     .then((response) => {
//       const movies = response.Search;
//       let cards = "";
//       movies.forEach((mov) => {
//         cards += showCard(mov);
//       });
//       const movieContainer = document.querySelector(".movie-container");
//       movieContainer.innerHTML = cards;
//       const modalDetailMovie = document.querySelectorAll(".modal-detail-movie");
//       modalDetailMovie.forEach((btn) => {
//         btn.addEventListener("click", function () {
//           const imdbid = this.dataset.imdbid;
//           fetch(`http://www.omdbapi.com/?i=${imdbid}&apikey=dce8c870`)
//             .then((resp) => resp.json())
//             .then((m) => {
//               const movieDetail = showModal(m);
//               const modalBody = document.querySelector(".modal-body");
//               modalBody.innerHTML = movieDetail;
//             });
//         });
//       });
//     });
// });

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", async function () {
  const inputKeyword = document.querySelector(".input-keyword");
  const movies = await getMovies(inputKeyword.value);
  updateUI(movies);
});

// when detail button clicked
// event binding
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("modal-detail-movie")) {
    const imdbid = e.target.dataset.imdbid;
    const movieDetail = await getMovieDetail(imdbid);
    updateModalDetail(movieDetail);
  }
});

function getMovieDetail(imdbid) {
  return fetch(`http://www.omdbapi.com/?i=${imdbid}&apikey=dce8c870`)
    .then((resp) => resp.json())
    .then((m) => m);
}

function updateModalDetail(m) {
  const movieDetail = showModal(m);
  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = movieDetail;
}

function getMovies(keyword) {
  return fetch(
    `http://www.omdbapi.com/?i=tt3896198&apikey=dce8c870&s=${keyword}`
  )
    .then((response) => response.json())
    .then((response) => response.Search);
}

function updateUI(movies) {
  let cards = "";
  movies.forEach((mov) => {
    cards += showCard(mov);
  });
  const movieContainer = document.querySelector(".movie-container");
  movieContainer.innerHTML = cards;
}

function showCard(mov) {
  return `<div class="col-md-4 my-3">
  <div class="card">
      <img src="${mov.Poster}" class="card-img-top" alt="${mov.Title}"/>
      <div class="card-body">
          <h5 class="card-title">${mov.Title}</h5>
          <h6 class="card-subtitle mb-2 text-muted">${mov.Year}</h6>
          <a href="#" class="btn btn-primary modal-detail-movie" data-toggle="modal"
          data-target="#movieDetailModal" data-imdbid="${mov.imdbID}">Details</a>
      </div>
  </div>
</div>`;
}

function showModal(m) {
  return `<div class="container-fluid">
  <div class="row">
      <div class="col-md-4">
        <img src="${m.Poster}" alt="" class="img-fluid">
      </div>
      <div class="col-md-8">
        <ul class="list-group">
            <li class="list-group-item"><h4>${m.Title} - ${m.Year}</h4></li>
            <li class="list-group-item"><strong>Genre :</strong> ${m.Genre}</li>
            <li class="list-group-item"><strong>Synopsis</strong> : <p>${m.Plot}</p></li>
            <li class="list-group-item"><strong>Language :</strong> ${m.Language}</li>
            <li class="list-group-item"><strong>Director :</strong> ${m.Director}</li>
            <li class="list-group-item"><strong>Actor :</strong> ${m.Actors}</li>
          </ul>
      </div>
  </div>
</div>`;
}
