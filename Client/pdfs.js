
async function search() {

    let searchTerm = document.forms.searchForm.term.value;
   
   
    document.forms.searchForm.term.value = '';
   
    let rawData = await fetch('/api/pdfs/' + searchTerm);
    
    let pdfs = await rawData.json();
   
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${pdfs.length} PDF.</p>
    `;
    
    for (let pdf of pdfs) {
      let meta = pdf.description.info;
      html += ` 
        <section>
          <h2>${meta.Title}</h2>
          <p><b>Author: </b>${meta.Author}</p>
          <p><b>Creator: </b>${meta.Creator}</p>
            <a target="_blank" href="pdfs/${pdf.name}">Download the PDF</a>.
        </section>
      `;
    }
    let searchResultsElement = document.querySelector('.searchResults');
    
    searchResultsElement.innerHTML = html;
  }