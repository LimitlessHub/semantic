import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

type Tab = {
  value: string;
  label: string;
  content: React.ReactNode;
};

interface CustomTabsProps {
  tabs: Tab[];
  defaultValue: string;
}

export const CustomTabs: React.FC<CustomTabsProps> = ({ tabs, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const { language } = useLanguage();

  return (
    <div className="w-full">
      <div className="flex w-full border-b border-white/10">
        {/* --- FINAL FIX: We are not reversing the array. We render LTR order, and use flex-row-reverse to handle visual order. --- */}
        {/* This is the most reliable way to ensure tab order is correct in RTL */}
        <div className={`flex w-full ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.value;
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`flex-1 py-2.5 text-sm font-medium transition-colors duration-300 border-b-2 ${
                  isActive
                    ? 'border-blue-400 text-white' // Active state
                    : 'border-transparent text-blue-200/70 hover:text-white' // Inactive state
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        {tabs.map((tab) => (
          <div key={tab.value} className={activeTab === tab.value ? 'block' : 'hidden'}>
            {tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};
