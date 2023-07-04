function updateTodo() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value
    const id = document.getElementById('deletereq').value
    const option = {
        method: 'PUT',
        body: JSON.stringify({
            title: title,
            description: description
        }),
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    }
    fetch(`http://localhost:3000/todos/${id}`, option)
}