import "@/app/ui/global.css";
import AcmeLogo from "../ui/acme-logo";
import AuthenSwitch from "../ui/AuthenSwitch";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md space-y-6">
        {/* Phần trên: Logo */}
        <div className="flex flex-col items-center">
          <div className="h-20 w-32 md:w-full text-blue-500 bg-blue-500 rounded-md flex items-center justify-start">
            <AcmeLogo />
          </div>
        </div>

        {/* Phần giữa: Login / Signup */}
        <AuthenSwitch />

        {/* Phần dưới: Nội dung (Form Login hoặc Signup) */}
        <div className="p-4 shadow-md rounded-lg">{children}</div>
      </div>
    </div>
  );
}
