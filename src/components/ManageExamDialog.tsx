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

interface ManageExamDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: {
    name: string;
    topic: string;
    subject: string;
    answer: string;
    image: File | null;
    difficulty?: string;
  }) => void;
}

export default function ManageExamDialog({
  open,
  onClose,
  onSave,
}: ManageExamDialogProps) {
  const [name, setName] = React.useState("");
  const [ subject, setSubject ] = React.useState<string>("");
  const [topic, setTopic] = React.useState<string>("");
  const [answer, setAnswer] = React.useState("");
  const [difficulty, setDifficulty] = React.useState<string>("");
  const [image, setImage] = React.useState<File | null>(null);
  const [preview, setPreview] = React.useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleSave = () => {
    onSave({ name, subject, topic, answer, image });
    setName("");
    setSubject("");
    setTopic("");
    setAnswer("");
    setImage(null);
    setPreview(null);
    onClose();
  };

  const handleClose = () => {
    setName("");
    setSubject("");
    setTopic("");
    setAnswer("");
    setImage(null);
    setPreview(null);
    onClose();
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
            setName(data.name);
            setSubject(data.subject);
            setTopic(data.topic);
            setAnswer(data.answer);
            setImage(data.image);
            setDifficulty(data.difficulty ?? "");
          }}
          initialValues={{ name, topic,subject, difficulty ,answer }}
        />
      </DialogContent>
      
    </Dialog>
  );
}
