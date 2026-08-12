import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t border-divider">
      <div className="max-w-[1180px] mx-auto py-7 px-6 flex items-center justify-between">
        <div className="text-[13px] text-neutral-500">
          <span>© 2026 DoctorPok. All rights reserved.</span>
        </div>

        <div className={`flex items-center gap-4 text-[13px] text-neutral-500`}>
          <Link href="https://github.com/DoctorPok42/blog" className="hover:text-accent-2 hover:underline" target="_blank">
            Github
          </Link>
          <Link href="/rss" className="hover:text-accent-2 hover:underline" onClick={(e) => {
            e.preventDefault();
            window.location.href = "/rss";
          }}>
            RSS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
