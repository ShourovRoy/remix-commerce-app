import { Link } from "@remix-run/react";
import { Product } from "~/types/productPage";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="grid grid-cols-2 col-span-1 shadow-md m-auto">
      <img
        className="col-span-1"
        src={product?.image}
        width="130"
        height="auto"
      />
      <div className="col-span-1 m-auto">
        <h2 className="text-2xl py-2 text-green-500">
          {product?.title.slice(0, 10)}
        </h2>
        <p className="text-base py-2">{product?.description.slice(0, 40)}</p>
        <p className="font-semibold text-green-300">
          Product Price: {product?.price}
        </p>
        <div className="py-3">
          <Link to={`/products/quickview/${product.id}`}>Quick View</Link>
        </div>
      </div>
    </div>
  );
};
