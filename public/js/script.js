

const searchHandler = async (event) => {
    event.preventDefault();
  
    const searchName = document.querySelector('#search').value;
    // if(searchName){
    //     document.location.replace(`/search/${searchName}`);
    // }
    
    

    if (searchName) {
        const response = await fetch(`/search/${searchName}`, {
          method: 'GET',
        //   body: JSON.stringify({searchName}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
        //   document.location.replace('/home-route');
        console.log(response.ok);
        } else {
          alert('Failed to create project');
        }
      }



};




  document
  .querySelector('#search-btn')
  .addEventListener('click', searchHandler);
  