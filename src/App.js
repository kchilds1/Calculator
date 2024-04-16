import React, { useState } from "react";
import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Wrapper from "./components/Wrapper/wrapper";
import Screen from "./components/Screen/Screen";
import ButtonBox from "./components/ButtonBox/ButtonBox";
import Button from "./components/Button/Button";

//values to be flatten nested arrays and mapped on the ButtonBox by index
 const btnValues = [
   ["C", "+-", "%", "/"],
   [7, 8, 9, "X"],
   [4, 5, 6, "-"],
   [1, 2, 3, "+"],
   [0, ".", "="],
 ];

function App() {
  let [calc, setCalc] = useState({
    // default setting below
    sign:"",
    num: 0,
    res: 0,
  })
//function is called when element is a number 0-9
  const numClickHandler = (e) => {
    //prevent the default action of clicking an HTML element from happening
        e.preventDefault();
      //get the inner html number of the clicked button
        const value = e.target.innerHTML;
    //Making sure there are no more that 15 numbers being put in at a time on the screen
        if (calc.num.length < 16) {
      
          setCalc({
            ...calc,
            num:
              calc.num === 0 && value === "0"
                ? "0"
          //check to see if we have a whole number for calc.num
                : calc.num % 1 === 0
          //If we have a whole number we will convert it to a number
                ? Number(calc.num + value)
          //concatenate the numbers
                : calc.num + value,
          //If there isn't a math operation set the result to 0, else keep it unchanged 
            res: !calc.sign ? 0 : calc.res,
          });
        }
      };

//function is called when a decimal is pressed  
  const decimalClickHandler = (e) =>{
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      /* !calc.num.toString().includes(".") checks to see if the current number stored
       in calc.num already has a decimal. If it already contains a decimal calc.num will return unchanged*/
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  }; 
  
  const equalsClickHandler = () => {
    //if I have a sign and a number we will do the math with a function I call math
     if (calc.sign && calc.num){
         const math = (a,b, sign) =>
         sign === "+"
         ? a + b
         : sign === "-"
         ? a - b
         : sign === "X"
         ? a * b
         : a / b;
//setCalc is going to update the calc state
         setCalc({
          //creating a new object with a span of the current calc object
          ...calc,
          //update res property
          res: 
          //if calc.num is 0 and calc.sign is / say can't divide with 0
          calc.num === "0" && calc.sign === "/"
          ? "Can't divide with 0"
          //else call the math function that uses Number method to turns the current calc.res and calc.num string into a number
          : math(Number(calc.res), Number(calc.num), calc.sign),
          //set sign to an empty string
          sign: "",
          //set num to zero
          num: 0,
         })
     }
  }
//the invert click handler function will check to see if there are any entered value num or value res, then invert them by multiplying them with -1
//sign property will initialized  with an empty string
  const invertClickHandler = () => {
    setCalc({
      ...calc,
      num: calc.num ? calc.num * -1 : 0,
      res: calc.res ? calc.res * -1 : 0,
      sign: "",
    });
  }
  
//function is called when a sign (+,-,*, or /) is pressed.
const signClickHandler = (e) => {
  e.preventDefault();
  const value = e.target.innerHTML;

  setCalc({
    ...calc,
    sign: value,
    res: !calc.res && calc.num ? calc.num : calc.res,
    num: 0,
    
  })
  return (
    <>
      <Header />
      <Wrapper>
        {/* display calc number if there is one or display calc.res on the screen */}
        <Screen value = {calc.num ? calc.num : calc.res} />
        <ButtonBox>
          {/* flatten nested arrays for btnValues and mapping them by index */}
           {btnValues.flat().map((btn, i) => { 
            return (
              <Button
                key={i}
                // if button is = the css class name is equals.  If not = there isn't a css class assigned
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={
                  // if button is C reset click handler will be called
                   btn === "C"
                   ? resetClickHandler
                   //else button is +- invert click handler will be called
                   : btn === "+-"
                   ? invertClickHandler
                   //else button is % percent click handler will be called
                   : btn === "%"
                   ? percentClickHandler
                   //else button is = equals click handler will be called
                   : btn === "="
                   ? equalsClickHandler
                   //else button is /, X, -, or + sign click handler will be called
                   : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                   ? signClickHandler
                   //else button is . decimal click handler will be called
                   : btn === "."
                   ? decimalClickHandler
                   //else num click handler will be called
                  : numClickHandler
                }
              />
            );
           })} 
        </ButtonBox>
      </Wrapper>
      <Footer />
    </>
  );
}
}
export default App;

