import { useState, useEffect } from "react";
import { InputBox } from "./components";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertAmount, setConvertAmount] = useState(0);
  const [options, setOptions] = useState([]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertAmount(amount);
    setAmount(convertAmount);
  };

  useEffect(() => {
    fetch(
      `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${from}.json`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(from);
        console.log(data.from);
        console.log(data.usd);
        setConvertAmount(amount * data[from][to]);
        setOptions(Object.keys(data[from]));
      });
  }, [amount, from, to]);

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/6843588/pexels-photo-6843588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              handleChange={setAmount}
              selectCurrency={from}
              handleCurrencyChange={setFrom}
              ifDisabled={false}
            />

            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>

            <InputBox
              label="To"
              amount={convertAmount}
              handleChange={convertAmount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              handleCurrencyChange={setTo}
              ifDisabled={true}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
