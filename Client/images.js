
async function search() {
    
    let searchTerm = document.forms.searchForm.term.value;
   
    document.forms.searchForm.term.value = '';
    
    let rawData = await fetch('/api/images/' + searchTerm);
    
    let images = await rawData.json();
   
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${images.length} Images.</p>
    `;
    
    for (let image of images) {
      html += `
        <section>
          <h2>${image.name}</h2>
          <img src="images/${image.name}">
          <p>${image.description.Make}<p>
        </section>
      `;
    }
    
    let searchResultsElement = document.querySelector('.searchResults');
    
    searchResultsElement.innerHTML = html;
  }