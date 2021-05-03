// array con las operaciones
var operators = ["/", "*", "+", "-", "^", "("];

// operador p.expresion p.pila
// ^           4           3
// */          2           2
// +-          1           1
// (           5           0
// )           na          na

const pPila = (i) => {
  switch (i) {
    case "^":
      return 3;
    case "*":
      return 2;
    case "/":
      return 2;
    case "+":
      return 1;
    case "-":
      return 1;
    case "(":
      return 0;
    default:
      break;
  }
};

const pExpresion = (i) => {
  switch (i) {
    case "^":
      return 4;
    case "*":
      return 2;
    case "/":
      return 2;
    case "+":
      return 1;
    case "-":
      return 1;
    case "(":
      return 5;
    default:
      break;
  }
};

const NotacionPostfija = () => {
  // se obtiene el valor del input
  var expresion = document.getElementById("infija").value;
  // se transforma la expresion en un array
  var expresionArr = expresion.toUpperCase().split("");

  // variable de postfija
  var postfija = "";
  // se crea un ainstancia de pila
  const pila = new Pila();

  for (let item of expresionArr) {
    if (/\d/g.test(item) || /\w/g.test(item)) {
      //si el termino es un numero se añade a la ecuacion
      postfija += `${item}`;
    } else if (operators.some((i) => i == item)) {
      if (pila.size() === null) {
        //si el termino es un operador se añade a la pila
        pila.push(item);
      } else {
        if (pExpresion(item) > pPila(pila.peek())) {
          pila.push(item);
        } else {
          //   console.log(pila.pop());
          postfija += pila.pop();
          pila.push(item);
        }
      }
    } else if (item == ")") {
      //si el termino es un ')' se saca el tope de la pila y se elimina este
      postfija += pila.pop();
    }
  }
  //vacia la pila
  while (pila.size() > 0) {
    postfija += pila.pop();
  }

  var expresionRegular = /[()]/g;
  var relPosfija = postfija.replace(expresionRegular, "");

  var resl = document.getElementById("result");
  resl.innerHTML = relPosfija;
};

// clase pila con las operaciones basicas
class Pila {
  constructor() {
    this.stack = {}; // se almacenas lo datos en un objeto
    this.top = null; // top de la pila
  }

  push(element) {
    if (this.top == null) {
      this.top = 0;
      this.stack[this.top] = element;
      this.top++;
    } else {
      // empuja un elemento al final de la lista
      this.stack[this.top] = element;
      this.top++;
    }
  }

  pop() {
    // elimina el valor del tope y lo retorna
    this.top--;
    const element = this.stack[this.top];
    delete this.stack[this.top];
    return element;
  }

  peek() {
    //retorna el valor que esta en el tope
    return this.stack[this.top - 1];
  }

  size() {
    //retorna el tamaño de la pila
    return this.top;
  }

  print() {
    //imprime la pila en consola
    console.log(this.stack);
  }
}
