'use client';
import React from 'react';

export function CheckoutForm() {
  return (
    <form className="space-y-3">
      <div>
        <label className="block text-sm">Name</label>
        <input className="border rounded px-3 py-2 w-full" placeholder="Jane Doe" />
      </div>
      <div>
        <label className="block text-sm">Address</label>
        <input className="border rounded px-3 py-2 w-full" placeholder="123 Main St" />
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Pay</button>
    </form>
  );
}
