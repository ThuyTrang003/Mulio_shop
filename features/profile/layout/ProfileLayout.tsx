'use client';

import React, { useState } from 'react';
import UserProfileForm from '@/features/profile/components/info-form';
import ChangePasswordForm from '@/features/profile/components/chancepass-form';
import PurchaseHistory from '@/features/profile/components/purchase-history';

export default function ProfileLayout() {
  const [activeForm, setActiveForm] = useState('userInfo'); // Mặc định hiển thị 'Thông tin cá nhân'

  const renderActiveForm = () => {
    switch (activeForm) {
      case 'userInfo':
        return <UserProfileForm />;
      case 'changePassword':
        return <ChangePasswordForm />;
      case 'purchaseHistory':
        return <PurchaseHistory />;
      default:
        return <UserProfileForm />;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6 flex">
      {/* Cột trái: Danh sách mục */}
      <div className="w-1/3 space-y-4 pl-10">
        <button
          onClick={() => setActiveForm('userInfo')}
          className={`w-full text-left px-4 py-2 rounded-lg ${
            activeForm === 'userInfo' ? 'font-bold' : 'hover:bg-gray-100'
          }`}
        >
          Thông tin cá nhân
        </button>
        <button
          onClick={() => setActiveForm('changePassword')}
          className={`w-full text-left px-4 py-2 rounded-lg ${
            activeForm === 'changePassword' ? 'font-bold' : 'hover:bg-gray-100'
          }`}
        >
          Đổi mật khẩu
        </button>
        <button
          onClick={() => setActiveForm('purchaseHistory')}
          className={`w-full text-left px-4 py-2 rounded-lg ${
            activeForm === 'purchaseHistory' ? 'font-bold' : 'hover:bg-gray-100'
          }`}
        >
          Lịch sử mua hàng
        </button>
      </div>

      {/* Cột phải: Hiển thị form tương ứng */}
      <div className="w-2/3 bg-white rounded-lg p-6">
        {renderActiveForm()}
      </div>
    </div>
  );
}
