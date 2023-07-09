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
    let type = event.target.closest(`DIV`);
    if(wallsOnly.checked){
        //remove all highlights
        let highlights = document.querySelectorAll(`.highlight`);
        for(let elem of highlights){
            elem.classList.remove(`highlight`);
        }
        type.classList.add(`highlight`);
    }
    if(wallsAddon.checked){
        let highlights = document.querySelectorAll(`.highlight`);
        for(let elem of highlights){
            elem.classList.remove(`highlight`);
        }
        type.classList.add(`highlight`);
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
    }else if(wallsAddon.checked){
        addOn(ps.checked, dg.checked, standard.value, small.value, cn.value);
    }
})


reset.addEventListener(`click`, (event)=>{
    clear();
});

function clear(){
    resultMain.innerHTML = ``;
    resultSplit.innerHTML = ``;

    ps.checked = true;
    dg.checked = true;
    farDg.checked = false;
    standard.value = 0;
    notes.value = 0;
    small.value = 0;
    
    
    
}

dg.addEventListener(`click`, (event)=>{     //disable far dg when there is no dg
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

    if(cn == `2`){   //------------specific PS and Shed Only

            if(!primary){
                structures.innerHTML = `<h2>!Needs FTO Confirmation!</h2>`;
                structures.classList.add(`red`);
                resultMain.append(structures);
                return;
            }
            
                let li = document.createElement(`li`);
                li.innerHTML = `Primary Structure (Roof + Walls)`;
                structures.append(li);
            
            
            
            if(+standard > 0){
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
            if(+standard <= 0 && +small > 0){
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

    if(cn == `3`){  // ------------- specific DG and Shed Only---------
        if(detached && +standard <= 0){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            structures.append(li);
        }
        if(detached && farDg.checked == false && +standard >= 1){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            structures.append(li);
            let li2 = document.createElement(`li`);
            li2.innerHTML = `Standard OB (Roof + Walls)`;
            structures.append(li2);
            }
        if(detached && farDg.checked == true && +standard >= 1){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            structures.append(li);
            let li2 = document.createElement(`li`);
            li2.innerHTML = `Standard OB (Roof + Walls)`;
            splitStructures.append(li2);
        }
        if(!detached && +standard <= 0 && +small >= 1){
            if(+small == 1){
            let li = document.createElement(`li`);
            li.innerHTML = `Small OB (Roof + Walls)`;
            structures.append(li);
            }else{
                let li = document.createElement(`li`);
                li.innerHTML = `Closest Small OB (Roof + Walls)`;
                structures.append(li);
                let li2 = document.createElement(`li`)
                li2.innerHTML = `+1 Small OB (Roof + Walls)`;
                structures.append(li2);
            }
        }
        if(!detached && + standard >= 1){
            let bigOb = +standard;
            for(let i = 1; i <= 2; i++){
                if(bigOb >= 1){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Standard Ob (Roof + Walls)`;
                    structures.append(li);
                    bigOb--;
                }
            }
        }
        if(!detached && +standard == 1 && +small >= 1){
            
                let li = document.createElement(`li`);
                li.innerHTML = `Standard OB (Roof + Walls)`;
                structures.append(li);
                let li2 = document.createElement(`li`)
                li2.innerHTML = `Small OB (Roof + Walls)`;
                structures.append(li2);
            }
            if(!detached && +standard > 1 && +small >= 1){
            
                let li = document.createElement(`li`);
                li.innerHTML = `Standard OB (Roof + Walls)`;
                structures.append(li);
                let li2 = document.createElement(`li`)
                li2.innerHTML = `+1 Standard OB (Roof + Walls)`;
                structures.append(li2);
            }
        

    }

    if(cn == `4`){   //-------------All Structures-------

        let obs = +small + +standard;

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

            let counter = 1;

            for(let i = 1; obs > 0; i++){
                let report = document.createElement(`h3`);
                report.innerHTML = `Split report #${i}`;
                splitStructures.append(report);
                
                for(let i = 1; i <= 2 && obs > 0; obs--){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Outbuilding ${counter} (Roof + Walls)`;
                    splitStructures.append(li);
                    i++;
                    counter++;
                }
            }

        }
        if(detached && farDg.checked == true ){
            let li = document.createElement(`li`);
            li.innerHTML = `Closest OutBuilding (Roof + Walls)`;
            structures.append(li);

            
            let dg = 1;

            for(let i = 1; obs > 0; i++){
                let report = document.createElement(`h3`);
                report.innerHTML = `Split report #${i}`;
                splitStructures.append(report);
                
                for(let i = 1; i <= 2 && obs > 0; obs--){
                    if(dg >= 1){
                        let li = document.createElement(`li`);
                        li.innerHTML = `Detached Garage (Roof + Walls)`;
                        splitStructures.append(li);
                        dg--;
                        i++;
                    }
                    let li = document.createElement(`li`);
                    li.innerHTML = `Outbuilding (Roof + Walls)`;
                    splitStructures.append(li);
                    i++;
                    
                }
            }
        }



        
        if(!detached && +obs > 0){
               let li = document.createElement(`li`);
               li.innerHTML = `Closest Outbuilding (Roof + Walls)`;
               structures.append(li);
               obs--;
               console.log(`this triggers`);

               let counter = 1;

               for(let i = 1; obs > 0; i++){
                let report = document.createElement(`h3`);
                report.innerHTML = `Split report #${i}`;
                splitStructures.append(report);
                
                for(let i = 1; i <= 2 && obs > 0; obs--){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Outbuilding ${counter + 1} (Roof + Walls)`;
                    splitStructures.append(li);
                    i++;
                    counter++;
                }
            }
        }
    }

    resultMain.append(structures);
    resultSplit.append(splitStructures);
}

function addOn(primary, detached, standard, small, cn){

    resultMain.innerHTML = '';
    resultSplit.innerHTML = '';

    let structures = document.createElement(`ul`);
    let splitStructures = document.createElement('ul');
    structures.classList.add(`structures`);
    splitStructures.classList.add(`structures`);

    let obs = +standard + +small;

    

    if(cn == `0`){  //---------No Customer Notes--------------------

        if(!primary){
            structures.innerHTML = `<h2>!Needs FTO Confirmation!</h2>`;
            structures.classList.add(`red`);
            resultMain.append(structures);
            return;
        }
        
            let li = document.createElement(`li`);
            li.innerHTML = `Primary Structure (Roof + Walls)`;
            structures.append(li);

            if(detached && obs <= 0 && farDg.checked == false){
                let li = document.createElement(`li`);
                li.innerHTML = `Detached Garage (Roof + Walls)`;
                structures.append(li);
            }

            if(detached && obs >= 1 && farDg.checked == false){
                let li = document.createElement(`li`);
                li.innerHTML = `Detached Garage (Roof + Walls)`;
                structures.append(li);

                //--------for obs----
                for(let i = 1; i <= obs; i++){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Outbuilding #${i} (Roof Only)`;
                    splitStructures.append(li);
                }
            }

            if(farDg.checked == true && obs <= 0){
                let garage = document.createElement(`li`);
                garage.innerHTML = `Detached Garage (Roof + Walls)`;
                splitStructures.append(garage);
            }

            if(detached && obs >= 1 && farDg.checked == true){
                let li = document.createElement(`li`);
                li.innerHTML = `Closest Outbuilding (Roof Only)`;
                structures.append(li);
                obs--;

                let farGarage = 1;

                
                let counter = 1;

                for(let i = 1; i <= obs; i++){
                    
                    
                    let report = document.createElement('h3');
                    report.innerHTML = `Split Report:`;
                    splitStructures.append(report);
                    if(farGarage > 0){
                        let garage = document.createElement(`li`);
                        garage.innerHTML = `Detached Garage (Roof + Walls)`;
                        splitStructures.append(garage);
                        farGarage--;
                        let li = document.createElement(`li`);
                        li.innerHTML = `Outbuilding #${counter + 1} (Roof Only)`;
                        splitStructures.append(li);
                        obs--;
                        counter++;
                    }
                    if(farGarage == 0 && obs > 0){
                    let report = document.createElement('h3');
                    report.innerHTML = `Split Report:`;
                    splitStructures.append(report);
                    //for remaining obs, roof only
                    for(let j = 1; j <= obs; j){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Outbuilding #${counter + 1} (Roof Only)`;
                    splitStructures.append(li);
                    counter++;
                    obs--;
                    }
                }
                    
                }
            }
        
        
    }
    if(cn == `1`){  //---------PS and shed/DG and Shed, not specific

        if(!primary){
            structures.innerHTML = `<h2>!Needs FTO Confirmation!</h2>`;
            structures.classList.add(`red`);
            resultMain.append(structures);
            return;
        }
        
        if(detached && farDg.checked == false){
            let li = document.createElement(`li`);
            li.innerHTML = `Primary Structure (Roof + Walls)`;
            structures.append(li);
            let li2 = document.createElement(`li`);
            li2.innerHTML = `Detached Garage (Roof + Walls)`;
            structures.append(li2);
                //for obs
            if(+standard > 0){
                let li = document.createElement(`li`);
                li.innerHTML = `Standard OB (Roof + Walls)`;
                splitStructures.append(li);
                obs--;
                let li2 = document.createElement(`li`);
                    li2.innerHTML = `Outbuilding (Roof Only)`;
                    splitStructures.append(li2);
                    obs--;
            }
                
                if(obs > 0){
                    let others = document.createElement(`h3`);
                    others.innerHTML = `<hr />*Split Remaining OutBuildings (Roof Only)`;
                    splitStructures.append(others);
                }
            


        }

        if(detached && farDg.checked == true){
            let li = document.createElement(`li`);
            li.innerHTML = `Primary Structure (Roof + Wall)`;
            structures.append(li);
            if(obs <= 1){
                let splitDg = document.createElement(`li`);
                    splitDg.innerHTML = `Detached Garage (Roof + Walls)`;
                    splitStructures.append(splitDg);
            }
                if(+standard > 0){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Standard OB (Roof + Walls)`;
                    structures.append(li)
                    obs--;
                }
                if(obs > 0 && +standard <= 0){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Small OB (Roof + Walls)`;
                    structures.append(li);
                    obs--;
                }
                if(obs > 0){
                    let splitDg = document.createElement(`li`);
                    splitDg.innerHTML = `Detached Garage (Roof + Walls)`;
                    splitStructures.append(splitDg);

                    if(obs > 0){
                        let li = document.createElement(`li`);
                        li.innerHTML = `Outbuilding (Roof Only)`;
                        splitStructures.append(li);
                        obs--;
                    }
                    if(obs > 0){
                    let others = document.createElement(`h3`);
                    others.innerHTML = `<hr />*Split Remaining OutBuildings (Roof Only)`;
                    splitStructures.append(others);
                    }
                }
        }

        if(!detached){
            let li = document.createElement(`li`);
            li.innerHTML = `Primary Structure (Roof + Wall)`;
            structures.append(li);
            if(+standard > 0){
                let li = document.createElement(`li`);
                    li.innerHTML = `Standard OB (Roof + Walls)`;
                    structures.append(li)
                    obs--;
            }
            if(obs > 0 && +standard <=0){
                let li = document.createElement(`li`);
                    li.innerHTML = `Small OB (Roof + Walls) *closest`;
                    structures.append(li)
                    obs--;
            }
            if(obs > 0){
                let others = document.createElement(`h3`);
                    others.innerHTML = `<hr />*Split Remaining OutBuildings (Roof Only)`;
                    splitStructures.append(others);
            }
        }

    }
    if(cn == `2`){ //----------Specific (PS and Shed Only)----------
        
        if(!primary){
            let li = document.createElement(`li`);
            li.innerHTML = `!Needs FTO Confirmation!`;
            li.classList.add(`red`);
            structures.append(li);
            return;
        }

        //no obs
            let li = document.createElement(`li`);
            li.innerHTML = `Primary Structure (Roof + Walls)`;
            structures.append(li);
        
        if(obs >= 1 && +standard >= 1){
            let li = document.createElement(`li`);
            li.innerHTML = `Standard OB (Roof + Walls)`;
            structures.append(li);
        }
        if(obs >= 1 && +standard <= 0){
            let li = document.createElement(`li`);
            li.innerHTML = `Closest OB (Roof + Walls)`;
            structures.append(li);
        }

    }
    if(cn == `3`){  //---------Specific (DG and Shed Only)----------
        if(detached && farDg.checked == false && obs <= 0){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            structures.append(li);
        }
        if(detached && farDg.checked == false && obs >= 1){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            structures.append(li);

                if(+standard >= 1){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Standard OB (Roof + Walls)`;
                    structures.append(li);
                }
                if(+standard <= 0){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Closest OB (Roof + Walls)`;
                    structures.append(li);
                }
        }
        if(farDg.checked == true){
            if(obs <= 0){
                let li = document.createElement(`li`);
                li.innerHTML = `Detached Garage (Roof + Walls)`;
                structures.append(li);
            }
            if(obs >= 1){
                let count = 0;
                if(+standard >= 1){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Detached Garage (Roof + Walls)`;
                    structures.append(li);
                    count++;

                    let li2 = document.createElement(`li`);
                    li2.innerHTML = `Standard OB (Roof + Walls)`;
                    splitStructures.append(li2);
                    count++;
                }
                if(+small >= 1 && count < 2){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Detached Garage (Roof + Walls)`;
                    structures.append(li);

                    let li2 = document.createElement(`li`);
                    li2.innerHTML = `Outbuilding (Roof + Walls)`;
                    splitStructures.append(li2);
                }
            }
        }
        if(!detached){
            if(obs <= 0){
                structures.innerHTML = `!Needs Fto Confirmation!`;
                structures.classList.add(`red`)
            }
            let st = +standard;
            let sm = +small;
            let count = 0;
            for(let i = 1; i <= 2; i++){
                if(st > 0){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Standard OB (Roof + Walls)`;
                    structures.append(li);
                    st--;
                    count++;
                }
                if(st <= 0 && count < 2){
                    if(sm > 0){
                        let li = document.createElement(`li`);
                        li.innerHTML = `Outbuilding (Roof + Walls)`;
                        structures.append(li);
                        sm--;
                        count++;
                    }
                }
            }
        }

    }
    if(cn == `4`){  //---------All Structures-------------------------
        if(!primary){
            structures.innerHTML = `<h2>!Needs FTO Confirmation!</h2>`;
            structures.classList.add(`red`);
            resultMain.append(structures);
            return;
        }

        if(primary){
            let li = document.createElement(`li`);
            li.innerHTML = `Primary Structure (Roof + Walls)`;
            structures.append(li);
        }

        let st = +standard;
        let sm = +small;
        if(detached && farDg.checked == false){
            let li = document.createElement(`li`);
            li.innerHTML = `Detached Garage (Roof + Walls)`;
            structures.append(li);
                if(obs > 0){
                    let counter = 0;
                    let next = false;
                    while(obs > 0){
                        let report = document.createElement(`h3`);
                        report.innerHTML = `Split Report`;
                        splitStructures.append(report);
                        
                            while(st > 0){
                                let li = document.createElement(`li`);
                                li.innerHTML = `Standard OB (Roof + Walls)`;
                                splitStructures.append(li);
                                counter++;
                                st--;
                                obs--;
                                if(counter >= 2){
                                    //reset counter
                                    next = true;
                                    counter = 0;
                                    break;
                                }else{
                                    next = false;
                                }
                            }
                            while(sm > 0){
                                if(next){
                                    break;
                                }
                                let li = document.createElement(`li`);
                                li.innerHTML = `Small OB (Roof + Walls)`;
                                splitStructures.append(li);
                                counter++;
                                sm--;
                                obs--;
                                if(counter >= 2){
                                    counter = 0;
                                    break;
                                }
                            }
                    }
                }
        }

        if(detached && farDg.checked == true){
            let st = +standard;
            let sm = +small;
            let primary = false;
            let dg = false;
            if(st > 0){
                let li = document.createElement(`li`);
                li.innerHTML = `Standard OB (Roof + Walls)`;
                structures.append(li);
                st--;
                primary = true;
            }
            if(sm > 0 && !primary){
                let li = document.createElement(`li`);
                li.innerHTML = `Closest OB (Roof + Walls)`;
                structures.append(li);
                sm--;
            }

            //for split
            let obs = st + sm;
            let counter = 0;
            while(obs > 0){
                let li = document.createElement(`h3`);
                li.innerHTML = `Split Report`;
                splitStructures.append(li);

                if(!dg){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Detached Garage (Roof + Walls)`;
                    splitStructures.append(li);
                    dg = true;
                    counter++;
                }
                while(obs > 0){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Outbuilding (Roof + Walls)`;
                    splitStructures.append(li);
                    obs--;
                    counter++;
                    if(counter >= 2){
                        counter = 0;    //reset
                        break;
                    }
                }
            }
            
        }
        if(!detached){
            let st = +standard;
            let sm = +small;
            let primary = false;

            if(obs > 0){
                if(st > 0){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Standard OB (Roof + Walls)`;
                    structures.append(li);
                    obs--;
                    primary = true;
                }
                if(sm > 0 && !primary){
                    let li = document.createElement(`li`);
                    li.innerHTML = `Closest OB (Roof + Walls)`;
                    structures.append(li);
                    obs--;
                }
                //for split structures
                let counter = 0;
                while(obs > 0){
                    let li = document.createElement(`h3`);
                    li.innerHTML = `Split Report`;
                    splitStructures.append(li);
    
                    while(obs > 0){
                        let li = document.createElement(`li`);
                        li.innerHTML = `Outbuilding (Roof + Walls)`;
                        splitStructures.append(li);
                        obs--;
                        counter++;
                        if(counter >= 2){
                            counter = 0;    //reset
                            break;
                        }
                    }
                }
            }
        }
    }

    resultMain.append(structures);
    resultSplit.append(splitStructures);
}