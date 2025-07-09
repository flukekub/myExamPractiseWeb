import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import { ReactNode, use, useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, MenuItem } from "@mui/material";
import { Exam, Subject } from "../../interface";
import getSubjects from "@/libs/api/getSubjects";
import getTypeExam from "@/libs/api/getTypeExam";

interface CreateExamFormProps {
  onSubmit: (data: ExamInputType) => void;
}
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

const initialValues: ExamInputType = {
  name: "",
  subject: "",
  topic: "",
  answer: "",
  image: null,
  difficulty: "",
  answerImage: null,
  choices: "",
};

export default function ExamForm({ onSubmit }: CreateExamFormProps) {
  const { control, handleSubmit, reset, watch } = useForm({
    defaultValues: initialValues,
  });
  const [preview, setPreview] = useState<string | null>(null);
  const [imageAnswerPreview, setImageAnswerPreview] = useState<string | null>(
    null
  );
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [load, setLoad] = useState(false);
  const selectedSubject = watch("subject");
  const [topics, setTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoad(true);
      try {
        const res = await getSubjects();
        if (!subjects) {
          console.error("Failed to fetch subjects");
        }
        setSubjects(res.data);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      } finally {
        setLoad(false);
      }
    };

    fetchSubjects();
  }, []);

  useEffect(() => {
    const fetchTypeExam = async () => {
      if (!selectedSubject) return;
      try {
        const res = await getTypeExam(selectedSubject);
        if (!res) {
          console.error("Failed to fetch exam types");
        }
        setTopics(res.data);
      } catch (error) {
        console.error("Error fetching exam types:", error);
      }
    };
    fetchTypeExam();
  }, [selectedSubject]);

  const onFormSubmit = (data: ExamInputType) => {
    if (!data.image) {
      // Optionally, you can show an error or return early
      return;
    }
    onSubmit({ ...data });
    console.log("Submitted data:", data);
    reset();
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col gap-4">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <TextField label="Exam Name" fullWidth {...field} />
        )}
      />
      <div className="flex gap-4">
        <Controller
          name="subject"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="select-subject-label">Subject</InputLabel>
              <Select
                labelId="select-subject-label"
                id="select-subject-label"
                label="Subject"
                value={field.value}
                onChange={field.onChange}
              >
                {load ? (
                  <MenuItem value="" disabled>
                    Loading subjects...
                  </MenuItem>
                ) : (
                  subjects.map((subject: Subject) => (
                    <MenuItem key={subject._id} value={subject.title}>
                      {subject.title}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="select-topic-label">Topic</InputLabel>
              <Select
                labelId="select-topic-label"
                id="select-topic-label"
                label="Topic"
                value={field.value}
                onChange={field.onChange}
              >
                {load ? (
                  <MenuItem value="" disabled>
                    Loading topics...
                  </MenuItem>
                ) : (
                  topics.map((topic) => (
                    <MenuItem key={topic} value={topic}>
                      {topic}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          )}
        />
        <Controller
          name="topic"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <TextField label="new topic ?" fullWidth {...field} />
            </FormControl>
          )}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex gap-4">
          <Controller
            name="choices"
            control={control}
            render={({ field }) => (
              <TextField label="กี่ตัวเลือก" fullWidth {...field} />
            )}
          />
          <Controller
            name="answer"
            control={control}
            render={({ field }) => (
              <TextField label="Answer" fullWidth {...field} />
            )}
          />
        </div>
        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="select-difficulty-label">Difficulty</InputLabel>
              <Select
                labelId="select-difficulty-label"
                id="select-difficulty-label"
                label="Difficulty"
                value={field.value}
                onChange={field.onChange}
              >
                <MenuItem value="easy">Easy</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="hard">Hard</MenuItem>
              </Select>
            </FormControl>
          )}
        />
      </div>
      <div className="flex  gap-10">
        <Controller
          name="image"
          control={control}
          rules={{ required: "กรุณาอัปโหลดรูปภาพข้อสอบ" }}
          render={({ field, fieldState }) => (
            <div>
              <label className="block mb-1 text-gray-700">Upload Exam</label>
              <IconButton color="primary" component="label">
                <ImageIcon />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setPreview(reader.result as string);
                      reader.readAsDataURL(file);
                    } else {
                      setPreview(null);
                    }
                  }}
                />
              </IconButton>
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-2 max-h-40 rounded"
                />
              )}
              {fieldState.error && (
                <div className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </div>
              )}
            </div>
          )}
        />
        <Controller
          name="answerImage"
          control={control}
          rules={{ required: "กรุณาอัปโหลดเฉลยข้อสอบ" }}
          render={({ field, fieldState }) => (
            <div>
              <label className="block mb-1 text-gray-700">
                Upload solution
              </label>
              <IconButton color="primary" component="label">
                <ImageIcon />
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    field.onChange(file);
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setImageAnswerPreview(reader.result as string);
                      reader.readAsDataURL(file);
                    } else {
                      setImageAnswerPreview(null);
                    }
                  }}
                />
              </IconButton>
              {imageAnswerPreview && (
                <img
                  src={imageAnswerPreview}
                  alt="Preview"
                  className="mt-2 max-h-40 rounded"
                />
              )}
              {fieldState.error && (
                <div className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </div>
              )}
            </div>
          )}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
}
