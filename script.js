function showData() {
    const req = new XMLHttpRequest();
    req.open("GET", "data.json", true);
    req.onload = function () {
        if (req.status === 200) {

            console.log("Loaded");
            const data = JSON.parse(req.responseText);
            console.log(data);
            const tree = createTree(data);
            document.getElementById("tree").appendChild(tree);
        }
    }
    req.send();
}

function createTree(data) {

    const ul = document.createElement("ul");
    ul.className = "toggle";
    ul.addEventListener('click', function (e) {

        if (e.target.tagName === "LABEL") {
            ul.classList.toggle("show");
        }

    })
    for (d of data) {
        console.log(d.label);

        const li = document.createElement("li");
        const input = document.createElement("input");
        input.type = "checkbox";
        const label = document.createElement("label");
        // label.setAttribute("for",d.id);
        label.textContent = d.label;
        input.dataset.id = d.id;
        li.appendChild(input);
        li.appendChild(label);


        input.addEventListener('change', () => {
            const li = input.parentElement;
            let children = li.querySelectorAll('input');
            children.forEach(cb => {
                cb.checked = input.checked;
                cb.indeterminate = false;
            });
            updateParent(input);
            updateChip();

        });


        if (d.children) {
            li.appendChild(createTree(d.children));
        }


        ul.appendChild(li);
    }

    return ul;
}


function updateParent(input) {
    let parentElem = input.parentElement.parentElement.closest("li");
    //base condition
    if (!parentElem) {
        return;
    }
    let parentCheckbox = parentElem.querySelector('input');
    let children = parentElem.querySelectorAll(':scope > ul > li > input');


    let totalCheckbox = children.length;
    let checked = 0;

    children.forEach(cb => {
        if (cb.checked) {
            checked++;
        }
    })

    if (checked === totalCheckbox) {
        parentCheckbox.checked = true;
        parentCheckbox.indeterminate = false;
    }
    else if (checked === 0) {
        parentCheckbox.checked = false;
        parentCheckbox.indeterminate = false;
    }
    else {
        parentCheckbox.checked = false;
        parentCheckbox.indeterminate = true;
    }

    // //flag
    // let allChecked = true;

    // children.forEach(cb => {
    //     if (!cb.checked) allChecked = false;
    // });
    // parentCheckbox.checked = allChecked;

    //recursion 
    updateParent(parentCheckbox);

}




// chip creation
function updateChip() {

    let chipBox = document.getElementById("chips");
    chipBox.innerHTML = "";
    let checked = document.querySelectorAll("input:checked");

    checked.forEach(cb => {
        const li = cb.parentElement;
        if (li.querySelector("ul")) return;
        const name = li.querySelector("label").textContent;
        console.log(name);
        const id = cb.dataset.id;
        const chip = document.createElement("div");
        chip.innerHTML = `
            <div class="chip">${name} <button class="removeBtn" onclick="removeChip('${id}');">&#10006;</button></div>
        `;
        // change chip color on mover over on button
        // let chipClass = chip.querySelector(".chip");
        // let removeBtn = chipClass.querySelector(".removeBtn");
        // removeBtn.onmouseover = function () {
        //     console.log("mouse hover on remove btn");
        //     chipClass.style.background = "red";
        //     chipClass.style.color ="white";
        // }
        chipBox.append(chip);
    });
}



// remove chip
function removeChip(id) {
    console.log("remove called")
    let checked = document.querySelectorAll("input:checked");
    checked.forEach(cb => {
        if (cb.dataset.id == id) {
            console.log("removed chip", id)
            cb.checked = false;
        }
        updateParent(cb);
        updateChip();
    });

}


// const toggle = document.querySelector(".toggle");
// toggle.onclick=function(){
//     toggle.classList.toggle("show");
// }





























// // simple parent child chexkbox
// let parentCheckbox = document.getElementById('option');
// let checkboxes = document.querySelectorAll('input.subOption');
// let checkboxesCount = document.querySelectorAll('input.subOption').length;

// // parent selection
// parentCheckbox.onclick = function () {
//     checkboxes.forEach(cb => {
//         cb.checked = this.checked;
//     });
// }

// //child selection

// checkboxes.forEach(cb => {
//     cb.onclick = function () {
//         let checkedCount = document.querySelectorAll('input.subOption:checked').length;
//         parentCheckbox.checked =  (checkedCount > 0);
//         parentCheckbox.indeterminate = (checkedCount > 0 && checkedCount < checkboxesCount);
//     };
// });

