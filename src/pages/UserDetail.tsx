import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import UserSummaryCard from "../components/UserSummaryCard";
import AddressSection from "../components/AddressSection";
import StudiesSection from "../components/StudiesSection";
import StatusMessage from "../components/StatusMessage";
import StudyModal from "../components/StudyModal";
import AddressModal from "../components/AddressModal";
import ConfirmModal from "../components/ConfirmModal";
import PasswordModal from "../components/PasswordModal";
import EmailModal from "../components/EmailModal";
import RoleModal from "../components/RoleModal";
import { useStudies } from "../hooks/useStudies";
import { useAddress } from "../hooks/useAddress";
import { useProfile } from "../hooks/useProfile";
import { usePassword } from "../hooks/usePassword";
import { ArrowLeft, Mail, RefreshCw, UserCog } from "lucide-react";
import { OwnerType, ResourceOwner } from "../types/auth";
import { UserRole } from "../types/user";
import { useUserUpdate } from "../hooks/useUserUpdate";

function UserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: sessionUser } = useAuth();
  const addressesHydrated = useRef(false);
  const studiesHydrated = useRef(false);

  const owner = useMemo<ResourceOwner>(() => ({
    type: OwnerType.User,
    userId: Number(id)
  }), [id]);

  const {
    profile,
    loading: profileLoading,
    error: profileError,
    updateProfileField
  } = useProfile({ owner });

  const {
    handleUpdateEmail,
    handleUpdateRole,
    isUpdating,
    isEmailModalOpen,
    isRoleModalOpen,
    handleOpenEmailModal,
    handleCloseEmailModal,
    handleOpenRoleModal,
    handleCloseRoleModal
  } = useUserUpdate(profile?.id, updateProfileField);

  const {
    isPasswordModalOpen,
    isUpdatingPassword,
    handleOpenPasswordModal,
    handleClosePasswordModal,
    handleUpdatePassword,
  } = usePassword(profile?.email ?? "", sessionUser?.role === UserRole.Admin);

  const {
    studies,
    loading: studiesLoading,
    error: studiesError,
    setStudies,
    isStudyModalOpen,
    selectedStudy,
    isDeleteStudyModalOpen,
    studyToDelete,
    isDeletingStudy,
    handleAddStudy,
    handleEditStudy,
    handleSaveStudy,
    handleDeleteStudy,
    handleCloseStudyModal,
    handleCloseDeleteStudyModal,
    handleConfirmDeleteStudy,
  } = useStudies({ owner });

  const {
    addresses,
    addressToEdit,
    loading: addressLoading,
    error: addressError,
    setAddresses,
    addressToDelete,
    isAddressModalOpen,
    isDeleteAddressModalOpen,
    isDeletingAddress,
    handleOpenAddressModal,
    handleCloseAddressModal,
    handleSaveAddress,
    handleDeleteAddress,
    handleCloseDeleteAddressModal,
    handleConfirmDeleteAddress,
  } = useAddress({ owner });

  useEffect(() => {
    if (!addressesHydrated.current && profile?.addresses) {
      const validAddresses = profile.addresses.filter(
        (address) =>
          address &&
          address.id &&
          (address.street || address.city || address.country)
      );

      setAddresses(validAddresses);
      addressesHydrated.current = true;
    }
  }, [profile?.addresses, setAddresses]);

  useEffect(() => {
    if (!studiesHydrated.current && profile?.studies) {
      setStudies(profile.studies);
      studiesHydrated.current = true;
    }
  }, [profile?.studies, setStudies]);

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <button
        onClick={() => navigate("/users")}
        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 text-gray-800 hover:bg-gray-200 transition text-sm font-semibold mb-6"
      >
        <ArrowLeft size={18} strokeWidth={2.5} />
      </button>

      <div className="px-4 md:px-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Detalles del Usuario</h2>
          <p className="text-sm text-gray-500">Información completa del usuario seleccionado</p>
        </div>

        <StatusMessage loading={profileLoading} error={profileError} loadingText="Cargando detalles..." />

        {!profileLoading && !profileError && profile && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <UserSummaryCard
                label="Correo"
                value={profile.email}
                button={
                  <button
                    onClick={handleOpenEmailModal}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 transition text-gray-700"
                  >
                    <Mail size={14} />
                    Editar
                  </button>
                }
              />

              <UserSummaryCard
                label="Rol"
                value={profile.role}
                button={
                  <button
                    onClick={handleOpenRoleModal}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 transition text-gray-700"
                  >
                    <UserCog size={14} />
                    Editar
                  </button>
                }
              />

              <UserSummaryCard
                label="Contraseña"
                value="••••••••"
                button={
                  <button
                    onClick={handleOpenPasswordModal}
                    className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-semibold hover:bg-gray-50 transition text-gray-700"
                  >
                    <RefreshCw size={14} />
                    Restablecer
                  </button>
                }
              />
            </div>

            <div className="space-y-4">
              <StatusMessage loading={addressLoading} error={addressError} loadingText="Cargando direcciones..." />
              {!addressLoading && !addressError && (
                <AddressSection
                  addresses={addresses}
                  subtitle="Direcciones registradas del usuario"
                  onAdd={() => handleOpenAddressModal()}
                  onEdit={(address) => handleOpenAddressModal(address)}
                  onDelete={(id) => handleDeleteAddress(id)}
                />
              )}
            </div>

            <div className="space-y-4">
              <StatusMessage loading={studiesLoading} error={studiesError} loadingText="Cargando estudios..." />
              {!studiesLoading && !studiesError && (
                <StudiesSection
                  studies={studies}
                  subtitle="Estudios académicos del usuario"
                  onAdd={handleAddStudy}
                  onEdit={handleEditStudy}
                  onDelete={handleDeleteStudy}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={handleCloseEmailModal}
        onSave={handleUpdateEmail}
        currentEmail={profile?.email ?? ""}
        isLoading={isUpdating}
      />

      <RoleModal
        isOpen={isRoleModalOpen}
        onClose={handleCloseRoleModal}
        onSave={handleUpdateRole}
        currentRole={profile?.role as UserRole}
        isLoading={isUpdating}
      />

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
        onSave={handleUpdatePassword}
        isLoading={isUpdatingPassword}
        isAdmin={sessionUser?.role === UserRole.Admin}
        isOwnProfile={sessionUser?.email === profile?.email}
      />

      <StudyModal
        userId={profile?.id}
        isOpen={isStudyModalOpen}
        onClose={handleCloseStudyModal}
        onSave={handleSaveStudy}
        studyToEdit={selectedStudy}
      />

      <AddressModal
        userId={profile?.id}
        isOpen={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onSave={handleSaveAddress}
        addressToEdit={addressToEdit}
      />

      <ConfirmModal
        isOpen={isDeleteStudyModalOpen}
        title="Eliminar estudio"
        message={studyToDelete ? `¿Eliminar "${studyToDelete.title}"?` : "¿Eliminar estudio?"}
        confirmText="Eliminar"
        onClose={handleCloseDeleteStudyModal}
        onConfirm={handleConfirmDeleteStudy}
        isLoading={isDeletingStudy}
      />

      <ConfirmModal
        isOpen={isDeleteAddressModalOpen}
        title="Eliminar Dirección"
        message={addressToDelete ? `¿Eliminar "${addressToDelete.street}"?` : "¿Eliminar dirección?"}
        confirmText="Eliminar"
        onClose={handleCloseDeleteAddressModal}
        onConfirm={handleConfirmDeleteAddress}
        isLoading={isDeletingAddress}
      />
    </div>
  );
}

export default UserDetail;