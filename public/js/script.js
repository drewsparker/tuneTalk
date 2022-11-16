

const searchHandler = async (event) => {
    event.preventDefault();
  
    const searchName = document.querySelector('#search').value;
    alert(searchName);
    
    if(searchName){
      document.location.replace(`/search/${searchName}`);
    }
   

    // if (searchName) {
    //     const response = await fetch(`/search/${searchName}`, {
    //       method: 'GET',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
    //     if (response.ok) {
    //     console.log(response.ok);
    //     } else {
    //       alert('Failed to create project');
    //     }
    //   }
    



};




  document
  .querySelector('#search-btn')
  .addEventListener('click', searchHandler);
  