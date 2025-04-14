import React from "react";
import Modal from "react-modal";
import s from "./ImageModal.module.css";
Modal.setAppElement("#root");

const ImageModal = ({ isOpen, image, onRequestClose }) => {
  return (
    <div>
      <Modal
        className={s.modal}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Image Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.8)",
          },
          content: {
            maxWidth: "80%",
            margin: "auto",
            background: "none",
            border: "none",
            padding: 0,
          },
        }}
      >
        <img
          src={image.full}
          alt={image.alt}
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </Modal>
    </div>
  );
};

export default ImageModal;
