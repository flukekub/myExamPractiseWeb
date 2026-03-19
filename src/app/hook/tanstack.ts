import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import getSubjects from "@/libs/api/getSubjects";
import type { Subject, Exam } from "../../../interface";
import getTypeExam from "@/libs/api/getTypeExam";
import getExamsByTypePage from "@/libs/api/getExamsByTypePage";
import getExamsByType from "@/libs/api/getExamsByType";
import getExam from "@/libs/api/getExam";
import createExam from "@/libs/api/createExam";
import Cookies from "js-cookie";
import type { ExamInputType } from "@/components/ExamForm";

export const useSubjects = () => {
  return useQuery<Subject[]>({
    queryKey: ["subjects"], 
    queryFn: async () => {
      const res = await getSubjects();
      return res.data;
    },
    staleTime: 1000 * 60 * 5, 
  });
};

export const useTopics = (subject: string) => {
  return useQuery({
    queryKey: ["topics", subject], 
    queryFn: async () => {
      const res = await getTypeExam(subject);
      return res.data;
    },
    enabled: !!subject, 
  });
};

export const useExamsPage = (type: string, page: number) => {
  return useQuery({
    queryKey: ["exams", type, page], 
    queryFn: async () => {
      const res = await getExamsByTypePage(type, page);
      return res; 
    },
    placeholderData: (previousData) => previousData, 
    staleTime: 1000 * 60 * 10, 
  });
};

export const useExams = (type: string) => {
  return useQuery({
    queryKey: ["exams", type],
    queryFn: async () => {
      const res = await getExamsByType(type);
      return res.data as Exam[];
    },
    enabled: !!type,
    staleTime: 1000 * 60 * 5, 
  });
};

export const useExam = (id: string, type: string) => {
  return useQuery({
    queryKey: ["exam", id, type],
    queryFn: async () => {
      const res = await getExam(id, type);
      return res.data; // This returns { currentExam, previousExamId, nextExamId }
    },
    enabled: !!id && !!type,
    staleTime: 1000 * 60 * 30, // Exams don't change often, keep for 30 mins
  });
};

export const useCreateExam = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
      queryClient.invalidateQueries({ queryKey: ["exams"] });
    },
  });
};