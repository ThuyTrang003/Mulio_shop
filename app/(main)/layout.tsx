import Navbar from "@/features/main/components/nav-bar";
import Footer from "@/features/main/components/footer";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar /> {/* Navbar sẽ hiển thị ở tất cả các trang */}
      <main className="mt-16">{children}</main> {/* Nội dung động của từng trang */}
      <Footer /> {/* Footer sẽ hiển thị ở tất cả các trang */}
    </>
  );
}
