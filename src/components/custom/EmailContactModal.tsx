"use client";

import React from 'react';
import UnifiedFormModal from './UnifiedFormModal';

interface EmailContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  emailSubject?: string;
}

export default function EmailContactModal({ isOpen, onClose, title }: EmailContactModalProps) {
  return (
    <UnifiedFormModal
      isOpen={isOpen}
      onClose={onClose}
      formType="interview"
      title={title}
    />
  );
}
