import { useAuth } from "../context/AuthContext";
import StudyModal from "../components/StudyModal";
import AddressModal from "../components/AddressModal";
import UserSummaryCard from "../components/UserSummaryCard";
import AddressSection from "../components/AddressSection";
import StudiesSection from "../components/StudiesSection";
import StatusMessage from "../components/StatusMessage";
import ConfirmModal from "../components/ConfirmModal";
import PasswordModal from "../components/PasswordModal";
import EmailModal from "../components/EmailModal";
import { useStudies } from "../hooks/useStudies";
import { useAddress } from "../hooks/useAddress";
import { useProfile } from "../hooks/useProfile";
import { usePassword } from "../hooks/usePassword";
import { useUserUpdate } from "../hooks/useUserUpdate";
import { OwnerType, ResourceOwner } from "../types/auth";
import { UserRole } from "../types/user";
import { Mail } from "lucide-react";
import { useEffect, useRef } from "react";

function Profile() {
  const { user: authUser } = useAuth();
  const owner: ResourceOwner = { type: OwnerType.Me };
  const addressesHydrated = useRef(false);
  const studiesHydrated = useRef(false);

  const {
    profile,
    loading: profileLoading,
    error: profileError,
    updateProfileField,
  } = useProfile({ owner });

  const {
    handleUpdateEmail,
    isUpdating,
    isEmailModalOpen,
    handleOpenEmailModal,
    handleCloseEmailModal,
  } = useUserUpdate(profile?.id, updateProfileField);

  const {
    isPasswordModalOpen,
    isUpdatingPassword,
    handleOpenPasswordModal,
    handleClosePasswordModal,
    handleUpdatePassword,
  } = usePassword(profile?.email ?? "", authUser?.role === UserRole.Admin);

  const {
    studies,
    setStudies,
    loading: studiesLoading,
    error: studiesError,
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
    setAddresses,
    addressToEdit,
    loading: addressLoading,
    error: addressError,
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
      setAddresses(profile.addresses);
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
    <>
      <div className="bg-white rounded-2xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Mi Perfil</h2>

          {!profileLoading && !profileError && (
            <button
              onClick={handleOpenPasswordModal}
              className="text-sm font-semibold bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cambiar Contraseña
            </button>
          )}
        </div>

        <StatusMessage
          loading={profileLoading}
          error={profileError}
          loadingText="Cargando perfil..."
        />

        {!profileLoading && !profileError && profile && (
          <div className="space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              />
            </div>

            <div className="space-y-4">
              <StatusMessage
                loading={addressLoading}
                error={addressError}
                loadingText="Cargando direcciones..."
              />
              {!addressLoading && !addressError && (
                <AddressSection
                  addresses={addresses}
                  subtitle=""
                  onAdd={() => handleOpenAddressModal()}
                  onEdit={(address) => handleOpenAddressModal(address)}
                  onDelete={handleDeleteAddress}
                />
              )}
            </div>

            <div className="space-y-4">
              <StatusMessage
                loading={studiesLoading}
                error={studiesError}
                loadingText="Cargando estudios..."
              />
              {!studiesLoading && !studiesError && (
                <StudiesSection
                  studies={studies}
                  subtitle=""
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

      <PasswordModal
        isOpen={isPasswordModalOpen}
        onClose={handleClosePasswordModal}
        onSave={handleUpdatePassword}
        isLoading={isUpdatingPassword}
        isAdmin={authUser?.role === UserRole.Admin}
        isOwnProfile={authUser?.email === profile?.email}
      />

      <StudyModal
        isOpen={isStudyModalOpen}
        onClose={handleCloseStudyModal}
        onSave={handleSaveStudy}
        studyToEdit={selectedStudy}
      />

      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={handleCloseAddressModal}
        onSave={handleSaveAddress}
        addressToEdit={addressToEdit}
        userId={null}
      />

      <ConfirmModal
        isOpen={isDeleteStudyModalOpen}
        title="Eliminar estudio"
        message={
          studyToDelete
            ? `¿Estás seguro que quieres eliminar "${studyToDelete.title}"?`
            : "¿Estás seguro que quieres eliminar este estudio?"
        }
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={handleCloseDeleteStudyModal}
        onConfirm={handleConfirmDeleteStudy}
        isLoading={isDeletingStudy}
      />

      <ConfirmModal
        isOpen={isDeleteAddressModalOpen}
        title="Eliminar Dirección"
        message="¿Está seguro que quiere eliminar esta dirección?"
        confirmText="Eliminar"
        cancelText="Cancelar"
        onClose={handleCloseDeleteAddressModal}
        onConfirm={handleConfirmDeleteAddress}
        isLoading={isDeletingAddress}
      />
    </>
  );
}

export default Profile;