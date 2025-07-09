"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import CreateExamForm from "./ExamForm";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { set } from "react-hook-form";
import createExam from "@/libs/api/createExam";
import { ExamInputType } from "./ExamForm";
import Cookies from "js-cookie";

interface ManageExamDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
}

export default function ManageExamDialog({
  open,
  onClose,
  onSave,
}: ManageExamDialogProps) {
  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async (data: ExamInputType) => {
    try {
      if (!data.image) {
        return;
      }
      if (!data.answerImage) {
        return;
      }
      const res = await createExam(
        data.name,
        data.image,
        data.answer,
        data.subject,
        data.topic,
        data.difficulty ?? "",
        data.answerImage,
        data.choices,
        Cookies.get("token") ?? ""
      );
      console.log("Exam created successfully", res);
      handleClose();
    } catch (error) {
      console.error("Error creating exam:", error);
    }
  };
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ m: 0, p: 2 }}>
        Manage Exam
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
          size="large"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="flex flex-col gap-4 py-4">
        <CreateExamForm
          onSubmit={(data) => {
            handleSubmit(data);
            onSave();
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
