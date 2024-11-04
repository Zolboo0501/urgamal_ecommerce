/* eslint-disable react/prop-types */
import { Button, Group, Modal } from "@mantine/core";
import React from "react";
export function DeleteConfirmationDialog({
  isOpen,
  close,
  confirmationText,
  thingToDelete = {},
  onConfirm,
  loading,
}) {
  return (
    <Modal opened={isOpen} onClose={close} title={confirmationText} centered>
      <p className="p-2 text-sm font-medium">{thingToDelete?.name}</p>
      <Group position="right" mt="xl">
        <Button variant="default" onClick={close}>
          Цуцлах
        </Button>
        <Button
          type="submit"
          loading={loading}
          onClick={() => onConfirm(thingToDelete?.id)}
          color="red"
        >
          Устгах
        </Button>
      </Group>
    </Modal>
  );
}
