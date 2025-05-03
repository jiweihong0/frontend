import React from 'react';

interface SuggestionProps {
  onSuggestionClick: (suggestion: string) => void;
}

const SecureSuggestions: React.FC<SuggestionProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    "wazuh 偵測到的威脅?",
    "如何防範勒索軟體攻擊?",
    "什麼是CVE-2023-4966 (Citrix Bleed)漏洞?",
    "Log4j漏洞的影響範圍如何?",
    "如何檢測系統是否被植入後門程式?",
    "常見的資安事件有哪些類型?",
    "OWASP Top 10 最新的安全風險有哪些?",
    "如何保護API安全?",
    "最近偵測到哪些重大安全威脅?",
  ];

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      <div className="text-center max-w-2xl">
        <h3 className="text-xl font-medium text-gray-800 mb-2">您可以詢問關於資安的問題</h3>
        <p className="text-gray-600 mb-6">這些是一些您可能感興趣的資安主題</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            className="text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SecureSuggestions; 