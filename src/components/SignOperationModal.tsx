import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';

interface SignOperationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: {
    startTime: string;
    endTime: string;
    measurement: string;
    notes?: string;
  }) => void;
}

export function SignOperationModal({ isOpen, onClose, onConfirm }: SignOperationModalProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    onConfirm({
      startTime: formData.get('startTime') as string,
      endTime: formData.get('endTime') as string,
      measurement: formData.get('measurement') as string,
      notes: formData.get('notes') as string,
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/60" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-6 w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">
            Assinar Operação
          </Dialog.Title>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hora Início
                </label>
                <input
                  type="time"
                  name="startTime"
                  required
                  className="w-full rounded border-gray-300 shadow-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Hora Fim
                </label>
                <input
                  type="time"
                  name="endTime"
                  required
                  className="w-full rounded border-gray-300 shadow-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Medição
              </label>
              <input
                type="number"
                name="measurement"
                step="0.001"
                required
                className="w-full rounded border-gray-300 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Observações
              </label>
              <textarea
                name="notes"
                rows={3}
                className="w-full rounded border-gray-300 shadow-sm"
              />
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
              >
                Confirmar
              </button>
            </div>
          </form>

          <Dialog.Close className="absolute top-4 right-4">
            <X className="h-4 w-4" />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

