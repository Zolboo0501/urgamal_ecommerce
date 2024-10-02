import GlobalLayout from "@/components/GlobalLayout/GlobalLayout";
import Link from "next/link";

const Checkout = () => {
  return (
    <>
      <GlobalLayout>
        <div className="h-full w-full bg-grey-back px-32 py-8">
          <div className="flex gap-2">
            <Link href="cartItem" shallow={true}>
              Сагс
            </Link>
            <Link href="shippingAddress" shallow={true}>
              Хаяг
            </Link>
            <Link href="checkout" className="text-red-500" shallow={true}>
              Төлбөр
            </Link>
          </div>
        </div>
      </GlobalLayout>
    </>
  );
};

export default Checkout;
