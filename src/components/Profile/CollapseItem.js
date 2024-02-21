import Image from "next/image";
const CollapseItem = ({ data, total, orderItems }) => {
  return (
    <div
      className="divide-b-4 divide-slate-700 w-full"
      style={{ borderBottom: "2px solid #DADEDE" }}
    >
      <div className="flex flex-col p-4">
        <div className="flex flex-col">
          {orderItems?.map((e, index) => (
            <div className="flex flex-row mb-2 h-[90px]" key={index}>
              <Image
                alt={e.product?.name}
                loader={() => e.product?.image}
                src={e.product?.image}
                width={90}
                height={90}
              />
              <div className="flex flex-col justify-around">
                <p className="text-md font-semibold ml-2">{e.product?.name}</p>
                <div className="flex flex-row ml-2">
                  <p className="text-grey text-xs">Ширхэг :</p>
                  <p className="text-xs ml-1 font-semibold">{e?.qty}</p>
                </div>
                <div className="flex flex-row ml-2">
                  <p className="text-grey text-xs">Нэгж үнэ :</p>
                  <p className="text-xs ml-1 font-semibold">
                    {e.product?.price}₮
                  </p>
                </div>
              </div>
            </div>
          ))}
          {/* <div className="flex flex-row">
						<Button
							variant={"filled"}
							className="mr-4"
							style={{
								backgroundColor: "#F9BC60",
								fontWeight: "normal",
								padding: "6px",
							}}>
							Захиалга хянах
						</Button>
					</div> */}
        </div>
        {/* {(orderItems, "orderItems")}
				{orderItems.map((e) => (
					<Image alt="prd" src={e.product.image} width={90} height={90} />
				))}

				<div className="flex flex-col  ml-3 justify-between">
					<p className="text-sm mt-1">{data?.name}</p>
					<div className="flex flex-row">
						<p className="text-grey text-xs">Нийт : </p>
						<p className="text-xs font-bold">{total !== undefined && total}₮</p>
						<p className="text-grey text-xs ml-4">Ширхэг:</p>
						<p className="text-xs">{data?.instock}</p>
						<p className="text-grey text-xs ml-4">Нэгж үнэ:</p>
						<p className="text-xs">{data?.price}₮</p>
					</div>
				
				</div> */}
      </div>
    </div>
  );
};

export default CollapseItem;
