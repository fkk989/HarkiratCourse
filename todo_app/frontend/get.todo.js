
const createTodo = (data) => {
    const mainBody = document.getElementById('mainBody')
    let count
    if (data.length !== 0) {
        const todoNode = document.querySelectorAll('.todoElem')
        const todo = document.querySelectorAll('.todoElem')
         count = todo.length;
         console.log(count);
         for(i=0; i<count ; i++){
            todoNode[i].remove()
         }

    }
    for (let i = 0; i < data.length; i++) {
        const html = `
       Title
       <div>${data[i].title}</div><br/>
       description
       <div>${data[i].description}</div><br/>
       <button class="delete" onclick="del()" value="${data[i].id}">delete todo</button>
      `
        const todobody = document.createElement('div')
        todobody.setAttribute('class', 'todoElem')
        todobody.innerHTML = html;
        mainBody.appendChild(todobody)
    };
}

function callback(res) {
    res.json().then(createTodo)
}

function fetchData() {
    fetch('http://localhost:3000/todos', {
        method: 'GET'
    }).then(callback)
}

setInterval(fetchData,2000)

