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
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    })
  }    
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
                   btn === "C"
                   ? resetClickHandler
                   : btn === "+-"
                   ? invertClickHandler
                   : btn === "%"
                   ? percentClickHandler
                   : btn === "="
                   ? equalsClickHandler
                   : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                   ? signClickHandler
                   : btn === "."
                   ? decimalClickHandler
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

export default App;
