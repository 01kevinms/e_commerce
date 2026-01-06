import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {  getProfile } from "../../services/apis/Get.routes";
import Stepper from "./Stepper";
import type { Address, MethodPayment } from "../../types/cards";

import ItemsStep from "./steps/ItemsStep";
import AddressStep from "./steps/AddressStep";
import PaymentStep from "./steps/PaymentStep";
import ConfirmStep from "./steps/ConfirmStep";
import { checkoutOrder } from "../../services/apis/Post.routes";

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [user, setUser] = useState<any>();

  const [items, setItems] = useState(location.state?.items || []);
  const [addressId, setAddressId] = useState<string>();
  const [paymentMethod, setPaymentMethod] = useState<MethodPayment>();

  useEffect(() => {
    getProfile().then(setUser);
  }, []);

  if (!items.length) return <p>Checkout inválido</p>;

  async function finishOrder() {
    const selectedAddress = user?.addresses?.find((addr: any) => addr.id === addressId);

    const order = await checkoutOrder({
      items,
      addressId: selectedAddress,
      paymentMethod,
    });
    navigate(`/order/${order.id}`);
  }
  
function handleUpAddress(updateAddress:Address){
setUser((prev:any)=>({
  ...prev,
  address: prev.address.map((addr: Address)=> addr.id === updateAddress.id ? updateAddress : addr)
}))
}
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-[#1f1f1f] rounded-xl p-6 text-white">

        <Stepper step={step} />

        {step === 1 && (
          <ItemsStep items={items} onNext={() => setStep(2)} />
        )}

        {step === 2 && (
          <AddressStep
            user={user}
            addressId={addressId!}
            onSelect={setAddressId}
            onNext={() => setStep(3)}
            onBack={() => setStep(1)}
            onAddressUp={handleUpAddress}
          />
        )}

        {step === 3 && (
          <PaymentStep
            paymentMethod={paymentMethod}
            onSelect={setPaymentMethod}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        )}

        {step === 4 && (
          <ConfirmStep
            items={items}
            user={user}
            paymentMethod={paymentMethod}
            onBack={() => setStep(3)}
            onConfirm={finishOrder}
          />
        )}
      </div>
    </div>
  );
}
