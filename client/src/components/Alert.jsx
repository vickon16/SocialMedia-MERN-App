import { Modal } from "@mantine/core";
import {useDisclosure} from "@mantine/hooks"
import { useEffect } from "react";

function Alert({title, closeModal}) {
  const [opened, { open, close }] = useDisclosure(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => open(), []);

  const onClose = () => {
    closeModal();
    close();
  }

  return (
    <Modal
      size="18rem"
      centered
      opened={opened}
      onClose={onClose}
      transitionProps={{ transition: 'fade', duration: 200 }}
    >{title}</Modal>
  );
}

export default Alert;