import { useEffect, useState } from 'react'
import {
  ArrowDownLeft, ArrowUpRight, Bell, Check, ChevronDown, CircleHelp, CreditCard,
  Eye, EyeOff, GraduationCap, LayoutDashboard, Menu, MessageSquareText, Phone,
  Plus, ReceiptText, Search, Send, Settings, ShieldCheck, Tv, WalletCards, Wifi, X, Zap, LockKeyhole, EyeClosed, Moon, Sun,
} from 'lucide-react'

const navigation = [
  [LayoutDashboard, 'Dashboard'], [Wifi, 'Buy Data'], [Phone, 'Buy Airtime'],
  [Tv, 'Cable Sub'], [WalletCards, 'Fund Wallet'], [ReceiptText, 'Transaction History'], [Settings, 'Settings'],
]

const services = [
  { title: 'Buy Data', subtitle: 'Stay connected', icon: Wifi, color: 'blue', tag: 'From ₦100' },
  { title: 'Buy Airtime', subtitle: 'Top up any line', icon: Phone, color: 'green', tag: 'Instant' },
  { title: 'Airtime 2 Cash', subtitle: 'Convert airtime', icon: ArrowUpRight, color: 'rose', tag: 'New' },
  { title: 'Electricity Bill', subtitle: 'Prepaid & postpaid', icon: Zap, color: 'amber', tag: 'Pay bills' },
  { title: 'Cable Subscription', subtitle: 'DStv, GOtv & more', icon: Tv, color: 'purple', tag: 'Renew now' },
  { title: 'Bonus Transfer', subtitle: 'Share with friends', icon: Send, color: 'cyan', tag: 'Free' },
  { title: 'Bulk SMS', subtitle: 'Reach your customers', icon: MessageSquareText, color: 'indigo', tag: 'Business' },
  { title: 'Result Checker', subtitle: 'WAEC, NECO & NABTEB', icon: GraduationCap, color: 'orange', tag: 'From ₦750' },
]

const transactions = [
  { icon: Wifi, name: 'MTN SME Data', meta: 'Today, 10:42 AM', amount: '- ₦1,050.00', iconClass: 'bg-blue-50 text-blue-600' },
  { icon: ArrowDownLeft, name: 'Wallet funding', meta: 'Yesterday, 6:15 PM', amount: '+ ₦10,000.00', iconClass: 'bg-emerald-50 text-emerald-600', income: true },
  { icon: Zap, name: 'Ikeja Electric', meta: 'Aug 08, 9:02 AM', amount: '- ₦5,000.00', iconClass: 'bg-amber-50 text-amber-600' },
]

function ThemeToggle({ darkMode, onToggle }) {
  return <button type="button" onClick={onToggle} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} className="theme-toggle rounded-xl p-2 text-slate-500 transition hover:bg-white hover:text-slate-900">
    {darkMode ? <Sun size={19} /> : <Moon size={19} />}<span className="sr-only">{darkMode ? 'Light mode' : 'Dark mode'}</span>
  </button>
}

