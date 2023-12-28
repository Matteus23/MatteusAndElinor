
async function search() {

    let searchTerm = document.forms.searchForm.term.value;
   
    let searchType = document.forms.searchForm.searchType.value;
    console.log(searchType);
   
    document.forms.searchForm.term.value = '';
   
    let rawData = await fetch('/api/pdfs/' + searchTerm + '/' + searchType);
    
    let pdfs = await rawData.json();
   
    let html = `
      <p>You searched for "${searchTerm}"...</p>
      <p>Found ${pdf.length} PDF.</p>
    `;
    
    for (let pdf of pdfs) {
      let meta = pdf.description.common;
      html += ` 
        <section>
          <h2>${meta.Title}</h2>
          <p><b>Author:</b>${meta.Author}</p>
          <p><b>Creator:</b>${meta.Creator}</p>
            <a href="pdfs/${pdfs.name}">Download the PDF</a>.
        </section>
      `;
    }
    s
    let searchResultsElement = document.querySelector('.searchResults');
    
    searchResultsElement.innerHTML = html;
  }