// declare variables to work with
const myInput = document.querySelector('#myInput');
const feedback = document.querySelector('.feedback');
const myForm = document.querySelector('#my-form');
const clear = document.querySelector('#clear');
const itemList = document.querySelector('.item-list');

// create an array to contain the todo items
let todos = [];

//function to monitor the click items
const handleClick = function(inputItem){
    const items = itemList.querySelectorAll('.item');
    items.forEach(item=>{
        if(item.querySelector('.item-name').textContent === inputItem){
            //if one clicks on the completed item icon, perform action on the inputItem
            item.querySelector('.complete-item').addEventListener('click',function(){
                item.querySelector('.item-name').classList.toggle('achieved');
            })
            //if one clicks on the edit icon
            item.querySelector('.edit-item').addEventListener('click',function(){
              myInput.value = inputItem;
              itemList.removeChild(item);
              todos = todos.filter(item =>{
                  return item !== inputItem;
              })
            })
            //if one clicks on delete icon
            item.querySelector('.delete-item').addEventListener('click',function(){
                itemList.removeChild(item);
                todos = todos.filter(item =>{
                    return item !== inputItem;
                })
            })
        }
    })
}
//remove item function
const removeItem = function(item){
    const itemIndex = (todos.indexOf(item));
    todos.splice(itemIndex,1);
}

// get the list of items

const getItemList = function(item){
    //remove the created sample list and insert the inputed item
    itemList.innerHTML = "";
    item.forEach(item=>{
        itemList.insertAdjacentHTML('beforeend',`<div class= "item">
        <h4 class="item-name text-capitalize">${item}</h4>
        <div class="item-icons">
            <a href="#" class="complete-item mr-3"><i class="fa fa-check-circle" aria-hidden="true"></i></a>
            <a href="#" class="edit-item mr-3"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></a>
            <a href="#" class="delete-item"><i class="fa fa-trash" aria-hidden="true"></i></a>
        </div>
    </div>`)
    //call the monitor click function and pass the real item
    handleClick(item);
    })
}

//set and get the local storage
const getLocalStorage = function(){
    const itemStored = localStorage.getItem('todos');
    //check if nothing has been stored
    if(itemStored === 'undefined' || itemStored === null){
        todos = [];
    }else{
        todos = JSON.parse(itemStored);
        getItemList(todos);
    }
}

const setLocalStorage = function(todos){
    localStorage.setItem('todos',JSON.stringify(todos));
}
getLocalStorage();

//listen to what is been inputed and added

myForm.addEventListener('submit', function(e){
    e.preventDefault();
    const inputItem = myInput.value;
    //if nothing is inputed
    if(inputItem.length === 0){
       feedback.innerHTML = "Enter a valid input";
       feedback.classList.add('show','alert-danger');
       setTimeout(function(){
           feedback.classList.remove('show');
       },3000)
    }else{
        todos.push(inputItem);
        setLocalStorage(todos)
        getItemList(todos);
    }
    //clear the input field to add more
    myInput.value = "";
})
// when one clicks on the clear button
clear.addEventListener('click', function(){
    todos = [];
    localStorage.clear();
    getItemList(todos);
})