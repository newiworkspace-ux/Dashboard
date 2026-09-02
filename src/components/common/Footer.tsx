import React from 'react';

interface FooterProps {
  onAdminClick?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminClick }) => {
  return (
    <footer className="mt-auto bg-[#0070ba] text-white py-4 px-6 border-t border-sky-800">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-6 text-sky-100 font-medium">
          <button
            onClick={onAdminClick}
            className="hover:text-white hover:underline transition-colors"
          >
            Admin
          </button>
          <span className="text-sky-300/60">&bull;</span>
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              alert('Northern Railway Media & PR Portal - Privacy Policy: All press releases and published materials are official government archives.');
            }}
            className="hover:text-white hover:underline transition-colors"
          >
            Privacy Policy
          </a>
          <span className="text-sky-300/60">&bull;</span>
          <a
            href="#terms"
            onClick={(e) => {
              e.preventDefault();
              alert('Northern Railway - Terms & Conditions: For authorized public relations and press officer monitoring.');
            }}
            className="hover:text-white hover:underline transition-colors"
          >
            Terms & Conditions
          </a>
        </div>

        <div className="text-sky-100 text-[11px]">
          Copyright &copy; Northern Railway {new Date().getFullYear()}
        </div>
      </div>
    </footer>
  );
};
