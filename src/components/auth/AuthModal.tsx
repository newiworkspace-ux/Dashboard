import React, { useState } from 'react';
import {
  User,
  Lock,
  Mail,
  Phone,
  Building,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  X,
  ArrowRight,
  Sparkles,
  KeyRound,
  LogIn,
  UserPlus
} from 'lucide-react';
import { AuthUser, MasterDivision, RoleItem } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode?: 'login' | 'signup';
  onClose: () => void;
  onLoginSuccess: (user: AuthUser) => void;
  onSignupSuccess: (user: AuthUser) => void;
  divisions?: MasterDivision[];
  roles?: RoleItem[];
  isEmbedded?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode = 'login',
  onClose,
  onLoginSuccess,
  onSignupSuccess,
  divisions = [
    { id: 1, name: 'Delhi', createdDate: '', updatedDate: '' },
    { id: 2, name: 'Moradabad', createdDate: '', updatedDate: '' },
    { id: 3, name: 'Lucknow', createdDate: '', updatedDate: '' },
    { id: 4, name: 'Ambala', createdDate: '', updatedDate: '' },
    { id: 5, name: 'Ferozpur', createdDate: '', updatedDate: '' },
    { id: 6, name: 'Headquarters (Baroda House)', createdDate: '', updatedDate: '' },
  ],
  isEmbedded = false,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('iamkumarsandeep12@gmail.com');
  const [loginPassword, setLoginPassword] = useState('Admin@12345');
  const [rememberMe, setRememberMe] = useState(true);

  // Signup form state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupDivision, setSignupDivision] = useState(divisions[0]?.name || 'Moradabad');
  const [signupRole, setSignupRole] = useState('Public Relations Officer');
  const [signupDepartment, setSignupDepartment] = useState('Public Relations & Media Cell');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');

  // Forgot password modal/state
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  if (!isOpen && !isEmbedded) return null;

  // Preset quick demo logins
  const demoAccounts: AuthUser[] = [
    {
      id: 'admin-1',
      name: 'Sandeep Kumar (Super Admin)',
      email: 'iamkumarsandeep12@gmail.com',
      phone: '+91 98765 43210',
      role: 'Super Admin',
      division: 'Headquarters (Baroda House)',
      department: 'Executive Administration',
    },
    {
      id: 'admin-2',
      name: 'Rajesh Sharma (Sr. PRO)',
      email: 'rajesh.nr@gov.in',
      phone: '+91 94120 11223',
      role: 'Senior PRO',
      division: 'Moradabad',
      department: 'Public Relations',
    },
    {
      id: 'user-1',
      name: 'Priya Verma (Media Analyst)',
      email: 'priya.verma@nr.railnet.gov.in',
      phone: '+91 99887 76655',
      role: 'Content Analyst',
      division: 'Delhi',
      department: 'Commercial & Media',
    },
    {
      id: 'reader-1',
      name: 'General Media Reader',
      email: 'reader@press.org',
      phone: '+91 91234 56789',
      role: 'Public Reader',
      division: 'All Northern Zone',
      department: 'Press Bureau',
    },
  ];

  const handleQuickLogin = (user: AuthUser) => {
    setSuccessMessage(`Logged in successfully as ${user.name}`);
    setTimeout(() => {
      onLoginSuccess(user);
      onClose();
    }, 400);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!loginIdentifier.trim()) {
      setErrorMessage('Please enter your email or mobile number.');
      return;
    }
    if (!loginPassword.trim()) {
      setErrorMessage('Please enter your password.');
      return;
    }

    // Authenticate user
    const matched = demoAccounts.find(
      (acc) =>
        acc.email.toLowerCase() === loginIdentifier.trim().toLowerCase() ||
        (acc.phone && acc.phone.includes(loginIdentifier.trim()))
    );

    const authenticatedUser: AuthUser = matched || {
      id: `user-${Date.now()}`,
      name: loginIdentifier.includes('@')
        ? loginIdentifier.split('@')[0].toUpperCase()
        : 'Authorized Officer',
      email: loginIdentifier.includes('@') ? loginIdentifier.trim() : `${loginIdentifier}@railnet.gov.in`,
      phone: loginIdentifier.includes('@') ? '+91 98765 43210' : loginIdentifier,
      role: loginIdentifier.toLowerCase().includes('admin') ? 'Super Admin' : 'Public Relations Officer',
      division: 'Northern Railway Zone',
      department: 'Media & Public Relations',
    };

    setSuccessMessage(`Login successful! Welcome back, ${authenticatedUser.name}`);
    setTimeout(() => {
      onLoginSuccess(authenticatedUser);
      onClose();
    }, 500);
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!signupName.trim()) {
      setErrorMessage('Please enter your Full Name.');
      return;
    }
    if (!signupEmail.trim() || !signupEmail.includes('@')) {
      setErrorMessage('Please provide a valid official/personal Email address.');
      return;
    }
    if (!signupPhone.trim()) {
      setErrorMessage('Please enter your Contact / Mobile number.');
      return;
    }
    if (signupPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    if (signupPassword !== signupConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }

    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      name: signupName.trim(),
      email: signupEmail.trim(),
      phone: signupPhone.trim(),
      role: signupRole,
      division: signupDivision,
      department: signupDepartment,
    };

    setSuccessMessage('Registration successful! Logging in to your new account...');
    setTimeout(() => {
      onSignupSuccess(newUser);
      onClose();
    }, 600);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail.trim() || !forgotEmail.includes('@')) {
      setErrorMessage('Please enter a valid email to receive the reset link.');
      return;
    }
    setSuccessMessage(`Password reset link and OTP have been dispatched to ${forgotEmail}`);
    setTimeout(() => {
      setIsForgotPassword(false);
      setSuccessMessage('');
    }, 2500);
  };

  const content = (
    <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-w-xl w-full mx-auto my-auto animate-in fade-in zoom-in-95 duration-200">
      {/* Official Railway Branding Header */}
      <div className="bg-linear-to-r from-[#005c9a] via-[#0070ba] to-[#0284c7] p-5 sm:p-6 text-white relative">
        {!isEmbedded && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <div className="flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-full bg-[#c02828] border-2 border-amber-300 flex items-center justify-center shadow-md shrink-0">
            <div className="text-center">
              <span className="block text-[8px] font-extrabold text-amber-200 uppercase tracking-tighter leading-none">
                NR
              </span>
              <span className="block text-[6px] font-semibold text-white uppercase leading-none mt-0.5">
                RAIL
              </span>
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h2 className="text-lg sm:text-xl font-black tracking-wide uppercase font-sans">
                NORTHERN RAILWAY
              </h2>
              <span className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-200 text-[10px] font-bold border border-amber-300/30">
                PR PORTAL
              </span>
            </div>
            <p className="text-xs text-sky-100/90 mt-0.5">
              उत्तर रेलवे मीडिया एवं जनसंपर्क प्रबंधन प्रणाली &bull; Secure Authentication
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        {!isForgotPassword && (
          <div className="flex items-center bg-black/20 p-1 rounded-xl mt-5 border border-white/10">
            <button
              type="button"
              onClick={() => {
                setActiveTab('login');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                activeTab === 'login'
                  ? 'bg-white text-[#0070ba] shadow-sm'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In (साइन इन)</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('signup');
                setErrorMessage('');
                setSuccessMessage('');
              }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg flex items-center justify-center space-x-1.5 transition-all ${
                activeTab === 'signup'
                  ? 'bg-white text-[#0070ba] shadow-sm'
                  : 'text-sky-100 hover:text-white hover:bg-white/10'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register / Sign Up (नया खाता)</span>
            </button>
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="p-5 sm:p-6 space-y-4">
        {/* Error / Success Notifications */}
        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex items-center space-x-2 text-xs text-rose-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="font-medium">{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center space-x-2 text-xs text-emerald-800 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="font-medium">{successMessage}</span>
          </div>
        )}

        {isForgotPassword ? (
          /* Forgot Password View */
          <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Reset Your Officer Password</h3>
              <p className="text-xs text-slate-500">
                Enter your registered Railway Email to receive password reset instructions.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Registered Email ID *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="e.g. officer@railnet.gov.in"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  setErrorMessage('');
                  setSuccessMessage('');
                }}
                className="text-xs text-slate-600 hover:text-slate-900 font-semibold"
              >
                &larr; Back to Log In
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#0070ba] hover:bg-[#005c9a] text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        ) : activeTab === 'login' ? (
          /* ================= LOGIN FORM ================= */
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Official Email or Mobile Number *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. iamkumarsandeep12@gmail.com or mobile"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Password *</label>
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-[11px] text-sky-700 hover:underline font-semibold"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="Enter your security password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center space-x-2 text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded text-sky-600 focus:ring-sky-500"
                />
                <span>Remember this session</span>
              </label>
              <span className="text-[11px] text-slate-400 font-mono">NR-PR Security v3.2</span>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-[#0070ba] hover:bg-[#005c9a] text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-2 shadow-sm transition-all hover:shadow"
            >
              <span>Sign In to PR Portal</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Quick Demo Logins Helper */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center mb-2">
                Quick 1-Click Demo Logins
              </p>
              <div className="grid grid-cols-2 gap-2">
                {demoAccounts.map((acc) => (
                  <button
                    key={acc.id}
                    type="button"
                    onClick={() => handleQuickLogin(acc)}
                    className="p-2 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg text-left transition-colors group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-800 group-hover:text-sky-800 truncate">
                        {acc.name.split(' (')[0]}
                      </span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-slate-200 group-hover:bg-sky-200 text-slate-700 font-semibold">
                        {acc.role}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 block truncate">{acc.division}</span>
                  </button>
                ))}
              </div>
            </div>
          </form>
        ) : (
          /* ================= SIGN UP / REGISTER FORM ================= */
          <form onSubmit={handleSignupSubmit} className="space-y-3.5 max-h-[60vh] overflow-y-auto pr-1">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name (पूरा नाम) *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Inspector / Officer Name"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Official Email *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@railnet.gov.in"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 00000"
                    value={signupPhone}
                    onChange={(e) => setSignupPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Division (मंडल) *
                </label>
                <select
                  value={signupDivision}
                  onChange={(e) => setSignupDivision(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white font-medium"
                >
                  {divisions.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name} Division
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Role Request (पद / भूमिका) *
                </label>
                <select
                  value={signupRole}
                  onChange={(e) => setSignupRole(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white font-medium"
                >
                  <option value="Public Relations Officer">Public Relations Officer (PRO)</option>
                  <option value="Content Analyst">Content & Media Analyst</option>
                  <option value="Senior PRO">Senior PRO</option>
                  <option value="Divisional Reporter">Divisional Reporter</option>
                  <option value="Public Reader">Public Reader / Press Agency</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Create Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Min 6 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Confirm Password *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter password"
                    value={signupConfirmPassword}
                    onChange={(e) => setSignupConfirmPassword(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-2 shadow-sm transition-all"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create & Register Officer Account</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Modal Footer note */}
      <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
        Official Government of India Portal &bull; Northern Railway Public Relations Cell
      </div>
    </div>
  );

  if (isEmbedded) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      {content}
    </div>
  );
};
