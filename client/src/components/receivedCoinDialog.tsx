import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
export const ReceivedCoinDialog = ({
  message,
  isOpen,
  onOpenChange,
  isDismissable = true,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={isDismissable}
    >
      <ModalContent className="bg-transparent">
        {(onClose) => (
          <>
            <ModalHeader></ModalHeader>
            <ModalBody className="flex flex-col justify-center items-center w-full">
              <img src="/receivedcoin.gif" width={300} height={300} />
              <span className="text-center text-white font-semibold text-lg">
                {message}
              </span>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
