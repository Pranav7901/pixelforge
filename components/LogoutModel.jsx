'use client';

import React from 'react';

export default function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white text-black p-6 rounded-lg shadow-lg w-full max-w-sm mx-4">
        <h2 className="text-lg font-semibold mb-4">Log out</h2>
        <p className="mb-4">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}