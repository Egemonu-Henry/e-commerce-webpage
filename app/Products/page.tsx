import ProductList from "@/component/ui/productlist";
import { stripe } from "@/lib/stripe";
import { cacheLife } from "next/cache";

async function getProducts() {
  "use cache";
  cacheLife("hours"); // refresh roughly hourly

  const products = await stripe.products.list({
    expand: ["data.default_price"],
  });
  return products.data;
}

const page = async () => {
  const products = await getProducts();

  return (
    <div className="rounded-3xl bg-neutral-200 py-8 sm:py-12">
      <div className="flex justify-center items-center text-center flex-col">
        <h1 className="font-['Bodoni_Moda',serif] font-medium text-7xl leading-[1.02] tracking-[-0.015em] mt-[22px] mb-0 p-2">
          Dress with
          <br />
          <span className="font-[roboto] overflow-hidden text-[#F0B6A2]">intention.</span>
        </h1>
        <p className="text-xl leading-[1.65] text-[#590907] max-w-[380px] mt-6 mb-9 mx-0">
          Considered essentials and quiet statement pieces — made to be worn,
          kept, and loved season after season.
        </p>
      </div>
      <ProductList products={products} />
    </div>
  );
};

export default page;











