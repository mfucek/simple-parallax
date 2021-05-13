
let stajl = document.createElement('style');
stajl.innerText = `
.test-circle {
  position: absolute;
  transform: translate(-50%, -50%);
  
  border: 1px #f00 solid;
  border-radius: 100%;

  height: 20px;
  width: 20px;

  top: unset; bottom: unset;
}
`
document.appendChild(stajl);

const createTest = (x, y) => {
  let elem = document.createElement('div');
  
  elem.classList.add('test-circle');
  elem.style.top = `${x}px`;
  elem.style.left = `${y}px`;

  document.body.appendChild(elem);
}