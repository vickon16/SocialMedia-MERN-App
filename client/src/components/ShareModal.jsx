import { Modal } from "@mantine/core";
import PostShare from "./PostShare";

function ShareModal({ modalOpened, setModalOpened }) {

  return (
    <Modal
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
      
    >
    <PostShare/>
    </Modal>
  );
}

export default ShareModal;