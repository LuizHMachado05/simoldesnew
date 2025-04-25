import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import { format } from 'date-fns';
import { CheckIcon } from 'lucide-react';
import { operationValidationSchema, type OperationValidationData } from '../schemas/validation';
import { type Operation } from '../types';

interface ValidationModalProps {
  operation: Operation;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OperationValidationData) => void;
}

export function ValidationModal({ operation, isOpen, onClose, onSubmit }: ValidationModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<OperationValidationData>({
    resolver: zodResolver(operationValidationSchema),
    defaultValues: {
      startTime: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
      visualInspection: false,
      dimensionalControl: false,
      measurements: operation.measurements.required.map(m => ({
        id: m.id,
        value: '',
        description: m.description
      }))
    }
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg max-w-2xl w-full p-6 shadow-xl">
          <Dialog.Title className="text-xl font-bold mb-4">
            Validação da Operação {operation.sequence}
          </Dialog.Title>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Início da Operação
                </label>
                <input
                  type="datetime-local"
                  {...register('startTime')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.startTime && (
                  <span className="text-xs text-red-500">{errors.startTime.message}</span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Fim da Operação
                </label>
                <input
                  type="datetime-local"
                  {...register('endTime')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
                {errors.endTime && (
                  <span className="text-xs text-red-500">{errors.endTime.message}</span>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-700">
                Medições Requeridas
              </h3>
              {operation.measurements.required.map((measurement, index) => (
                <div key={measurement.id} className="flex items-center space-x-4">
                  <span className="text-sm w-1/3">{measurement.description}</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      step="0.001"
                      {...register(`measurements.${index}.value`)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                    {errors.measurements?.[index]?.value && (
                      <span className="text-xs text-red-500">
                        {errors.measurements[index]?.value?.message}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <Checkbox.Root
                  className="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  checked={watch('visualInspection')}
                  onCheckedChange={(checked) => setValue('visualInspection', !!checked)}
                >
                  <Checkbox.Indicator>
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-sm text-gray-700">Inspeção Visual Realizada</span>
              </label>

              <label className="flex items-center space-x-2">
                <Checkbox.Root
                  className="h-4 w-4 rounded border border-gray-300 focus:ring-2 focus:ring-blue-500"
                  checked={watch('dimensionalControl')}
                  onCheckedChange={(checked) => setValue('dimensionalControl', !!checked)}
                >
                  <Checkbox.Indicator>
                    <CheckIcon className="h-4 w-4 text-blue-600" />
                  </Checkbox.Indicator>
                </Checkbox.Root>
                <span className="text-sm text-gray-700">Controle Dimensional Realizado</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Observações
              </label>
              <textarea
                {...register('notes')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Validar e Assinar
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}