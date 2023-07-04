
function postData() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const option = {
        method: 'POST',
        body: JSON.stringify({
            title: title,
            description: description
            
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }

    }
    fetch('http://localhost:3000/todos', option)
}