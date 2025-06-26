import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ImageIcon from "@mui/icons-material/Image";
import { ReactNode, useEffect, useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { FormControl, MenuItem } from "@mui/material";
import { Subject } from "../../interface";
import getSubjects from "@/libs/getSubjects";

interface CreateExamFormProps {
  onSubmit: (data: {
    topic: string;
    subject: string;
    name: string;
    answer: string;
    image: File | null;
    difficulty?: string;
  }) => void;
  initialValues?: {
    name?: string;
    subject?: string;
    topic?: string;
    answer?: string;
    difficulty?: string;
  };
}

export default function ExamForm({
  onSubmit,
  initialValues,
}: CreateExamFormProps) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      name: initialValues?.name || "",
      subjects: initialValues?.subject || "",
      topics: initialValues?.topic || "",
      answer: initialValues?.answer || "",
      difficulty: initialValues?.difficulty || "",
    },
  });
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [load, setLoad] = useState(false);

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

  const onFormSubmit = (data: any) => {
    onSubmit({ ...data, image });
    reset();
    setImage(null);
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
          name="subjects"
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
          name="topics"
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
                {/* ใส่ options ของ topic ตาม subject ที่เลือก */}
              </Select>
            </FormControl>
          )}
        />
      </div>
      <div className="flex gap-4">
        <Controller
          name="answer"
          control={control}
          render={({ field }) => (
            <TextField label="Answer" fullWidth {...field} />
          )}
        />

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

      <div>
        <label className="block mb-1 text-gray-700">Upload Exam</label>
        <IconButton color="primary" component="label">
          <ImageIcon />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </IconButton>
        {preview && (
          <img src={preview} alt="Preview" className="mt-2 max-h-40 rounded" />
        )}
      </div>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  );
}
