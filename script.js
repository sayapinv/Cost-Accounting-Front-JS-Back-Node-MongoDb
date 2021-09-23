let allTasks = [];

let inputOne = null; 
let inputTwo = null; 

let summ = 0;

window.onload = async function init(){
    inputOne = document.getElementById('inp_one');
    inputTwo = document.getElementById('inp_two');
    const resp = await fetch('http://localhost:8000/allTasks',{
        method: 'GET'
    });
    let result = await resp.json();

    allTasks = result.data;

    summ = allTasks
        .map(item => (Number(item.price)))
        .reduce((sum, item) => (sum += item), 0);
    
    render();    
}
  

const onClickButton = async () =>{

    if(inputOne.value!=='' && inputTwo.value!==''){

        if(document.getElementById('warn')){

            let child = document.getElementById('warn');
    
            while (child.firstChild) {                                
                child.removeChild(child.firstChild);
            }

        }

        const resp = await fetch('http://localhost:8000/createTask',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-allow-Origin':'*'
        },
        body: JSON.stringify({
            text: inputOne.value,
            price: inputTwo.value
        })
        });

        const result = await resp.json();

        allTasks = result.data;
        console.log('result', result)

        inputOne.value = '';                           
        inputTwo.value = '';

        summ = allTasks
            .map(item => (Number(item.price)))
            .reduce((sum, item) => (sum += item), 0);
        
        render();
    } else {

        if (!document.getElementById('error')) {
            const content = document.getElementById('warn');
            let textName = document.createElement('p')
            textName.id = 'error'
            content.appendChild(textName)
            textName.innerText = 'Заполните все поля!'
        }

    }

}



const formatDate = (date) => {
    const newDate = new Date(date);

    let dd = newDate.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = newDate.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = newDate.getFullYear();
  
    return dd + '.' + mm + '.' + yy;
}

const render = () =>{

    const content = document.getElementById('content-page');
    
    while (content.firstChild) {                                
        content.removeChild(content.firstChild);
    }
    console.log('allTask', allTasks)
    allTasks.map((item, index) => {
        const container = document.createElement('div');
        container.id = `task-${index}`;
        container.className = 'task-container';
        const textName = document.createElement('p');
        content.appendChild(container);
        const newDate = formatDate(item.date);
        textName.innerText = `${index + 1}) ${item.text} ${newDate}`;
        container.appendChild(textName);
        let textPrice = document.createElement('p')
        content.appendChild(container)
        textPrice.innerText = `${item.price} p.`;
        container.appendChild(textPrice);
        const imageEdit = document.createElement('img');
        imageEdit.src = 'edit.svg';
        const imageDelete = document.createElement('img');
        imageDelete.src = 'delete.svg';
        container.appendChild(imageEdit);
        container.appendChild(imageDelete);
        const contentTotal = document.getElementById('totalid')
        contentTotal.innerText = `Итого: ${summ} р.`;
        imageDelete.onclick = () => deleteElement(item._id, index)
        imageEdit.onclick = () => editElement(textName, textPrice, container, item, imageEdit, index)
    })
    
}

const deleteElement = async (id,index) =>{                                                                                        //функция удаления элемента из массива по индексу элемента
    console.log(id)
    const resp = await fetch(`http://localhost:8000/deleteTask?id=${id}`,{
        method: 'DELETE'
    });
    const result = await resp.json();

    allTasks = result.data;

    summ = 0;

    allTasks.forEach(index=>{
        summ +=Number(index.price)
    })

    const contentTotal = document.getElementById('totalid')
    contentTotal.innerText = '';

    
    render();

}

const editElement = (textName, textPrice, container, itemName, item, index) =>{
    // textName // <p>1) hello 22.09.2021</p>
    // textPrice // <p>1 p.</p>
    // container // <div id="task-0" class="task-container"><p>1) hello 22.09.2021</p><p>1 p.</p><img src="edit.svg"><img src="delete.svg"></div>
    // itemName //  hello
    // itemPrice // 1
    // imageEdit // <img src="edit.svg">
    // index // 0

    const newName =  document.createElement('input');
    const newPrice =  document.createElement('input');

    newPrice.type = "number";

    newName.value = itemName;
    newPrice.value = itemPrice;

    container.replaceChild(newName, textName );//заменяем наши теги
    container.replaceChild(newPrice, textPrice );

    const editImg =  document.createElement('img');//новая картинка
    editImg.src = 'ok.svg';//атрибут
    container.replaceChild(editImg, imageEdit );//заменяем наши картинки на время редактирования

    editImg.onclick = () => editElementSave(index,newName,newPrice,item);//передаем параметры индекс элемента который мы хотим сохранить и нашновосозданный инпут

}

const editElementSave = async (index,newName,newPrice) =>{
    

    if(newName.value!=='' && newPrice.value!==''){

        if(document.getElementById('warn')){

            let child = document.getElementById('warn');
    
            while (child.firstChild) {                                
                child.removeChild(child.firstChild);
            }

        }

        const resp = await fetch('http://localhost:8000/updateTask',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-allow-Origin':'*'
        },
        body: JSON.stringify({
            id: item.id,
            text1: newName,
            text2: newPrice
        })
        });
        let result = await resp.json();
        allTasks = result.data;

        allTasks[index].name = newName.value;
        allTasks[index].price = newPrice.value;

        summ = 0;
        allTasks.forEach(index=>{
        summ +=Number(index.text2)
        })

        render();

    }else{

        if(!document.getElementById('error')){
            const content = document.getElementById('warn');
            let textName = document.createElement('p')
            textName.id = 'error'
            content.appendChild(textName)
            textName.innerText = 'Заполните все поля!'
        }

    }
    
    
}





