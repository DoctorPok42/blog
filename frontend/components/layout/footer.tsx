import Link from "next/link";

const Footer = () => {
  return (
    <div className="border-t border-divider">
      <div className="max-w-[1180px] mx-auto py-7 px-6 flex items-center justify-between">
        <div className="text-[13px] text-neutral-500">
          <span>© 2026 DoctorPok</span>
        </div>

        <div className={`flex items-center gap-4 text-[13px] text-neutral-500`}>
          <Link href="https://github.com/DoctorPok42/blog">
            Github
          </Link>
          <Link href="/rss" className="hover:text-primary">
            RSS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
