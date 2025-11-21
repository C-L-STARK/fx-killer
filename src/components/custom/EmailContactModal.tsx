"use client";

import React from 'react';
import UnifiedFormModal from './UnifiedFormModal';

interface EmailContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  emailSubject?: string;
  formType?: 'interview' | 'contact' | 'propfirm' | 'membership' | 'dna-interview' | 'copy-trading';
}

export default function EmailContactModal({ isOpen, onClose, title, formType = 'interview' }: EmailContactModalProps) {
  return (
    <UnifiedFormModal
      isOpen={isOpen}
      onClose={onClose}
      formType={formType}
      title={title}
    />
  );
}
