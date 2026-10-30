import { FiCamera } from "react-icons/fi";

export default function AvatarUpload({ initials = "SA" }) {
  return (
    <div className="flex items-center gap-5">
      <div className="relative">
        <div className="grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 text-2xl font-bold text-onaccent shadow-btn">
          {initials}
        </div>
        <button className="absolute -bottom-1.5 -right-1.5 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-ink-800 text-slate-300 hover:bg-ink-700">
          <FiCamera className="text-xs" />
        </button>
      </div>
      <div>
        <div className="font-bold text-slate-100">Profile Photo</div>
        <p className="text-xs text-slate-500">JPG or PNG. Max size 2MB.</p>
      </div>
    </div>
  );
}
