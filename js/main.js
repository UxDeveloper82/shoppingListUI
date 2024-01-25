let currentList = {};

let shoppingListName = document.getElementById("shoppingListName");
let shoppingListTitle = document.getElementById("shoppingListTitle");
let shoppingListItems = document.getElementById("shoppingListItems");
let createListDiv =  document.getElementById("createListDiv");
let shoppingListDiv = document.getElementById("shoppingListDiv");
let newItemName = document.getElementById("newItemName");

const createShoppingList = () => {
    currentList.name = shoppingListName.value;
    console.log(shoppingListName.value);
    currentList.items = [];

    // Web Service Call
    showShoppingList();
};

const showShoppingList = () => {
    shoppingListTitle.innerHTML = currentList.name;
    shoppingListItems.innerHTML = "";

    createListDiv.style.display = "none";
    shoppingListDiv.style.display = "block";
    newItemName.focus();

    newItemName.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            addItem();
        }
    });
};

const addItem = () => {
     if(newItemName.value === '') {
        alert('Input something in the box')
     }
     else {
        const newItem = {
            name: newItemName.value,
        };
        currentList.items.push(newItem);
        console.info(currentList);
    
        drawItems();
        newItemName.value = "";
     }
};

const drawItems = () => {
    const $list = shoppingListItems;
    $list.innerHTML = "";

    currentList.items.forEach((currentItem, i) => {
        const $li = document.createElement("li");
        $li.innerHTML = currentItem.name;
        $li.id = "item_" + i;

        const $deleteBtn = document.createElement("span");
        $deleteBtn.innerHTML = "\u00d7";
        $deleteBtn.addEventListener("click", () => deleteItem(i));
        $li.appendChild($deleteBtn);
      
        $li.addEventListener("click", () => checkItem(i));
        
        $list.appendChild($li);
    });
};

const deleteItem = (index) => {
    currentList.items.splice(index, 1);
    drawItems();
};

const checkItem = (index) => {
    document.getElementById("item_" + index).classList.toggle("checked");
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("Ready");
    shoppingListItems.focus();
    shoppingListName.addEventListener("keyup", (event) => {
        if (event.keyCode === 13) {
            createShoppingList();
        }
    });

    const pageUrl = window.location.href;
    const idIndex = pageUrl.indexOf("?id=");
    if (idIndex !== -1) {
        getShoppingListById(pageUrl.substring(idIndex + 4));
    }
});
