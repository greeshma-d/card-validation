import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Visa from "./icons/visa.png";
import AmExpress from "./icons/amerianexpress.png";
import MasterCard from "./icons/mastercard.png";
import Discover from "./icons/discover.png";
import CardChip from "./icons/chip.png";

const App = () => {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    expiry: "",
    cardNumber: "",
    cvv: "",
  });
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardImage, setCardImage] = useState();
  const [enterCardNum, setEnterCardNum] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);
  const [focusCvv, setFocusCvv] = useState(false);
  const [cardBg, setCardBg] = useState('bg-gray-400');

  const handleSubmit = () => {
    setCardDetails((prev) => ({
      ...prev,
      name: cardName,
      expiry: cardExpiry,
      cardNumber: cardNumber,
      cvv: cardCvv,
    }));
    setAlertMessage(true);
  };

  const handleCardLogo = (value) => {
    switch (value[0]) {
      case "3":
        setCardImage(AmExpress);
        setCardBg("bg-gradient-to-r from-[#308c67] to-[#a3f2cf]")
        break;
      case "4":
        setCardImage(Visa);
        setCardBg("bg-gradient-to-r from-[#0f509e] to-[#1399cd]")
        break;
      case "5":
        setCardImage(MasterCard);
        setCardBg("bg-gradient-to-r from-[#fbfbfb] to-[#e8e9e5]")
        break;
      case "6":
        setCardImage(Discover);
        setCardBg("bg-gradient-to-r from-[#fff] to-[#eee]")
        break;
      default:
        setCardDetails("");
    }
  };

  useEffect(() => {
    setCardImage("");
    handleCardLogo(enterCardNum);
  }, [enterCardNum]);

  useEffect(() => {
    alertMessage && alert(JSON.stringify(cardDetails, null, 2));
  }, [alertMessage, cardDetails]);

  return (
    <div className="min-h-screen max-h-full bg-black p-5">
      <div className="w-full md:w-[630px] rounded-2xl p-5 md:px-8 md:py-6 md:pb-8 bg-white mx-auto my-0 h-auto">
        <div className="pt-10 pb-10 md:pt-16 md:px-20 md:pb-20">
          <div className={`w-full h-56 md:h-64 rounded-2xl px-5 md:px-10 py-9 relative drop-shadow-xl ${cardBg}`}>
            {!focusCvv ? <>
              <div className="flex justify-between">
                <img
                  src={CardChip}
                  alt="cardChip"
                  className="w-16 h-12"
                />
                {cardImage && (
                  <img src={cardImage} alt="cardLogo" className="w-20 h-10" />
                )}
              </div>
              <div className="mt-6">
                <div className="text-sm font-mono">card number</div>
                <div className="text-base md:text-3xl leading-5 h-6 md:h-8">
                  {cardNumber}
                </div>
              </div>
              <div className="flex items-center justify-between w-full mt-4 md:mt-6">
                <div className="w-1/2">
                  <div className="text-sm font-mono">cardholder name</div>
                  <div className="text-base md:text-lg uppercase leading-5 md:h-7">
                    {cardName}
                  </div>
                </div>
                <div className="w-1/3">
                  <div className="text-sm font-mono">expiration</div>
                  <div className="text-base md:text-lg leading-5 md:h-7">
                    {cardExpiry}
                  </div>
                </div>
              </div>
            </> : <>
              <div className="w-full h-10 md:h-12 bg-black absolute top-8 md:top-10 left-0 right-0"></div>
              <div className="mt-16 md:mt-20 bg-white flex justify-between relative rounded-sm h-10">
                <div className="text-base md:text-lg uppercase leading-5 px-4 py-2">{cardName}</div>
                <div className="text-base md:text-lg leading-5 bg-slate-600 text-white px-4 py-2 w-16">{cardCvv}</div>
                <p className="text-sm font-mono absolute -bottom-6 right-0 text-slate-300">security code</p>
              </div>
              <div className="mt-10">
                <div className="w-9/12 h-2 bg-white"></div>
                <div className="mt-2 w-6/12 h-2 bg-white"></div>
              </div>
            </>}
          </div>
        </div>
        <form className="" onSubmit={() => handleSubmit(cardDetails)}>
          <div className="mb-6">
            <h1 className="text-black text-2xl font-medium mb-2">
              Update payment method
            </h1>
            <p className="text-slate-500 text-xl">Update your card details.</p>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            <div className="grid grid-cols-1 col-span-2">
              <label className="mb-2 text-lg font-medium">Name on card</label>
              <input
                type="text"
                className="px-5 py-3 text-xl border border-slate-400 focus:outline-none rounded-lg"
                onChange={(e) => setCardName(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-1 col-span-2 md:col-span-1">
              <label className="mb-2 text-lg font-medium">Expiry</label>
              <InputMask
                mask="99 / 9999"
                onChange={(e) => setCardExpiry(e.target.value)}
                className="px-5 py-3 text-xl border border-slate-400 focus:outline-none rounded-lg"
                required
                placeholder="__ / ____"
              />
            </div>
            <div className="grid grid-cols-1 col-span-2">
              <label className="mb-2 text-lg font-medium">Card number</label>
              <div className="px-5 py-3 text-xl border border-slate-400 rounded-lg flex items-center">
                {cardImage && (
                  <img
                    src={cardImage}
                    alt="cardImage"
                    className="w-12 h-8 rounded-md py-1 px-2 border border-slate-300 mr-3 object-contain"
                  />
                )}
                <InputMask
                  mask="9999 9999 9999 9999"
                  onChange={(e) => {
                    setCardNumber(e.target.value);
                    setEnterCardNum(e.target.value);
                  }}
                  className="focus:outline-none"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 col-span-2 md:col-span-1">
              <label className="mb-2 text-lg font-medium">CVV</label>
              <input
                type="password"
                className="px-5 py-3 text-xl border border-slate-400 focus:outline-none rounded-lg"
                onChange={(e) => {
                  setCardCvv(e.target.value);
                }}
                onFocus={() => setFocusCvv(true)}
                onBlur={() => setFocusCvv(false)}
                maxLength={3}
                minLength={3}
                required
              />
            </div>
          </div>
          <div className="flex items-center w-full justify-between mt-10">
            <button className="w-[48.5%] text-xl border border-slate-400 font-medium rounded-lg px-3 py-4">
              Cancel
            </button>
            <button
              type="submit"
              className="w-[48.5%] text-xl bg-violet-500 text-white font-medium rounded-lg px-3 py-4"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
