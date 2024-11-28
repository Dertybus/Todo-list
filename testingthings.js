// let cities = [{ id: 121, name: 'г. Урюпинск' }, { id: 122, name: 'г. Париж' }, { id: 123, name: 'г. Москва' }, { id: 124, name: 'г. Штормград' }];
// let searchTerm = 'г. Париж';
// let cityId = cities.find(city => city.name === searchTerm).id
// console.log(cityId);


// {
//         name: name,
//         done: false,
//         id: Date.now() // Генерация уникального id с использованием текущего времени
//     };
 
// add() {
//     const elemText = document.querySelector('.todo__text');

//     if (elemText.disabled || !elemText?.value?.length) {
//         return;
//     }
//     document.querySelector('.todo__items').insertAdjacentHTML('beforeend', this.create(elemText.value));
//     elemText.value = '';
// },


// console.log(
//     JSON.stringify(
//         [1, 'array', { was: 'with' }, { some: ['strange', 'things'] }, null],
//         null,
//         '  '
//     )
// )
let x1 = 2;
let y1 = 3;
let x2 = 10;
let y2 = 5;
let width = Math.abs(x2 - x1);
let height = Math.abs(y2 - y1);
console.log(width * height);