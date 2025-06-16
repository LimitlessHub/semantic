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
      {/* --- FINAL FIX: Using a simple flex container. The `dir="rtl"` on the <html> tag will handle the reversal automatically. --- */}
      <div className="flex w-full border-b border-white/10">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={`flex-1 py-2.5 px-2 text-sm font-medium transition-colors duration-300 border-b-2 ${
                isActive
                  ? 'border-blue-400 text-white'
                  : 'border-transparent text-blue-200/70 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
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
