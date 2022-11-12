var albums_card = document.querySelector('.container');

albums_card.addEventListener('click', async (event) => {
    event.preventDefault();
    var element = event.target;
    if (element.matches("button") === true) {
        var id = element.getAttribute("data-id");
        console.log(id);
    }

    if (id) {
        document.location.replace(`/api/albums/${id}`);

    } else {
        alert('Failed to create project');
    }


});