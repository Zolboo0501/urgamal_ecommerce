import { errorNotification, successNotification } from "@/utils/utils";
import { Paper } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconPlus } from "@tabler/icons-react";
import { getCookie } from "cookies-next";
import { useState } from "react";
import { DeleteConfirmationDialog } from "../Profile/deleteAddress";
import ProductModal from "../Profile/ProfileModal";
import ShippingAddressCard from "../ShippingAddressCard/ShippingAddressCard";

export default function UserAddress({ data, refresh, selectAddress }) {
  const cookie = getCookie("token");
  const [opened, { open, close }] = useDisclosure(false);
  const [confirmationOpened, handlers] = useDisclosure(false);
  const [editingProdData, setEditingProdData] = useState();
  const [DeletingAddress, setDeletingAddress] = useState({ id: "" });

  const openProductEditingModal = (productData, type = "edit") => {
    if (type === "creation") {
      setEditingProdData({ create: true });
    } else {
      setEditingProdData(productData);
    }
    open();
  };
  const openDeleteConfirmation = (Id) => {
    setDeletingAddress({ id: Id });
    handlers.open();
  };
  const SubmitCreateShippingData = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");
    let city = "";
    let district = "";
    let khoroo = "";
    if (values?.city || values?.district || values?.committee) {
      const selectedCity = selectAddress?.find(
        (item) => item?.name === values?.city,
      );
      city = selectedCity;
      const selectedDistrict = selectedCity?.dic_districts?.find(
        (item) => item?.name === values?.district,
      );
      district = selectedDistrict;
      const selectedKhoroo = selectedDistrict?.dic_khoroos?.find(
        (item) => item?.name === values?.committee,
      );
      khoroo = selectedKhoroo;
    }

    const initialData = {
      name: values.name,
      city: city?.id,
      // province: values?.province, //? daraa nemeh
      district: district?.id,
      khoroo: khoroo.id,
      phone: values.phone,
      type: values.type === undefined ? false : values.type,
      note: `${values.street} гудамж, ${values?.apartment} байр, ${values.number} тоот ${values.note}`,
    };

    const requestOption = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(initialData),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address-v2`, requestOption)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          successNotification({
            message: result.message,
          });
          refresh();
          close();
        } else {
          errorNotification({
            message: result.message,
          });
        }
      });
  };

  const SubmitUpdateShippingData = async (values) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");

    const initialData = {
      id: values.id,
      name: values.name,
      city: values.city,
      province: values.province,
      district: values.district,
      committee: values.committee,
      street: values.street,
      fence: values.fence,
      apartment: values.apartment,
      number: values.number,
      phone: values.phone,
      type: values.type ? values.type : false,
      note: values.note,
    };

    const requestOption = {
      method: "PUT",
      headers: myHeaders,
      body: JSON.stringify(initialData),
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/address`, requestOption)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          successNotification({
            message: result.message,
          });
          refresh();
          close();
        } else {
          errorNotification({
            message: result.message,
          });
        }
      });
  };

  const SubmitDeleteShippingData = async (id) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${cookie}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOption = {
      method: "DELETE",
      headers: myHeaders,
      body: JSON.stringify({ id: id }),
    };

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/address-v2/${id}`,
      requestOption,
    )
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          successNotification({
            title: "Хаяг амжилттай устгалаа.",
            message: result.message,
          });
          refresh();
        } else {
          errorNotification({
            message: result.message,
          });
        }
      });
    handlers.close();
  };
  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-full w-full lg:mt-3">
        <div className="flex h-full w-full flex-col flex-wrap gap-3 lg:flex-row">
          {data?.map((e) => {
            return (
              <div key={`user-address-card-${e.id}`} className="w-full">
                <ShippingAddressCard
                  name={e.name}
                  address={e}
                  onDelete={openDeleteConfirmation}
                  onUpdate={openProductEditingModal}
                />
              </div>
            );
          })}
          <div>
            <Paper
              withBorder
              radius="md"
              className="h-28 w-28 hover:bg-[#1970c221]"
              component="button"
              onClick={(e) => {
                e.preventDefault();
                openProductEditingModal(selectAddress, "creation");
              }}
            >
              <div className="flex h-28 w-28 cursor-pointer flex-col items-center justify-center gap-1">
                <IconPlus stroke={1.5} color="#228BE6" />
                <p class="text-sm text-blue-500">Нэмэх</p>
              </div>
            </Paper>
          </div>
        </div>
      </div>
      <DeleteConfirmationDialog
        isOpen={confirmationOpened}
        close={handlers.close}
        confirmationText="Хаяг устгахад итгэлтэй байна уу?"
        thingToDelete={DeletingAddress}
        onConfirm={SubmitDeleteShippingData}
      />
      <ProductModal
        initialData={editingProdData}
        isOpen={opened}
        close={close}
        onSubmit={
          editingProdData?.create
            ? SubmitCreateShippingData
            : SubmitUpdateShippingData
        }
        address={selectAddress}
      />
    </div>
  );
}
