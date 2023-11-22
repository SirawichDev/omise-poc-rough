"use client";
import { OmiseCreateSourceParameters, OmiseTokenParameters } from "@/lib/omise";
import Script from "next/script";

export default function Home() {
  const handleScriptLoad = () => {
    window.OmiseCard.configure({
      publicKey: "pkey_test_5xtyknt8y9f3o130ael",
    });
    window.Omise.setPublicKey("pkey_test_5xtyknt8y9f3o130ael");
    console.log("wwww", window);

    // เอาไปใช้ตอน กดจ่ายเงิน (credit card)
    const tokenParameters: OmiseTokenParameters = {
      city: "Thailand",
      country: "TH",
      expiration_month: 3,
      expiration_year: 2024,
      name: "Sirawich",
      number: "4242424242424242", // for testing
      phone_number: "0123456789",
      postal_code: 90110,
      security_code: 123,
      state: "GG",
      street1: "GGG",
    };
    window.Omise.createToken("card", tokenParameters, function (code, res) {
      console.log("ggg", code, res);
    });
  };

  // const creditCardConfigure = () => {
  //   window.OmiseCard.configureButton("#credit-card");
  //   window.OmiseCard.attach();
  // };

  const omiseCardHandler = () => {
    window.OmiseCard.open({
      amount: 2000,
      defaultPaymentMethod: "promptpay",
      otherPaymentMethods: ["credit_card", "alipay"],
      frameDescription: "asdasdas #3847",
      location: "yes",
      onCreateTokenSuccess: async (nonce) => {
        console.log(
          "🚀 ~ file: page.tsx:65 ~ omiseCardHandler ~ nonce:",
          window
        );
        const tokenParameters: OmiseCreateSourceParameters = {
          amount: 2000,
          currency: "THB",
          email: "sirawit0676@gmail.com",
          store_id: "2",
          store_name: "ggwp",
          type: "promptpay",
          name: "Somchai Prasert",
          phone_number: "0123456789",
        };
        let gg;
        let data;
        window.Omise.createSource(
          "promptpay",
          tokenParameters,
          function (code, res) {
            gg = res;
            console.log("🚀 ~ file: page.tsx:58 ~ res:", res);
            console.log("🚀 ~ file: page.tsx:58 ~ code:", code);
            data = {
              amount: 2000,
              currency: "thb",
              source: res.id,
            };
          }
        );

        // charge api for test with curl
        //       curl https://api.omise.co/charges \
        // -u YOUR_OMISE_SECRET_KEY: \
        // -d "amount=3000" \ <-- much be the with amount in create source
        // -d "currency=thb" \
        // -d "source=YOUR_SOURCE_ID" <-- from createSource callback
        // https://jsonformatter.org/json-pretty-print
      },
      image:
        "https://evme.io/_next/image?url=https%3A%2F%2Fevme-website-cms.s3.ap-southeast-1.amazonaws.com%2Fapp_icon_logo_acb29c739b_01b46329cd.png&w=1920&q=75",
      locale: "th",
      onFormClosed: () => {
        console.log("ghhh");
      },
    });
  };

  const handleClick = (e:any) => {
    e.preventDefault();
    // creditCardConfigure();
    omiseCardHandler();
  };
  return (
    <>
      <Script
        type="text/javascript"
        crossOrigin="anonymous"
        src="https://cdn.omise.co/omise.js"
        onLoad={() => handleScriptLoad()}
      />
      <div className="h-full ">
        <form className="w-full flex justify-center items-center">
          <button
            id="credit-card"
            className="btn"
            type="button"
            onClick={handleClick}
          >
            Pay with Credit Card
          </button>
        </form>
      </div>
    </>
  );
}
