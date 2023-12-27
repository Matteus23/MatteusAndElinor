async function search() {

    let searchTerm = document.forms.searchForm.term.value;
   
    let searchType = document.forms.searchForm.searchType.value;
    console.log(searchType);
   
    document.forms.searchForm.term.value = '';
   
    let rawData = await fetch('/api/ppts/' + searchTerm + '/' + searchType);
    
    let ppts = await rawData.json();
   
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${ppts.length} Powerpoints.</p>
    `;
    
    for (let ppt of ppts) {
      let meta = ppts.description.common;
      html += ` 
        <section>
          <h2>${ppts.name}</h2>
          <img src="Powerpoints/${meta.image}">
          <p><b>Title:</b>${meta.title}</p>
          <p><b>Company:</b>${meta.company}</p>
          <p>${meta.description}</p>
          <p>
          <a href="Powerpoints/${ppts.name}">Download the Powerpoint<a/>.
          <p>
        
            
        </section>
      `;
    }
    s
    let searchResultsElement = document.querySelector('.searchResults');
    
    searchResultsElement.innerHTML = html;
  }