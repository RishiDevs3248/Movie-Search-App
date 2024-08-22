async function getData() {
    let input = document.getElementById('name1').value;
    let API_KEY = `Paste your api key`;
    const url = `http://www.omdbapi.com/?i=tt3896198&t=${input}&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();
        console.log(json);

        const movieInfoDiv = document.getElementById('movie-info');
        const movieInfo2Div = document.getElementById('movie-info2');

        movieInfoDiv.innerHTML = '';
        movieInfo2Div.innerHTML = '';

        if (json.Poster) {
            const posterImg = document.createElement('img');
            posterImg.src = json.Poster;
            posterImg.alt = `${json.Title} Poster`;
            movieInfoDiv.appendChild(posterImg);
        }

        if (json.Title) {
            const title = document.createElement('h2');
            title.textContent = json.Title;
            movieInfo2Div.appendChild(title);
        }

        const year = document.createElement('p');
        year.textContent = `Year: ${json.Year}`;
        movieInfo2Div.appendChild(year);

        const existingButton = document.getElementById('myButton');
        if (existingButton) {
            existingButton.remove();
        }

        const button = document.createElement('button');
        button.textContent = 'More info';
        button.id = 'myButton';
        button.className = 'btn-class';
        movieInfo2Div.appendChild(button);

        button.addEventListener('click', function () {
            const existingMoreInfoDiv = document.getElementById('more-info');
            if (existingMoreInfoDiv) {
                existingMoreInfoDiv.remove();
                return;
            }

            const moreInfoDiv = document.createElement('div');
            moreInfoDiv.id = 'more-info';
            moreInfoDiv.innerHTML = `
                <p><strong>Plot:</strong> ${json.Plot}</p>
                <p><strong>Genre:</strong> ${json.Genre}</p>
                <p><strong>Director:</strong> ${json.Director}</p>
                <p><strong>Actors:</strong> ${json.Actors}</p>
                <p><strong>IMDb Rating:</strong> ${json.imdbRating}</p>
                <p><strong>Runtime:</strong> ${json.Runtime}</p>
            `;
            movieInfo2Div.appendChild(moreInfoDiv);
        });

    } catch (error) {
        console.error(error.message);
    }
}
