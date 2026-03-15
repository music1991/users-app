type StatusMessageProps = {
  loading?: boolean;
  error?: string;
  loadingText?: string;
};

function StatusMessage({
  loading,
  error,
  loadingText = "Cargando...",
}: StatusMessageProps) {
  if (loading) {
    return <p className="text-gray-500">{loadingText}</p>;
  }

  if (error) {
    return (
      <p className="text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
        {error}
      </p>
    );
  }

  return null;
}

export default StatusMessage;