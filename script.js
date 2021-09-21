let allTasks = [];   

let valueInput = '';                                

let input = null;

window.onload = async function init(){
    input = document.getElementById('inp');
    input.addEventListener('change', app);
    const resp = await fetch('http://localhost:8000/allTasks',{
        method: 'GET'
    });
    let result = await resp.json();
    allTasks = result.data;
    render();  
}

const app = (event) =>{                                     
    valueInput = event.target.value;
    onClickButton();
}


const onClickButton = async () =>{                             

    if (valueInput!==''){                                     
        allTasks.push({
            text: valueInput,                                   
            inCheck: false                                       
        });
        const resp = await fetch('http://localhost:8000/createTask',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-allow-Origin':'*'
        },
        body: JSON.stringify({
            text: valueInput,
            isCheck: false
        })
        });
        let result = await resp.json();
        allTasks = result.data;

        valueInput = '';                                       
        input.value = '';                                       
        render();                                              
    }
    
}


const render = () =>{                                        

    const content = document.getElementById('content-page');    

    while (content.firstChild) {                               
        content.removeChild(content.firstChild);              
    }
    
    allTasks.map((item,index)=>{
        let container = document.createElement('div')          
        container.id = `task-${index}`;                       
        container.className = 'task-container';
        let checkbox = document.createElement('input')         
        checkbox.type = 'checkbox';    
        checkbox.checked = item.isCheck;                        
        checkbox.onchange = () => onChangeCheckbox(index,item);     
        container.appendChild(checkbox);                       
        let text = document.createElement('p');                
        text.innerText = item.text;                            
        text.className = item.isCheck ? 'check-true' : 'check-false';
        container.appendChild(text);                           
        const imageEdit = document.createElement('img');       
        imageEdit.src = 'edit.svg';                            
        const imageDelete = document.createElement('img');      
        imageDelete.src = 'delete.svg';                         
        container.appendChild(imageEdit);                       
        container.appendChild(imageDelete);                     
        imageDelete.onclick = () => deleteElement(item.id);       
        imageEdit.onclick = () => editElement(text,container,item.text,imageEdit,index,item);
        content.appendChild(container);                        
    })
}

const onChangeCheckbox = async (index,item) =>{       
    console.log(index)
    console.log(item.isCheck)
    const resp = await fetch('http://localhost:8000/updateTask',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-allow-Origin':'*'
        },
        body: JSON.stringify({
            id: item.id,
            text: item.text,
            isCheck: !item.isCheck
        })
    });
        let result = await resp.json();
        allTasks = result.data;
    render();                        

}
const deleteElement = async(id) =>{                                                                                     
    const resp = await fetch(`http://localhost:8000/deleteTask?id=${id}`,{
        method: 'DELETE'
    });
    const result = await resp.json();
    allTasks = result.data;
     
    render();                                                  

}

const editElement = (text,container,itemText,imageEdit,index,item) =>{                                                      
    const newTag =  document.createElement('input');           
    newTag.value = itemText;                                   
    container.replaceChild(newTag, text );                      
    const editImg =  document.createElement('img');           
    editImg.src = 'ok.svg';                                    
    container.replaceChild(editImg, imageEdit );               
    editImg.onclick = () => editElementSave(index,newTag,item);      

}

const editElementSave = async(index,newTag,item) =>{   
    console.log(item.id)
    const resp = await fetch('http://localhost:8000/updateTask',{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Access-Control-allow-Origin':'*'
        },
        body: JSON.stringify({
            id: item.id,
            text: newTag.value,
            isCheck: false
        })
        });
        let result = await resp.json();
        allTasks = result.data;
    allTasks[index].text = newTag.value;
    render();

}

render();
