import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog';
import type { FC } from 'react';

interface ModalProps {
  children?: React.ReactNode;
  isOpen: boolean;
  onToggle: (isOpen: boolean) => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onToggle }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onToggle}>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>{children}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
