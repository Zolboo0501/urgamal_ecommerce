import { Modal, rem } from "@mantine/core";
import { IconFileInvoice, IconTruckDelivery } from "@tabler/icons-react";
import React from "react";

const InvoiceModal = ({ opened, onClose, handleOrder, handleInvoice }) => {
  return (
    <Modal opened={opened} onClose={onClose} title="Захиалгын төрөл" centered>
      <div className="flex flex-row">
        <div
          className="flex flex-1 flex-col items-center justify-center py-12 hover:bg-primary500 hover:text-white"
          onClick={() => handleOrder()}
        >
          <IconTruckDelivery stroke={1.5} size={"4.5rem"} />
          <p className="mt-2 text-base font-medium">Захиалга</p>
        </div>
        <div
          className="flex flex-1 flex-col items-center justify-center hover:bg-button-yellow hover:text-white"
          onClick={() => handleInvoice()}
        >
          <IconFileInvoice stroke={1.5} size={"4.5rem"} />
          <p className="mt-2 text-base font-medium">Нэхэмжлэл</p>
        </div>
      </div>
    </Modal>
  );
};

export default InvoiceModal;
