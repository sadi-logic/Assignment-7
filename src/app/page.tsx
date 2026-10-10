import Link from "next/link";
import Banner from "./components/Banner";

interface Product {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}


const toBanglaNumber = (num: number | string) => {
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return num.toString().replace(/\d/g, (digit) => bnDigits[parseInt(digit)]);
};


const getUnitBn = (unit: string) => {
  if (unit === "kg") return "কেজি";
  return unit;
};


const getProducts = async () => {
  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products', {
    next: { revalidate: 60 }
  });
  const data = await res.json()
  return data;
}


const ProductCard = ({ p }: { p: Product }) => {
  return (
    <Link href={`/products/${p.id}`}>
      <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3">
          <span className="text-3xl bg-gray-50 p-2 rounded-lg">{p.categoryIcon}</span>
          <div>
            <h3 className="font-bold text-lg text-gray-800">{p.nameBn}</h3>
            <p className="text-sm text-gray-500">প্রতি {getUnitBn(p.unit)}</p>
          </div>
        </div>

        <div className="flex justify-between items-end mt-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">আজকের দাম</p>
            <p className="text-2xl font-bold text-gray-900">
              {toBanglaNumber(p.today)} টাকা
            </p>
          </div>


          <span className={`font-semibold px-2 py-1 rounded-md text-sm flex items-center gap-1 ${p.change.dir === "up"
            ? "text-red-600 bg-red-50"
            : p.change.dir === "down"
              ? "text-green-600 bg-green-50"
              : "text-gray-600 bg-gray-100"
            }`}>
            {p.change.dir === "up" ? "▲" : p.change.dir === "down" ? "▼" : "—"}
            {toBanglaNumber(Math.abs(p.change.pct))}%
          </span>
        </div>
      </div>
    </Link>
  );
};

export default async function Home() {
  const products: Product[] = await getProducts()

  const increasedProducts = products
    .filter((p) => p.change.dir === "up")
    .slice(0, 6);


  const decreasedProducts = products
    .filter((p) => p.change.dir === "down")
    .slice(0, 6);


  return (
    <div className="container mx-auto">
      <Banner />

      {increasedProducts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold  flex items-center gap-2 mb-8  justify-center lg:justify-start">
            <span className="text-lg text-red-600 ">▲</span> আজ দাম বেড়েছে
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {increasedProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}


      {decreasedProducts.length > 0 && (
        <div className="mt-14">
          <h2 className="text-2xl font-bold  flex items-center gap-2 mb-8 justify-center lg:justify-start">
            <span className="text-lg text-green-600">▼</span> আজ দাম কমেছে
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {decreasedProducts.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        </div>
      )}

      <div id="all-products" className="mt-16 border-t border-gray-200 pt-10">
        <div>

          <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center justify-center lg:justify-start">
            সব পণ্য
          </h2>
          <p className="text-gray-500 mb-8 flex items-center justify-center lg:justify-start">
            মোট {toBanglaNumber(products.length)}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      </div>


    </div>
  );
}
