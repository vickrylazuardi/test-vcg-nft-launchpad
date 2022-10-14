import NavbarDashboard from "../NavbarDashboard";
import Footer from "../Footer";

export default function LayoutDashboard({ children }) {
  return (
    <>
      <NavbarDashboard />
      <main>{children}</main>
      <Footer />
    </>
  );
}
