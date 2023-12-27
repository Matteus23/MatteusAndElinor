
async function search() {

    let searchTerm = document.forms.searchForm.term.value;
   
    let searchType = document.forms.searchForm.searchType.value;
    console.log(searchType);
   
    document.forms.searchForm.term.value = '';
   
    let rawData = await fetch('/api/music/' + searchTerm + '/' + searchType);
    
    let songs = await rawData.json();
   
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${songs.length} Songs.</p>
    `;
    
    for (let song of songs) {
      let meta = song.description.common;
      html += `
        <section>
          <h2>${meta.title}</h2>
          <p><b>Artist:</b> ${meta.artist}</p>
          <p><b>Album:</b> ${meta.album}</p>  
          <p>
            <audio controls src="music/${song.filename}">
          </p>
        </section>
      `;
    }
    s
    let searchResultsElement = document.querySelector('.searchResults');
    
    searchResultsElement.innerHTML = html;
  }