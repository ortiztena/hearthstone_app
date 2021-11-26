
import { getCardsBySelector } from './utils/getCards';

const menuSelectores = document.getElementById('hearthStone_sidebarSelectors');

function createSelector(a, datos) {
    const selectEl = document.createElement('select');
    selectEl.name = a;
    selectEl.className = 'select-css';
    const label = document.createElement('option');
    const labelText = document.createTextNode("All " + a);
    label.value = a;
    label.appendChild(labelText);
    selectEl.appendChild(label);
    datos.forEach(function  (option){

    const optionEl = document.createElement('option');
    const optionText = document.createTextNode(option);
    optionEl.value = option;
    
    optionEl.appendChild(optionText);
    selectEl.appendChild(optionEl);
      
  })

  selectEl.addEventListener ('change', getCardsBySelector, /*{once:true}*/);
  return selectEl;
};

 
export function makeSelectors (data){
  for ( let i of Object.keys(data)){
         const etiqueta = createSelector(i, data[i]);
         menuSelectores.appendChild(etiqueta);
     };
}
