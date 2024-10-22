import Navbar from "@/features/main/nav-bar";
import Footer from "@/features/main/footer";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar /> {/* Navbar sẽ hiển thị ở tất cả các trang */}
      <main>{children}</main> {/* Nội dung động của từng trang */}
      <Footer /> {/* Footer sẽ hiển thị ở tất cả các trang */}
    </>
  );
}
