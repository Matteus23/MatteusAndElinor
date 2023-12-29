
async function search() {
    
    let searchTerm = document.forms.searchForm.term.value;
    let searchType = document.forms.searchForm.searchType.value;
    
    console.log(searchType);
   
   
    document.forms.searchForm.term.value = '';
    
    let rawData = await fetch('/api/images/' + searchTerm + '/' + searchType);
    
    let images = await rawData.json();
   
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${images.length} images.</p>
    `;
    
    for (let image of images) {
      html += `
        <section>
          <h2>${image.name}</h2>
          <img src="images/${image.name}">
          <p>Make: ${image.description.Make} Model: ${image.description.Model}<p>
          <a target="_blank" href="https://maps.google.com/?q=${image.description.latitude},${image.description.longitude}">Show on map</a>
        </section>
      `;
    }
    
    let searchResultsElement = document.querySelector('.searchResults');
    
    searchResultsElement.innerHTML = html;
  }