var like_card = document.querySelector('.like-container');

console.log("unlike.js");
console.log(like_card);

like_card.addEventListener('click', async (event) => {
    console.log('click');
    
    event.preventDefault();

    var element=event.target;
    console.log(event.target);
    if(element.matches("button")===true){
        var id=element.getAttribute("data-id");
        console.log(id);

        const response = await fetch(`/api/likes/${id}`, {
            method: 'DELETE',
        });
        console.log(response.ok);
        if (response.ok) {
            document.location.replace('/like');
          } else {
            alert('Failed to delete project');
        }
    }
   
    
});


