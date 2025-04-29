"use client";

import { MainDocumentCategoryScreen } from "./MainDocumentCategoryScreen";
import { ModalDialog } from "../ModalDialog/ModalDialog";
import React from "react";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
}

export const DocumentCategoryModal = ({ isOpen, onClose }: Props) => {

  return (
    <ModalDialog isOpen={isOpen} title="Select or Create a Category for your document" onClose={onClose}>
      <MainDocumentCategoryScreen></MainDocumentCategoryScreen>
    </ModalDialog>
  );
};
