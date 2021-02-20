$.ajax({
  url: "http://www.omdbapi.com/?i=tt3896198&apikey=dce8c870&s=harry potter",
  success: (results) => {
    const movies = results.Search;
    let cards = "";
    movies.forEach((mov) => {
      cards += `<div class="col-md-4 my-3">
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
    });
    $(".movie-container").html(cards);

    // when detail button clicked
    $(".modal-detail-movie").on("click", function () {
      $.ajax({
        url:
          "http://www.omdbapi.com/?i=" +
          $(this).data("imdbid") +
          "&apikey=dce8c870",
        success: (m) => {
          const movieDetail = `<div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                  <img src="" alt="" class="img-fluid">
                </div>
                <div class="col-md-8">
                  <ul class="list-group">
                      <li class="list-group-item"><h4>${m.Title} - ${m.Year}</h4></li>
                      <li class="list-group-item"><strong>Genre :</strong> isi_genre</li>
                      <li class="list-group-item"><strong>Rating  IMDB : </strong>isi_rating</li>
                      <li class="list-group-item"><strong>Synopsis</strong> : <p>isi_synopsis</p></li>
                      <li class="list-group-item"><strong>Language :</strong> isi_language</li>
                      <li class="list-group-item"><strong>Director :</strong> isi_director</li>
                      <li class="list-group-item"><strong>Actor :</strong> actor</li>
                    </ul>
                </div>
            </div>
        </div>`;
        },
      });
    });
  },
  error: (err) => {
    console.log(err.responseText);
  },
});
