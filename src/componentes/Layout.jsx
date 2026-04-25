import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}