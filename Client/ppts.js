async function search() {

    let searchTerm = document.forms.searchForm.term.value;
   
    document.forms.searchForm.term.value = '';
   
    let rawData = await fetch('/api/ppts/' + searchTerm);
    
    let ppts = await rawData.json();
   
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${ppts.length} powerpoints.</p>
    `;
    
    for (let ppt of ppts) {
      let meta = ppt.description;
      html += ` 
        <section>
          <h2>${meta.title}</h2>
          <p><b>Title: </b>${meta.title}</p>
          <p><b>Company: </b>${meta.company}</p>
          <p><b>Number of slides: <b>${meta.slide_count}</p>
          <p>
          <a target="_blank" href="ppts/${ppt.name}">Download the Powerpoint<a/>.
          <p>
        
            
        </section>
      `;
    }
    
    let searchResultsElement = document.querySelector('.searchResults');
    
    searchResultsElement.innerHTML = html;
  }