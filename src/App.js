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
  return (
    <>
      <Header />
      <Wrapper>
        <Screen value="0" />
        <ButtonBox>
          {/* flatten nested arrays for btnValues and mapping them by index */}
          {btnValues.flat().map((btn, i) => {
            return (
              <Button
                key={i}
                // if button is = the css class name is equals.  If not = there isn't a css class assigned
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onClick={() => {
                  console.log(`${btn} clicked!`);
                }}
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
