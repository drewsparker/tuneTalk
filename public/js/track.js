var track_card = document.querySelector('.track-container');

track_card.addEventListener('click', async (event) => {
    event.preventDefault();
    var element = event.target;
    if (element.matches(".comment-btn") === true) {
        const text = event.target.previousElementSibling.value.trim();
        console.log(text);
        var track_id = element.getAttribute("data-id");
        console.log(track_id);
        if (track_id && text) {
            console.log("fetch");
            const response = await fetch(`/api/comments`, {
                method: 'POST',
                body: JSON.stringify({ text, track_id }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            console.log(response);

            if (response.ok) {
               //document.location.replace('/profile');
                location.reload();
            } else {
                alert('Failed to create comment');
            }
        }else{
            console.log("no fetch");
        }
        
    }
    if (element.matches(".like-btn") === true) {
        var track_id = element.getAttribute("data-id");
        console.log(track_id);
        if (track_id) {

            const response = await fetch(`/api/likes/`, {
                method: 'POST',
                body: JSON.stringify({track_id }),
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log(response.ok);
            if (response.ok) {
                document.location.replace('/like');
              } else {
                alert('Failed to create like');
            }

        }
    }




});

