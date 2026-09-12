// prototype/public/src/components/LoginModal.jsx
// Enterprise Clinical Login & Demo Switcher Modal

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [email, setEmail] = React.useState("asharma@demo.in");
  const [password, setPassword] = React.useState("demo123");
  const [error, setError] = React.useState(null);

  if (!isOpen) return null;

  const demoAccounts = [
    {
      name: "Anita Sharma",
      role: "Family Caregiver",
      email: "asharma@demo.in",
      tag: "Sharma Family • Junglighat",
      badge: "Primary Patient",
    },
    {
      name: "Ram Prakash",
      role: "Family Caregiver",
      email: "rprakash@demo.in",
      tag: "Prakash Family • Little Andaman",
      badge: "Remote Island",
    },
    {
      name: "GB Pant Ward Nurse",
      role: "Ward Nurse",
      email: "wardnurse@demo.in",
      tag: "GB Pant Hospital • Port Blair",
      badge: "Virtual Ward",
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) {
      onLogin(email, password);
      onClose();
    }
  };

  const handleQuickDemo = (demoEmail) => {
    setEmail(demoEmail);
    setPassword("demo123");
    if (onLogin) {
      onLogin(demoEmail, "demo123");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white border border-slate-200 rounded-2xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                ReJivan Clinical Portal
              </h3>
              <p className="text-[11px] text-slate-500">
                Enterprise Telehealth &amp; Continuous Monitoring
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* One-Tap Demo Access Header */}
        <div className="my-4">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
            One-Tap Evaluator Access
          </p>
          <div className="space-y-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleQuickDemo(acc.email)}
                className="w-full text-left p-2.5 rounded-xl border border-slate-200/80 hover:border-blue-300 hover:bg-blue-50/50 transition-colors flex items-center justify-between group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700">
                    {acc.name}
                  </div>
                  <div className="text-[11px] text-slate-400">{acc.tag}</div>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-800">
                  {acc.badge}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-medium text-[10px]">
              Or Sign In With Password
            </span>
          </div>
        </div>

        {/* Standard Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-9 px-3 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-9 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
