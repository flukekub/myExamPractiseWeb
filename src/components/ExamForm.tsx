"use client";
import { useForm, Controller } from "react-hook-form";
import { 
  TextField, Button, IconButton, Select, MenuItem, 
  InputLabel, FormControl, Typography, Box, Divider, CircularProgress 
} from "@mui/material";
import { CloudUpload, Delete } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import getSubjects from "@/libs/api/getSubjects";
import getTypeExam from "@/libs/api/getTypeExam";
import { Subject } from "../../interface";

export interface ExamInputType {
  name: string;
  subject: string;
  topic: string;
  answer: string;
  image: File | null;
  difficulty?: string;
  answerImage: File | null;
  choices: string;
}

interface ExamFormProps {
  onSubmit: (data: ExamInputType) => void;
  isSubmitting: boolean;
}

export default function ExamForm({ onSubmit, isSubmitting }: ExamFormProps) {
  const { control, handleSubmit, watch, reset } = useForm<ExamInputType>({
    defaultValues: {
      name: "", subject: "", topic: "", answer: "",
      image: null, difficulty: "medium", answerImage: null, choices: "4",
    },
  });

  const [previews, setPreviews] = useState<{ exam: string | null; solution: string | null }>({
    exam: null,
    solution: null,
  });

  const selectedSubject = watch("subject");

  // --- TanStack Queries ---
  
  const { data: subjectsData, isLoading: loadingSubjects } = useQuery({
    queryKey: ["subjects"],
    queryFn: getSubjects,
  });

  const { data: topicsData, isLoading: loadingTopics } = useQuery({
    queryKey: ["topics", selectedSubject],
    queryFn: () => getTypeExam(selectedSubject),
    enabled: !!selectedSubject, 
  });

  const subjects = subjectsData?.data || [];
  const topics = topicsData?.data || [];

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>, 
    fieldChange: (file: File | null) => void, 
    type: 'exam' | 'solution'
  ) => {
    const file = e.target.files?.[0] || null;
    fieldChange(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => ({ ...prev, [type]: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Section: Basic Info */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Exam Title" fullWidth disabled={isSubmitting} />
          )}
        />
        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth disabled={isSubmitting}>
              <InputLabel>Difficulty</InputLabel>
              <Select {...field} label="Difficulty">
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </Box>

      {/* Section: Classification */}
      <Box className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth disabled={isSubmitting || loadingSubjects}>
              <InputLabel>Subject</InputLabel>
              <Select {...field} label="Subject">
                {subjects.map((s: Subject) => (
                  <MenuItem key={s._id} value={s.title}>{s.title}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth disabled={isSubmitting || !selectedSubject || loadingTopics}>
              <InputLabel>Select Topic</InputLabel>
              <Select {...field} label="Select Topic">
                {topics.map((t: string) => (
                  <MenuItem key={t} value={t}>{t}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="New Topic?" fullWidth placeholder="Type to create new" disabled={isSubmitting} />
          )}
        />
      </Box>

      {/* Section: Logic & Answers */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-slate-50 rounded-xl">
        <Controller
          name="choices"
          control={control}
          render={({ field }) => <TextField {...field} label="Choices Count" type="number" fullWidth disabled={isSubmitting} />}
        />
        <Controller
          name="answer"
          control={control}
          render={({ field }) => <TextField {...field} label="Correct Answer Key" fullWidth placeholder="e.g. 1 or A" disabled={isSubmitting} />}
        />
      </Box>

      <Divider />

      {/* Section: Uploads */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Exam Image */}
        <Box>
          <Typography variant="caption" className="font-bold text-slate-500 uppercase">Question Image</Typography>
          <Controller
            name="image"
            control={control}
            rules={{ required: "Required" }}
            render={({ field, fieldState }) => (
              <Box className={`mt-2 border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center min-h-[150px] transition-colors ${fieldState.error ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-blue-300'}`}>
                {previews.exam ? (
                  <Box className="relative w-full text-center">
                    <img src={previews.exam} className="max-h-32 mx-auto rounded shadow-sm" />
                    <IconButton size="small" className="absolute -top-2 -right-2 bg-white shadow-md hover:bg-red-50" onClick={() => { field.onChange(null); setPreviews(p => ({...p, exam: null})) }}>
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                ) : (
                  <Button component="label" startIcon={<CloudUpload />} disabled={isSubmitting}>
                    Upload Question
                    <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, field.onChange, 'exam')} />
                  </Button>
                )}
                {fieldState.error && <Typography color="error" variant="caption">{fieldState.error.message}</Typography>}
              </Box>
            )}
          />
        </Box>

        {/* Solution Image */}
        <Box>
          <Typography variant="caption" className="font-bold text-slate-500 uppercase">Solution Image</Typography>
          <Controller
            name="answerImage"
            control={control}
            rules={{ required: "Required" }}
            render={({ field, fieldState }) => (
              <Box className={`mt-2 border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center min-h-[150px] transition-colors ${fieldState.error ? 'border-red-300 bg-red-50' : 'border-slate-200 hover:border-blue-300'}`}>
                {previews.solution ? (
                  <Box className="relative w-full text-center">
                    <img src={previews.solution} className="max-h-32 mx-auto rounded shadow-sm" />
                    <IconButton size="small" className="absolute -top-2 -right-2 bg-white shadow-md hover:bg-red-50" onClick={() => { field.onChange(null); setPreviews(p => ({...p, solution: null})) }}>
                      <Delete fontSize="small" color="error" />
                    </IconButton>
                  </Box>
                ) : (
                  <Button component="label" startIcon={<CloudUpload />} color="secondary" disabled={isSubmitting}>
                    Upload Solution
                    <input type="file" hidden accept="image/*" onChange={(e) => handleFileChange(e, field.onChange, 'solution')} />
                  </Button>
                )}
                {fieldState.error && <Typography color="error" variant="caption">{fieldState.error.message}</Typography>}
              </Box>
            )}
          />
        </Box>
      </Box>

      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        size="large" 
        disabled={isSubmitting}
        sx={{ py: 1.5, borderRadius: '12px', fontWeight: 'bold' }}
      >
        {isSubmitting ? <CircularProgress size={24} color="inherit" /> : "Save Examination"}
      </Button>
    </form>
  );
}