function del() {
    const id = document.getElementById('delete').value;
    console.log(id)
    const option = {
        method: "DELETE"
    }
    fetch(`http://localhost:3000/todos/${id}`, option)
}