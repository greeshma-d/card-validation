import { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import Visa from "./icons/visa.png";
import AmExpress from "./icons/amerianexpress.png";
import MasterCard from "./icons/mastercard.png";
import Discover from "./icons/discover.png";

const App = () => {
  const [cardDetails, setCardDetails] = useState({
    name: "",
    expiry: "",
    cardNumber: "",
    cvv: "",
  });
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardImage, setCardImage] = useState();
  const [enterCardNum, setEnterCardNum] = useState("");
  const [alertMessage, setAlertMessage] = useState(false);

  const handleSubmit = () => {
    setCardDetails(prev => ({
      ...prev,
      name: cardName,
      expiry: cardExpiry,
      cardNumber: cardNumber,
      cvv: cardCvv,
    }))
    setAlertMessage(true);
  };
  
  const handleCardLogo = (value) => {
    switch (value[0]) {
      case "3":
        setCardImage(AmExpress);
        break;
      case "4":
        setCardImage(Visa);
        break;
      case "5":
        setCardImage(MasterCard);
        break;
      case "6":
        setCardImage(Discover);
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
    alertMessage && alert(JSON.stringify(cardDetails));
  }, [alertMessage, cardDetails]);

  return (
    <div className="min-h-screen max-h-full bg-black p-5">
      <div className="w-full md:w-[630px] rounded-2xl p-5 md:px-8 md:py-6 md:pb-8 bg-white mx-auto my-0 h-auto">
        <div className="pt-10 pb-10 md:pt-16 md:px-20 md:pb-20">
          <img
            src="https://www.idbibank.in/images/cards/Signature_Debit_Card.jpg"
            className="w-full h-50 md:h-60"
            alt="card"
          />
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
                onChange={(e) =>
                  setCardName(e.target.value)
                }
                required
              />
            </div>
            <div className="grid grid-cols-1 col-span-2 md:col-span-1">
              <label className="mb-2 text-lg font-medium">Expiry</label>
              <InputMask
                mask="99 / 9999"
                onChange={(e) =>
                  setCardExpiry(e.target.value)
                }
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
                onChange={(e) =>
                  setCardCvv(e.target.value)
                }
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
