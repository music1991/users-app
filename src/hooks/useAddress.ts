import { useEffect, useMemo, useState } from "react";
import {
  createAddress,
  deleteAddress,
  getAddress,
  updateAddress,
} from "../api/addressApi";
import {
  Address,
  CreateAddressRequest,
  UpdateAddressRequest,
} from "../types/address";
import { UseAddressOptions } from "../types/user";

export function useAddress({ owner }: UseAddressOptions) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
  const [addressIdToDelete, setAddressIdToDelete] = useState<number | null>(null);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDeleteAddressModalOpen, setIsDeleteAddressModalOpen] = useState(false);
  const [isDeletingAddress, setIsDeletingAddress] = useState(false);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getAddress(owner);

      if (!data) {
        setAddresses([]);
        return;
      }

      const normalized = Array.isArray(data) ? data : [data];

      const validAddresses = normalized.filter(
        (address) =>
          address &&
          address.id &&
          (address.street || address.city || address.country)
      );

      setAddresses(validAddresses);
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al cargar direcciones");
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  const addressToEdit = useMemo(
    () => addresses.find((a) => a.id === selectedAddressId) || null,
    [addresses, selectedAddressId]
  );

  const addressToDelete = useMemo(
    () => addresses.find((a) => a.id === addressIdToDelete) || null,
    [addresses, addressIdToDelete]
  );

  const handleOpenAddressModal = (address?: Address) => {
    setSelectedAddressId(address?.id || null);
    setIsAddressModalOpen(true);
  };

  const handleCloseAddressModal = () => {
    setSelectedAddressId(null);
    setIsAddressModalOpen(false);
  };

  const handleSaveAddress = async (
    payload: CreateAddressRequest | UpdateAddressRequest
  ) => {
    try {
      setError("");
      if (selectedAddressId) {
        await updateAddress(selectedAddressId, payload);
      } else {
        await createAddress(payload);
      }
      handleCloseAddressModal();
      await fetchAddresses();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al guardar direccion");
      throw err;
    }
  };

  const handleDeleteAddress = (id: number) => {
    setAddressIdToDelete(id);
    setIsDeleteAddressModalOpen(true);
  };

  const handleCloseDeleteAddressModal = () => {
    setAddressIdToDelete(null);
    setIsDeleteAddressModalOpen(false);
  };

  const handleConfirmDeleteAddress = async () => {
    if (!addressIdToDelete) return;
    try {
      setError("");
      setIsDeletingAddress(true);
      await deleteAddress(addressIdToDelete);
      handleCloseDeleteAddressModal();
      await fetchAddresses();
    } catch (err: any) {
      setError(err.response?.data?.message || "Error al borrar direccion");
    } finally {
      setIsDeletingAddress(false);
    }
  };

  return {
    addresses,
    addressToEdit,
    loading,
    error,
    owner,
    setAddresses,
    isAddressModalOpen,
    handleOpenAddressModal,
    handleCloseAddressModal,
    handleSaveAddress,
    isDeleteAddressModalOpen,
    addressToDelete,
    isDeletingAddress,
    handleDeleteAddress,
    handleCloseDeleteAddressModal,
    handleConfirmDeleteAddress,
  };
}