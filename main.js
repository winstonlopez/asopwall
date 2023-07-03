`use strict`

let wallsOnly = document.getElementById(`walls-only`);
let wallsAddon = document.getElementById(`walls-addon`);

//--------values-----------

let ps = document.getElementById(`ps`);
let dg = document.getElementById(`dg`);
let farDg = document.getElementById(`dg-far`);
let standard = document.getElementById(`standard`);
let small = document.getElementById(`small`);
let cn = document.getElementById(`notes`);

let report = document.getElementById(`report`);

report.addEventListener(`click`, (event)=>{
    if(!event.target.closest(`INPUT`)){return}
    if(wallsOnly.checked){
        console.log(`Walls Only Report`);
    }
    if(wallsAddon.checked){
        console.log(`Walls Add-on Report`);
    }
})

//-----button events-----

let generate = document.getElementById(`generate`);
let reset = document.getElementById(`reset`);
let resultMain = document.getElementById(`result`);
let resultSplit = document.getElementById(`result-split`);

generate.addEventListener(`click`, (event)=>{

    if(wallsOnly.checked){
        allWalls(ps.checked, dg.checked, standard.value, small.value, cn.value);
    }
})


reset.addEventListener(`click`, (event)=>{
    clear();
});

function clear(){
    resultMain.innerHTML = ``;
    
    ps.checked = true;
    dg.checked = true;
    notes.value = 0;
    small.value = 0;

    resultSplit.innerHTML = ``;
}

dg.addEventListener(`click`, (event)=>{
    if(!dg.checked){
        farDg.disabled = true;
        farDg.checked = false;
    }
    if(dg.checked){
        farDg.disabled = false;
    }

})

function allWalls(primary, detached, standard, small, cn){
    //create a list of structures that needs measurements
    //clear screen

    resultMain.innerHTML = '';
    resultSplit.innerHTML = '';

    let structures = document.createElement(`ul`);
    let splitStructures = document.createElement('ul');
    structures.classList.add(`structures`);
    splitStructures.classList.add(`structures`);

    if(cn == `0`){  //--------------------No Customer Notes--------------

        if(!primary){
            structures.innerHTML = `<h2>!Needs FTO Confirmation!</h2>`;
            structures.classList.add(`red`);
            resultMain.append(structures);
            return;
        }
        
            let li = document.createElement(`li`);
            li.innerHTML = `Primary Structure (Roof + Walls)`;
            structures.append(li);
        
        if(detached && farDg.checked == false){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            structures.append(li);
        }
        if(detached && farDg.checked == true){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            splitStructures.append(li);
        }
        if(!detached && +standard > 0){
            if(+standard == 1){
            let li = document.createElement(`li`);
            li.innerHTML = `Standard OB (Roof + Walls)`;
            structures.append(li);
            }else{
                let li = document.createElement(`li`);
                li.innerHTML = `Closest Standard OB (Roof + Walls)`;
                structures.append(li);
            }
        }
        if(!detached && +standard <= 0 && +small > 0){
                if(+small == 1){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Small OB (Roof + Walls)`;
                    structures.append(li);
                }else{
                    let li = document.createElement(`li`);
                    li.innerHTML = `Closest Small OB (Roof + Walls)`;
                    structures.append(li);
                }
        }
    }

    if(cn == `1`){  //--------------not specific PS and Shed/Dg and Shed
        
        if(!primary){
            structures.innerHTML = `<h2>!Needs FTO Confirmation!</h2>`;
            structures.classList.add(`red`);
            resultMain.append(structures);
            return;
        }
        
            let li = document.createElement(`li`);
            li.innerHTML = `Primary Structure (Roof + Walls)`;
            structures.append(li);
        
        if(detached && farDg.checked == false){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            structures.append(li);
        }
        if(detached && farDg.checked == true){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            splitStructures.append(li);
                if(+standard > 0){
                    let li = document.createElement(`li`)
                    li.innerHTML = `Standard Size OB (Roof + Walls)`;
                    structures.append(li);
                }
        }
        if(detached && +standard > 0 && farDg.checked == false){
            let li2 = document.createElement('li');
            li2.innerHTML = `Standard Size OB (Roof + Walls)`;
            splitStructures.append(li2);
        }
        if(!detached && +standard > 0){
            if(+standard == 1){
            let li = document.createElement(`li`);
            li.innerHTML = `Standard OB (Roof + Walls)`;
            structures.append(li);
            }else{
                let li = document.createElement(`li`);
                li.innerHTML = `Closest Standard OB (Roof + Walls)`;
                structures.append(li);
            }
        }
        if(!detached && +standard <= 0 && +small > 0){
                if(+small == 1){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Small OB (Roof + Walls)`;
                    structures.append(li);
                }else{
                    let li = document.createElement(`li`);
                    li.innerHTML = `Closest Small OB (Roof + Walls)`;
                    structures.append(li);
                }
        }

    }

    resultMain.append(structures);
    resultSplit.append(splitStructures);
}

console.log(notes.value);
console.log(!ps);