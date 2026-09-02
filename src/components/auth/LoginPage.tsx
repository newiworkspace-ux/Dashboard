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
  ArrowRight,
  Sparkles,
  KeyRound,
  LogIn,
  UserPlus,
  Newspaper,
  Radio,
  FileText,
  BarChart3,
  Globe,
  Award
} from 'lucide-react';
import { AuthUser, MasterDivision, RoleItem } from '../../types';

interface LoginPageProps {
  onLoginSuccess: (user: AuthUser) => void;
  onSignupSuccess: (user: AuthUser) => void;
  divisions?: MasterDivision[];
  roles?: RoleItem[];
  onGuestAccess?: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
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
  roles = [],
  onGuestAccess,
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Login form state - pre-filled with Sandeep Kumar's credentials for convenient 1-click access
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

  // Forgot password state
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  // Preset demo officers
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
      name: 'General Media Officer',
      email: 'press.desk@northernrailway.in',
      phone: '+91 91234 56789',
      role: 'Divisional Reporter',
      division: 'Lucknow',
      department: 'Press Bureau',
    },
  ];

  const handleQuickLogin = (user: AuthUser) => {
    setErrorMessage('');
    setSuccessMessage(`Logging in as ${user.name}...`);
    setTimeout(() => {
      onLoginSuccess(user);
    }, 300);
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
    }, 400);
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

    setSuccessMessage('Registration successful! Opening your PR Portal dashboard...');
    setTimeout(() => {
      onSignupSuccess(newUser);
    }, 500);
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

  return (
    <div className="min-h-screen bg-slate-900 text-slate-800 flex flex-col justify-between selection:bg-[#0070ba] selection:text-white">
      {/* Top Govt of India Header Strip */}
      <div className="bg-[#003865] text-white px-4 py-2 text-xs border-b border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="font-semibold tracking-wide">भारत सरकार | Government of India</span>
          <span className="text-sky-300/60 hidden sm:inline">&bull;</span>
          <span className="text-sky-200 hidden sm:inline">रेल मंत्रालय | Ministry of Railways</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-sky-200">
          <span>उत्‍तर रेलवे (Northern Railway) PR Cell</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-400/30">
            System Online
          </span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8 bg-gradient-to-br from-slate-900 via-[#072448] to-[#0a3871] relative overflow-hidden">
        {/* Background glow & subtle patterns */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#0070ba]/20 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-rose-600/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Side: Northern Railway Branding & System Overview */}
          <div className="lg:col-span-6 text-white space-y-6">
            <div className="flex items-center space-x-3.5">
              <div className="w-16 h-16 rounded-full bg-[#c02828] border-2 border-amber-300 flex items-center justify-center shadow-xl shrink-0 ring-4 ring-white/10">
                <div className="text-center">
                  <span className="block text-[10px] font-extrabold text-amber-200 uppercase tracking-tighter leading-none">
                    NR
                  </span>
                  <span className="block text-[7px] font-bold text-white uppercase leading-none mt-0.5">
                    RAIL
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-amber-300">
                  उत्तर रेलवे | Northern Railway
                </span>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight uppercase leading-tight font-sans">
                  Media & PR Management Portal
                </h1>
                <p className="text-xs text-sky-200 font-medium">
                  जनसंपर्क एवं मीडिया निगरानी व प्रेस कतरन प्रबंधन प्रणाली
                </p>
              </div>
            </div>

            <p className="text-sm text-sky-100/90 leading-relaxed">
              Centralized platform for Northern Railway officers and media analysts to post, monitor, analyze, and archive divisional press clippings, electronic broadcast news, and public sentiment across Delhi, Moradabad, Lucknow, Ambala, Ferozpur & Baroda House.
            </p>

            {/* Key Feature Highlights */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-3 rounded-xl flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-sky-500/20 text-sky-300">
                  <Newspaper className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Press Clippings</h4>
                  <p className="text-[11px] text-sky-200/80 mt-0.5">Print & e-News coverage archiving</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-3 rounded-xl flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-300">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sentiment Analytics</h4>
                  <p className="text-[11px] text-sky-200/80 mt-0.5">Positive, neutral & critical trends</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-3 rounded-xl flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-amber-500/20 text-amber-300">
                  <Building className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">6 Divisions Connected</h4>
                  <p className="text-[11px] text-sky-200/80 mt-0.5">Delhi, MB, LKO, UMB, FZR, HQ</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/15 p-3 rounded-xl flex items-start space-x-3">
                <div className="p-2 rounded-lg bg-purple-500/20 text-purple-300">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Role-Based Access</h4>
                  <p className="text-[11px] text-sky-200/80 mt-0.5">Super Admin, PROs, Analysts</p>
                </div>
              </div>
            </div>

            {onGuestAccess && (
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onGuestAccess}
                  className="inline-flex items-center space-x-2 text-xs font-bold text-sky-300 hover:text-white underline underline-offset-4 transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Or Browse Public News Portal without Logging In &rarr;</span>
                </button>
              </div>
            )}
          </div>

          {/* Right Side: Login & Registration Card */}
          <div className="lg:col-span-6">
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
              
              {/* Header inside form */}
              <div className="bg-linear-to-r from-[#005c9a] via-[#0070ba] to-[#0284c7] p-5 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-wide">
                      Officer Portal Sign In
                    </h2>
                    <p className="text-xs text-sky-100">
                      प्रवेश करने के लिए अपना विवरण दर्ज करें
                    </p>
                  </div>
                  <div className="px-2.5 py-1 bg-white/20 rounded-full text-[10px] font-bold tracking-wider border border-white/30">
                    SECURE LOGIN
                  </div>
                </div>

                {/* Tab Switcher */}
                {!isForgotPassword && (
                  <div className="flex items-center bg-black/25 p-1 rounded-xl border border-white/10">
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
                      <span>Register (नया खाता)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 space-y-4">
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
                  /* Forgot Password Form */
                  <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
                    <div className="text-center space-y-1">
                      <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center mx-auto mb-2">
                        <KeyRound className="w-5 h-5" />
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">Reset Officer Password</h3>
                      <p className="text-xs text-slate-500">
                        Enter your registered official email to receive password reset OTP.
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
                          placeholder="e.g. iamkumarsandeep12@gmail.com"
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
                        Email Address or Mobile Number *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. iamkumarsandeep12@gmail.com"
                          value={loginIdentifier}
                          onChange={(e) => setLoginIdentifier(e.target.value)}
                          className="w-full pl-9 pr-3 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none bg-slate-50/50"
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
                          className="w-full pl-9 pr-10 py-2.5 text-xs text-slate-900 border border-slate-300 rounded-lg focus:ring-1 focus:ring-sky-500 focus:outline-none bg-slate-50/50"
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
                      <span className="text-[11px] text-slate-400 font-mono">NR-PR v3.2</span>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-[#0070ba] hover:bg-[#005c9a] text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-2 shadow-md transition-all hover:shadow-lg active:scale-[0.99]"
                    >
                      <span>Sign In & Open PR Dashboard (लॉग इन करें)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Quick Demo Logins Helper */}
                    <div className="pt-3 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                          1-Click Quick Demo Sign In
                        </p>
                        <span className="text-[10px] text-sky-600 font-semibold">Ready to Use</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {demoAccounts.map((acc) => (
                          <button
                            key={acc.id}
                            type="button"
                            onClick={() => handleQuickLogin(acc)}
                            className="p-2 bg-slate-50 hover:bg-sky-50 border border-slate-200 hover:border-sky-300 rounded-lg text-left transition-all group"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-800 group-hover:text-[#0070ba] truncate">
                                {acc.name.split(' (')[0]}
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-0.5">
                              <span className="text-[10px] text-slate-500 truncate">{acc.division}</span>
                              <span className="text-[9px] px-1 py-0.2 rounded bg-slate-200 group-hover:bg-sky-200 text-slate-700 font-medium">
                                {acc.role.split(' ')[0]}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>
                ) : (
                  /* ================= SIGN UP / REGISTER FORM ================= */
                  <form onSubmit={handleSignupSubmit} className="space-y-3.5 max-h-[55vh] overflow-y-auto pr-1">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name (पूरा नाम) *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Officer / Analyst Name"
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
                          Designation / Role (भूमिका) *
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
                          <option value="Super Admin">Super Administrator</option>
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
                        className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold flex items-center justify-center space-x-2 shadow-md transition-all active:scale-[0.99]"
                      >
                        <UserPlus className="w-4 h-4" />
                        <span>Register & Enter Dashboard (खाता बनाएं)</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Card Footer */}
              <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[11px] text-slate-500">
                Official Portal of Northern Railway &bull; Ministry of Railways, Govt. of India
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Footer Strip */}
      <footer className="bg-slate-950 text-slate-400 text-xs py-3 px-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span>
          <span>Northern Railway Media Monitoring & PR Department &copy; {new Date().getFullYear()}</span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-slate-400">
          <span>Baroda House, New Delhi</span>
          <span>Security Compliant Portal</span>
        </div>
      </footer>
    </div>
  );
};
