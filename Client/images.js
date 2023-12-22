
async function search() {
    
    let searchTerm = document.forms.searchForm.term.value;
   
    let searchType = document.forms.searchForm.searchType.value;
    console.log(searchType);
    
    document.forms.searchForm.term.value = '';
    
    let rawData = await fetch('/api/images/' + searchTerm + '/' + searchType);
    
    let images = await rawData.json();
   
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${songs.length} Images.</p>
    `;
    
    for (let image of images) {
      html += `
        <section>
          <h2>${image.name}</h2>
          <img src="images/${image.meta.image}">
          <p>${image.meta.description}<p>
        </section>
      `;
    }
    
    let searchResultsElement = document.querySelector('.searchResults');
    
    searchResultsElement.innerHTML = html;
  }