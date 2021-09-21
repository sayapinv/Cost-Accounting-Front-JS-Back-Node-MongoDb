let allTasks = [];

let inputOne = null; 
let inputTwo = null; 



inputOne = document.getElementById('inp_one');
inputTwo = document.getElementById('inp_two');    



onClickButton=()=>{
    if(inputOne.value!=='' && inputTwo.value!==''){
        allTasks.push({
            name: inputOne.value,            
            price: inputTwo.value                            
        });
        inputOne.value = '';                           
        inputTwo.value = '';
        console.log(allTasks)
        render();
    }

}


render = () =>{

    const content = document.getElementById('content-page');
    
    while (content.firstChild) {                                
        content.removeChild(content.firstChild);
    }
    
    allTasks.map((item,index)=>{
        let container = document.createElement('div');
        container.id = `task-${index}`;
        container.className = 'task-container';
    })
}
render();