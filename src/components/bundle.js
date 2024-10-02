import Image from "next/image";
import Link from "next/link";

const Bundle = ({ src, name, count, price, productIndex }) => {
  return (
    <div
      className="flex flex-col items-center justify-center py-4"
      style={{ height: "350px" }}
    >
      <Image
        loader={() => src}
        src={src}
        width={10}
        height={10}
        alt={name}
        className="bundle-img"
      />
      <p className="mt-1 text-base">{name}</p>
      <div className="mt-1 flex flex-row">
        <p className="text-sm text-grey">Үлдэгдэл : </p>
        <p className="text-sm">{count}</p>
      </div>
      <p className="mt-1 text-xl font-semibold">{price}</p>
      <Link
        href={`product/${productIndex}`}
        className="mt-2 flex flex-row items-center justify-center rounded-md bg-green2 px-4 py-1 text-white"
      >
        <p className="text-base">Дэлгэрэнгүй</p>
        <Image
          alt="arrow-left"
          src={"/icons/arrow-left-2.svg"}
          width={16}
          height={11}
          className="ml-2"
        />
      </Link>
    </div>
  );
};

export default Bundle;
