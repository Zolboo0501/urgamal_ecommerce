import { Button, Group, Modal } from "@mantine/core";
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
      <p class="text-sm font-medium p-2">{thingToDelete?.name}</p>
      <Group position="right" mt="xl">
        <Button variant="default" onClick={close}>
          Цуцлах
        </Button>
        <Button
          type="submit"
          loading={loading}
          onClick={(e) => onConfirm(thingToDelete?.id)}
          color="red"
        >
          Устгах
        </Button>
      </Group>
    </Modal>
  );
}