function Dashboard({ onLogout, darkMode, onToggleTheme }) {
  const [active, setActive] = useState('Dashboard')
  const [menuOpen, setMenuOpen] = useState(false)
  const [balanceVisible, setBalanceVisible] = useState(true)
  const [loading, setLoading] = useState(true)
  const [dataModal, setDataModal] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('1.5GB')
  const [phone, setPhone] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  useEffect(() => { const id = setTimeout(() => setLoading(false), 1100); return () => clearTimeout(id) }, [])
  const openService = (service) => service.title === 'Buy Data' ? (setSubmitted(false), setDataModal(true)) : setActive(service.title)
  const submitData = (e) => { e.preventDefault(); if (phone.length >= 10) setSubmitted(true) }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-[252px] flex-col border-r border-slate-200 bg-white px-4 py-5 transition-transform lg:translate-x-0 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center gap-2.5 px-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-lg font-black text-white shadow-sm shadow-emerald-100">L</div>
          <span className="text-lg font-extrabold tracking-tight">Lucid<span className="text-emerald-500">Telecom</span></span>
          <button onClick={() => setMenuOpen(false)} className="ml-auto rounded-lg p-1 text-slate-400 lg:hidden"><X size={20} /></button>
        </div>
        <div className="mt-9 px-2 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Main menu</div>
        <nav className="mt-3 space-y-1">
          {navigation.map(([Icon, label]) => <button key={label} onClick={() => { setActive(label); setMenuOpen(false) }} className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all ${active === label ? 'bg-emerald-50 text-emerald-700 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}><Icon size={18} strokeWidth={active === label ? 2.5 : 2} /><span>{label}</span>{label === 'Fund Wallet' && <Plus size={15} className="ml-auto opacity-0 transition group-hover:opacity-100" />}</button>)}
        </nav>
        <div className="mt-auto rounded-2xl bg-slate-900 p-4 text-white">
          <div className="flex items-center gap-2 text-sm font-semibold"><CircleHelp size={17} className="text-emerald-400" /> Need help?</div>
          <p className="mt-1 text-xs leading-5 text-slate-400">Our support team is always ready to help.</p>
          <button className="mt-3 text-xs font-bold text-emerald-400 hover:text-emerald-300">Contact support →</button>
        </div>
      </aside>
      {menuOpen && <button aria-label="Close navigation" onClick={() => setMenuOpen(false)} className="fixed inset-0 z-30 bg-slate-950/30 lg:hidden" />}

      <main className="lg:pl-[252px]">
        <header className="sticky top-0 z-20 flex h-[72px] items-center justify-between border-b border-slate-200/80 bg-slate-50/85 px-4 backdrop-blur-lg sm:px-7 lg:px-9">
          <div className="flex items-center gap-3"><button onClick={() => setMenuOpen(true)} className="rounded-xl p-2 text-slate-600 hover:bg-white lg:hidden"><Menu size={21} /></button><div className="hidden items-center rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 shadow-sm md:flex"><Search size={16} /><input className="ml-2 w-40 bg-transparent outline-none placeholder:text-slate-400" placeholder="Search anything" /></div></div>
          <div className="flex items-center gap-2 sm:gap-5"><ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} /><button className="relative rounded-xl p-2 text-slate-500 transition hover:bg-white hover:text-slate-900"><Bell size={20} /><span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-slate-50 bg-rose-500" /></button><div className="hidden h-8 w-px bg-slate-200 sm:block" /><div className="relative"><button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 text-left"><div className="hidden sm:block"><div className="text-xs font-bold">Hi, Holyjaf</div><div className="text-[11px] text-slate-400">Personal account</div></div><div className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-sm font-bold text-white">H</div><ChevronDown size={15} className="hidden text-slate-400 sm:block" /></button>{profileOpen && <div className="absolute right-0 top-12 w-48 overflow-hidden rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl shadow-slate-200"><div className="border-b border-slate-100 px-3 py-2.5"><p className="text-sm font-bold">Holyjaf</p><p className="mt-0.5 text-[11px] text-slate-400">Personal account</p></div><button onClick={onLogout} className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-bold text-rose-600 transition hover:bg-rose-50"><ArrowUpRight size={16} className="rotate-45" /> Log out</button></div>}</div></div>
        </header>

        <div className="mx-auto max-w-[1600px] p-4 sm:p-7 lg:p-9">
          <section className="mb-7 flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="text-sm font-medium text-slate-500">Wednesday, August 12</p><h1 className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">Good morning, Holyjaf <span className="inline-block">👋</span></h1><p className="mt-1 text-sm text-slate-500">Here’s what’s happening with your account today.</p></div><button onClick={() => setActive('Fund Wallet')} className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 transition hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0"><Plus size={17} /> Fund wallet</button></section>

          <section className="grid gap-4 xl:grid-cols-[1.45fr_.9fr]">
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-xl shadow-slate-300/50 sm:p-7"><div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-emerald-400/15 blur-2xl" /><div className="absolute -bottom-24 right-28 h-48 w-48 rounded-full bg-blue-400/10 blur-2xl" /><div className="relative flex items-start justify-between"><div><p className="text-sm font-medium text-slate-400">Available balance</p>{loading ? <div className="shimmer mt-3 h-9 w-48 rounded-lg" /> : <div className="mt-2 flex items-center gap-3"><strong className="text-3xl tracking-tight sm:text-4xl">{balanceVisible ? '₦24,580.50' : '••••••••'}</strong><button onClick={() => setBalanceVisible(!balanceVisible)} className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white">{balanceVisible ? <Eye size={18} /> : <EyeOff size={18} />}</button></div>}</div><div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-emerald-300"><WalletCards size={22} /></div></div><div className="relative mt-8 flex gap-3"><button onClick={() => setActive('Fund Wallet')} className="rounded-xl bg-emerald-400 px-4 py-2.5 text-sm font-bold text-emerald-950 transition hover:bg-emerald-300 active:scale-95">Add money</button><button className="rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-bold transition hover:bg-white/10 active:scale-95">Account details</button></div></div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">This month</p><p className="mt-1 text-xl font-extrabold">Your activity</p></div><button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-50"><ChevronDown size={18} /></button></div><div className="mt-5 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-emerald-50 p-3"><p className="text-xs font-medium text-emerald-700">Total spent</p><p className="mt-1 text-lg font-extrabold">₦18,400</p><p className="mt-1 text-[11px] font-bold text-emerald-600">↑ 12% vs Jul</p></div><div className="rounded-2xl bg-blue-50 p-3"><p className="text-xs font-medium text-blue-700">Transactions</p><p className="mt-1 text-lg font-extrabold">32</p><p className="mt-1 text-[11px] font-bold text-blue-600">Across 6 services</p></div></div></div>
          </section>

          <section className="mt-8"><div className="mb-4 flex items-center justify-between"><div><h2 className="text-lg font-extrabold">Quick actions</h2><p className="mt-0.5 text-sm text-slate-500">Everything you need, right where you need it.</p></div><button className="hidden text-sm font-bold text-emerald-600 hover:text-emerald-700 sm:block">View all services →</button></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">{services.map(service => { const Icon = service.icon; return <button key={service.title} onClick={() => openService(service)} className={`service-card service-${service.color} group relative min-h-36 overflow-hidden rounded-2xl border bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg active:translate-y-0`}><div className="flex items-start justify-between"><div className="service-icon grid h-10 w-10 place-items-center rounded-xl transition group-hover:scale-110"><Icon size={20} /></div><span className="rounded-full bg-slate-50 px-2 py-1 text-[10px] font-bold text-slate-500">{service.tag}</span></div><div className="mt-5"><h3 className="font-bold tracking-tight">{service.title}</h3><p className="mt-1 text-xs text-slate-500">{service.subtitle}</p></div><ArrowUpRight size={17} className="absolute bottom-4 right-4 text-slate-300 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-slate-800" /></button> })}</div></section>

          <section className="mt-8 grid gap-5 xl:grid-cols-[1.45fr_.9fr]"><div className="rounded-3xl border border-slate-200 bg-white shadow-sm"><div className="flex items-center justify-between p-5 pb-3"><div><h2 className="font-extrabold">Recent transactions</h2><p className="mt-0.5 text-xs text-slate-500">Your latest account activity</p></div><button onClick={() => setActive('Transaction History')} className="text-sm font-bold text-emerald-600 hover:text-emerald-700">View all</button></div><div className="px-3 pb-3">{loading ? [...Array(3)].map((_, i) => <div key={i} className="flex items-center gap-3 px-2 py-3"><div className="shimmer h-10 w-10 rounded-xl" /><div className="flex-1"><div className="shimmer h-3 w-32 rounded" /><div className="shimmer mt-2 h-2.5 w-20 rounded" /></div><div className="shimmer h-3 w-20 rounded" /></div>) : transactions.map(tx => { const Icon = tx.icon; return <div key={tx.name} className="flex items-center gap-3 rounded-2xl px-2 py-3 transition hover:bg-slate-50"><div className={`grid h-10 w-10 place-items-center rounded-xl ${tx.iconClass}`}><Icon size={18} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-bold">{tx.name}</p><p className="mt-0.5 text-xs text-slate-400">{tx.meta}</p></div><span className={`text-sm font-extrabold ${tx.income ? 'text-emerald-600' : 'text-slate-800'}`}>{tx.amount}</span></div> })}</div></div><div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 text-white shadow-lg shadow-emerald-200"><div className="absolute -right-6 -top-8 h-40 w-40 rounded-full border-[22px] border-white/10" /><p className="relative text-sm font-semibold text-emerald-50">Refer & earn</p><h2 className="relative mt-2 max-w-56 text-2xl font-extrabold tracking-tight">Share LucidTelecom. Earn ₦500.</h2><p className="relative mt-3 max-w-64 text-sm leading-5 text-emerald-50">Invite friends to buy smarter and enjoy rewards together.</p><button className="relative mt-6 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-700 transition hover:bg-emerald-50 active:scale-95">Invite friends</button></div></section>
        </div>
      </main>

      {dataModal && <div className="fixed inset-0 z-50 grid place-items-end bg-slate-950/40 p-0 backdrop-blur-sm sm:place-items-center sm:p-5" onMouseDown={(e) => e.target === e.currentTarget && setDataModal(false)}><div className="modal-enter w-full max-w-md rounded-t-3xl bg-white p-5 shadow-2xl sm:rounded-3xl sm:p-6"><div className="flex items-start justify-between"><div><div className="grid h-10 w-10 place-items-center rounded-xl bg-blue-50 text-blue-600"><Wifi size={20} /></div><h2 className="mt-3 text-xl font-extrabold">Buy data</h2><p className="mt-1 text-sm text-slate-500">Instant delivery to any Nigerian number.</p></div><button onClick={() => setDataModal(false)} className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"><X size={20} /></button></div>{submitted ? <div className="py-10 text-center"><div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-emerald-100 text-emerald-600"><Check size={28} /></div><h3 className="mt-4 text-lg font-extrabold">Data request created!</h3><p className="mt-2 text-sm text-slate-500">{selectedPlan} will be sent to {phone}.</p><button onClick={() => setDataModal(false)} className="mt-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-bold text-white">Done</button></div> : <form onSubmit={submitData} className="mt-6 space-y-4"><label className="block text-sm font-bold">Mobile network<div className="mt-2 grid grid-cols-4 gap-2">{['MTN', 'Airtel', 'Glo', '9mobile'].map((n, i) => <button type="button" key={n} className={`rounded-xl border py-2 text-xs font-bold transition ${i === 0 ? 'border-amber-300 bg-amber-50 text-amber-700' : 'border-slate-200 text-slate-500 hover:border-slate-300'}`}>{n}</button>)}</div></label><label className="block text-sm font-bold">Phone number<input required value={phone} onChange={e => setPhone(e.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" placeholder="080 1234 5678" className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-3 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-50" /></label><label className="block text-sm font-bold">Choose a plan<select value={selectedPlan} onChange={e => setSelectedPlan(e.target.value)} className="mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50"><option>1.5GB — ₦1,050</option><option>3GB — ₦1,550</option><option>5GB — ₦2,500</option></select></label><button className="w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[.98]">Continue to payment</button></form>}</div></div>}
    </div>
  )
}

function Login({ onLogin, darkMode, onToggleTheme }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (username === 'Holyjaf' && password === 'Secret') onLogin()
    else setError('That username or password is not correct. Please try again.')
  }

  return <div className="login-page min-h-screen bg-slate-50 p-3 text-slate-900 sm:p-5 lg:p-7">
    <div className="mx-auto grid min-h-[calc(100vh-24px)] max-w-[1440px] overflow-hidden rounded-[28px] bg-white shadow-2xl shadow-slate-300/30 lg:grid-cols-[1.05fr_.95fr] lg:rounded-[36px]">
      <section className="relative hidden overflow-hidden bg-slate-950 p-9 text-white lg:flex lg:flex-col xl:p-12">
        <div className="login-glow -left-24 top-20 bg-emerald-400/40" /><div className="login-glow -bottom-28 right-0 bg-blue-500/30" />
        <div className="relative flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-400 text-lg font-black text-emerald-950 shadow-sm shadow-emerald-400/10">L</div><span className="text-xl font-extrabold tracking-tight">Lucid<span className="text-emerald-400">Telecom</span></span></div>
        <div className="relative my-auto max-w-lg"><div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.07] px-3 py-1.5 text-xs font-semibold text-emerald-200"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Nigeria’s smarter VTU platform</div><h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight xl:text-5xl">Every essential, <span className="text-emerald-400">one effortless</span> experience.</h1><p className="mt-5 max-w-md text-base leading-7 text-slate-300">Buy data, top up airtime, pay bills and manage your money from one secure, lightning-fast dashboard.</p>
          <div className="mt-9 grid grid-cols-3 gap-3"><div className="rounded-2xl border border-white/10 bg-white/[.07] p-3"><Wifi size={19} className="text-blue-300" /><p className="mt-3 text-xs font-bold">Instant data</p></div><div className="rounded-2xl border border-white/10 bg-white/[.07] p-3"><Zap size={19} className="text-amber-300" /><p className="mt-3 text-xs font-bold">Easy bills</p></div><div className="rounded-2xl border border-white/10 bg-white/[.07] p-3"><ShieldCheck size={19} className="text-emerald-300" /><p className="mt-3 text-xs font-bold">Always secure</p></div></div>
        </div>
        <div className="relative flex items-center gap-2 text-xs text-slate-400"><ShieldCheck size={16} className="text-emerald-400" /> Bank-level security for every transaction</div>
      </section>
      <section className="flex min-h-[calc(100vh-24px)] flex-col p-6 sm:p-10 lg:min-h-0 lg:p-12 xl:p-16">
        <div className="flex items-center justify-between lg:justify-end"><div className="flex items-center gap-2 lg:hidden"><div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500 text-lg font-black text-white">L</div><span className="text-lg font-extrabold tracking-tight">Lucid<span className="text-emerald-500">Telecom</span></span></div><div className="flex items-center gap-4"><ThemeToggle darkMode={darkMode} onToggle={onToggleTheme} /><p className="hidden text-sm text-slate-500 sm:block">New to LucidTelecom? <button className="font-bold text-emerald-600 hover:text-emerald-700">Create account</button></p></div></div>
        <div className="mx-auto my-auto w-full max-w-md py-10"><div className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-emerald-50 text-emerald-600"><LockKeyhole size={22} /></div><p className="mt-6 text-sm font-semibold text-emerald-600">WELCOME BACK</p><h2 className="mt-2 text-3xl font-extrabold tracking-tight">Sign in to your account</h2><p className="mt-3 text-sm leading-6 text-slate-500">Enter your details to continue to your LucidTelecom dashboard.</p>
          <form onSubmit={submit} className="mt-8 space-y-5"><label className="block text-sm font-bold text-slate-700">Username<div className="relative mt-2"><input autoFocus value={username} onChange={e => { setUsername(e.target.value); setError('') }} placeholder="Enter your username" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50" /></div></label><label className="block text-sm font-bold text-slate-700">Password<div className="relative mt-2"><input type={showPassword ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); setError('') }} placeholder="Enter your password" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 pr-12 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50" /><button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">{showPassword ? <EyeOff size={18} /> : <EyeClosed size={18} />}</button></div></label>{error && <p role="alert" className="rounded-xl bg-rose-50 px-3 py-2.5 text-xs font-medium text-rose-600">{error}</p>}<div className="flex items-center justify-between"><label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-emerald-600" /> Remember me</label><button type="button" className="text-sm font-bold text-emerald-600 hover:text-emerald-700">Forgot password?</button></div><button className="w-full rounded-xl bg-slate-900 py-3.5 text-sm font-bold text-white shadow-xl shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-emerald-600 hover:shadow-emerald-200 active:translate-y-0">Sign in securely</button></form>
          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-slate-400"><ShieldCheck size={15} className="text-emerald-500" /> Your details are protected and encrypted.</div>
        </div><p className="text-center text-xs text-slate-400">© 2026 LucidTelecom. All rights reserved.</p>
      </section>
    </div>
  </div>
}

function App() {
  const [authenticated, setAuthenticated] = useState(false)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('lucid-theme') === 'dark')
  const toggleTheme = () => setDarkMode(current => {
    const next = !current
    localStorage.setItem('lucid-theme', next ? 'dark' : 'light')
    return next
  })
  return <div className={darkMode ? 'theme-dark' : ''}>{authenticated ? <Dashboard onLogout={() => setAuthenticated(false)} darkMode={darkMode} onToggleTheme={toggleTheme} /> : <Login onLogin={() => setAuthenticated(true)} darkMode={darkMode} onToggleTheme={toggleTheme} />}</div>
}

export default App
