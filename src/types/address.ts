export interface AddressBase {
  street: string;
  city: string;
  country: string;
}

export interface Address extends AddressBase {
  id: number;
  userId?: number;
}

export interface CreateAddressRequest extends AddressBase {
  userId?: number;
}

export interface UpdateAddressRequest extends AddressBase {}

export interface AddressFormData extends AddressBase {}

export type AddressResponse = Address;

export interface AddressState {
  addresses: Address[];
  loading: boolean;
  error: string;
}

export interface AddressSectionProps {
  addresses: Address[];
  subtitle: string;
  onAdd: () => void;
  onEdit: (address: Address) => void;
  onDelete: (id: number) => void;
}