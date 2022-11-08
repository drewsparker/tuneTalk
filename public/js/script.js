

const searchHandler = async (event) => {
    event.preventDefault();
  
    const searchName = document.querySelector('#search').value;

    // if (searchName) {
    //     const response = await fetch(`/search`, {
    //       method: 'POST',
    //       body: JSON.stringify({searchName}),
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     if (response.ok) {
    //       document.location.replace('/home-route');
    //     } else {
    //       alert('Failed to create project');
    //     }
    //   }

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key':'e9d115ede6msh9a9b8592434a878p12c4dejsnde0b73ead6fc' ,
            'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
        }
    };
 

    fetch(`https://spotify23.p.rapidapi.com/search/?q=${searchName}&type=artists&offset=0&limit=10&numberOfTopResults=5`, options)
	.then(response => response.json())
	.then(response => {
        console.log(response);
        // fs.writeFile('artist.json', stringify(response), (err) =>
        // err ? console.error(err) : console.log('Commit logged!'));
        // res.json(response);
    })


};




  document
  .querySelector('#search-btn')
  .addEventListener('click', searchHandler);
  