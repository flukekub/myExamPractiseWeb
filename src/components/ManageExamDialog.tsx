"use client";
import * as React from "react";
import { 
  Dialog, DialogTitle, DialogContent, IconButton, Typography, Box 
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import createExam from "@/libs/api/createExam";
import ExamForm, { ExamInputType } from "./ExamForm";

interface ManageExamDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function ManageExamDialog({ open, onClose }: ManageExamDialogProps) {
  const queryClient = useQueryClient();

  // TanStack Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: (data: ExamInputType) => {
      return createExam(
        data.name,
        data.image!,
        data.answer,
        data.subject,
        data.topic,
        data.difficulty ?? "",
        data.answerImage!,
        data.choices,
        Cookies.get("token") ?? ""
      );
    },
    onSuccess: () => {
      // Refresh the 'exams' list automatically
      queryClient.invalidateQueries({ queryKey: ["exams"] });
      onClose();
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
      alert("Failed to create exam. Please try again.");
    }
  });

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: "20px", padding: 1 }
      }}
    >
      <DialogTitle sx={{ m: 0, p: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" fontWeight="800" color="primary.main">
            Create New Exam
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Fill in the details below to add a new question to the database.
          </Typography>
        </Box>
        <IconButton
          onClick={onClose}
          sx={{ color: (theme) => theme.palette.grey[400] }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ borderBottom: 'none', px: 3 }}>
        <ExamForm 
          onSubmit={(data: ExamInputType) => mutate(data)} 
          isSubmitting={isPending} 
        />
      </DialogContent>
    </Dialog>
  );
}