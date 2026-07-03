import ProductList from "../components/ProductList";

function Home() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-8">

      <h1 className="text-4xl font-bold mb-2">
        New Arrivals
      </h1>

      <p className="text-gray-500 mb-8">
        Discover our latest men's and women's fashion.
      </p>

      <ProductList />

    </main>
  );
}

export default Home;