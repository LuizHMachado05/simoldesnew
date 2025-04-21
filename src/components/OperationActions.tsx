import React from 'react';
import { Eye, CheckCircle2 } from 'lucide-react';

interface OperationActionsProps {
  operationId: number;
  completed: boolean;
  onView: (e: React.MouseEvent) => void;
  onSign: (e: React.MouseEvent) => void;
  isHistory?: boolean;
}

export function OperationActions({ 
  operationId, 
  completed, 
  onView, 
  onSign,
  isHistory = false 
}: OperationActionsProps) {
  return (
    <div className="flex flex-col gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onView(e);
        }}
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Eye className="h-4 w-4 mr-1" />
        Visualizar
      </button>
      
      {!completed && !isHistory && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSign(e);
          }}
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <CheckCircle2 className="h-4 w-4 mr-1" />
          Assinar
        </button>
      )}
    </div>
  );
}



