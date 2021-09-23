let allTasks = [];

let inputOne = null; 
let inputTwo = null; 

let summ = 0;

inputOne = document.getElementById('inp_one');
inputTwo = document.getElementById('inp_two');    

onClickButton=()=>{

    if(inputOne.value!=='' && inputTwo.value!==''){

        if(document.getElementById('warn')){

            let child = document.getElementById('warn');
    
            while (child.firstChild) {                                
                child.removeChild(child.firstChild);
            }

        }

        allTasks.push({
            name: inputOne.value,            
            price: inputTwo.value                            
        });

        inputOne.value = '';                           
        inputTwo.value = '';

        summ = 0;

        allTasks.forEach(index=>{
            summ +=Number(index.price)
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



function formatDate(date) {

    let dd = date.getDate();
    if (dd < 10) dd = '0' + dd;
  
    let mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;
  
    let yy = date.getFullYear();
  
    return dd + '.' + mm + '.' + yy;
}
  
let d = new Date(); 

let actualDate = formatDate(d);//здесь лежит готовая дата


const render = () =>{

    const content = document.getElementById('content-page');
    
    while (content.firstChild) {                                
        content.removeChild(content.firstChild);
    }
    
    allTasks.map((item,index)=>{
        let container = document.createElement('div');
        container.id = `task-${index}`;
        container.className = 'task-container';
        let textName = document.createElement('p')
        content.appendChild(container)
        let number = index+1+") ";
        textName.innerText = number+item.name+' '+actualDate;
        container.appendChild(textName);
        let textPrice = document.createElement('p')
        content.appendChild(container)
        textPrice.innerText = item.price+' p.';
        container.appendChild(textPrice);
        const imageEdit = document.createElement('img');
        imageEdit.src = 'edit.svg';
        const imageDelete = document.createElement('img');
        imageDelete.src = 'delete.svg';
        container.appendChild(imageEdit);
        container.appendChild(imageDelete);
        const contentTotal = document.getElementById('totalid')
        contentTotal.innerText = 'Итого: '+summ+' р.'
        imageDelete.onclick = () => deleteElement(index)
        imageEdit.onclick = () => editElement(textName,textPrice,container,item.name,item.price,imageEdit,index)
    })
    
}

const deleteElement = (index) =>{                                                                                        //функция удаления элемента из массива по индексу элемента

    allTasks.splice(index,1);//удалем 1 элемент с выбранным индексом

    summ = 0;
    allTasks.forEach(index=>{
        summ +=Number(index.price)
    })

    const contentTotal = document.getElementById('totalid')
    contentTotal.innerText = '';

    
    render();

}

const editElement = (textName,textPrice,container,itemName,itemPrice,imageEdit,index) =>{
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

    editImg.onclick = () => editElementSave(index,newName,newPrice);//передаем параметры индекс элемента который мы хотим сохранить и нашновосозданный инпут

}

const editElementSave = (index,newName,newPrice) =>{
    

    if(newName.value!=='' && newPrice.value!==''){

        if(document.getElementById('warn')){

            let child = document.getElementById('warn');
    
            while (child.firstChild) {                                
                child.removeChild(child.firstChild);
            }

        }

        

        allTasks[index].name = newName.value;
        allTasks[index].price = newPrice.value;

        summ = 0;
        allTasks.forEach(index=>{
        summ +=Number(index.price)
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



