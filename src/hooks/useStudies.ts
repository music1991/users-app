import { useEffect, useMemo, useState } from "react";
import {
  createStudy,
  deleteStudy,
  getStudies,
  updateStudy,
} from "../api/studiesApi";
import { CreateStudyRequest, Study, UseStudiesOptions } from "../types/study";

export function useStudies({ owner }: UseStudiesOptions) {
  const [studies, setStudies] = useState<Study[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [isStudyModalOpen, setIsStudyModalOpen] = useState(false);
  const [selectedStudyId, setSelectedStudyId] = useState<number | null>(null);

  const [isDeleteStudyModalOpen, setIsDeleteStudyModalOpen] = useState(false);
  const [studyIdToDelete, setStudyIdToDelete] = useState<number | null>(null);
  const [isDeletingStudy, setIsDeletingStudy] = useState(false);

  const fetchStudies = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getStudies(owner);
      setStudies(data);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar Estudios");
    } finally {
      setLoading(false);
    }
  };

  const selectedStudy = useMemo(
    () => studies.find((study) => study.id === selectedStudyId) || null,
    [studies, selectedStudyId]
  );

  const studyToDelete = useMemo(
    () => studies.find((study) => study.id === studyIdToDelete) || null,
    [studies, studyIdToDelete]
  );

  const handleAddStudy = () => {
    setSelectedStudyId(null);
    setIsStudyModalOpen(true);
  };

  const handleEditStudy = (id: number) => {
    setSelectedStudyId(id);
    setIsStudyModalOpen(true);
  };

  const handleCloseStudyModal = () => {
    setSelectedStudyId(null);
    setIsStudyModalOpen(false);
  };

  const handleSaveStudy = async (payload: CreateStudyRequest) => {
    try {
      setError("");
      if (selectedStudyId) {
        await updateStudy(selectedStudyId, payload);
      } else {
        await createStudy(payload);
      }
      handleCloseStudyModal();
      await fetchStudies();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al guardar Estudio");
      throw err;
    }
  };

  const handleDeleteStudy = (id: number) => {
    setStudyIdToDelete(id);
    setIsDeleteStudyModalOpen(true);
  };

  const handleCloseDeleteStudyModal = () => {
    setStudyIdToDelete(null);
    setIsDeleteStudyModalOpen(false);
  };

  const handleConfirmDeleteStudy = async () => {
    if (!studyIdToDelete) return;
    try {
      setError("");
      setIsDeletingStudy(true);
      await deleteStudy(studyIdToDelete);
      handleCloseDeleteStudyModal();
      await fetchStudies();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al eliminar Estudio");
    } finally {
      setIsDeletingStudy(false);
    }
  };

  return {
    studies,
    loading,
    error,
    setStudies,
    isStudyModalOpen,
    selectedStudy,
    handleAddStudy,
    handleEditStudy,
    handleCloseStudyModal,
    handleSaveStudy,
    isDeleteStudyModalOpen,
    studyToDelete,
    isDeletingStudy,
    handleDeleteStudy,
    handleCloseDeleteStudyModal,
    handleConfirmDeleteStudy,
  };
}