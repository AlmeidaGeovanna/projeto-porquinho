import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
<<<<<<< HEAD
    <div className="app">
      <Header />

      <main className="main-content">
        <div className="container">
          {children}
        </div>
      </main>

      <Footer />
    </div>
=======
   <div className="app">
  <Header />
  <main className="main-content">
    <div className="container">
      {children}
    </div>
  </main>
  <Footer />
</div>
>>>>>>> 802c49952ef4f5294b6c0eebb4b200234d5ee8ad
  );
}