import {
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import { Product } from "~/types/productPage";
import { Response, json } from "@remix-run/node";
import axios from "axios";

export const meta = ({ data }: { data: { product: Product } }) => {
  return [
    {
      title: data.product.title.toString(),
    },
  ];
};

export const loader = async ({
  params,
}: {
  params: {
    productId: number;
  };
}) => {
  const { productId } = params;
  const product: Product = await axios
    .get(`http://fakestoreapi.com/products/${productId}`)
    .then((res) => res.data);

  // For example if I throw error form here. I have comment this line
  // Or some other errors
  // throw new Response("Product Not found", { status: 404 });

  return json({
    product,
  });
};

export default function ProductDetails() {
  const { product }: { product: Product } = useLoaderData<typeof loader>();
  return (
    <div>
      <div className="container grid grid-cols-6 space-x-3 py-10">
        <div className="col-span-3">
          <img
            height="300"
            width="300"
            src={product?.image}
            alt={product?.title}
          />
        </div>

        <div className="col-span-3">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="py-3">{product.description}</p>
          <div className="py-2">
            <h1 className="text-xl font-semibold">Price: {product.price}</h1>
          </div>
          <div className="py-2">
            <button className="primaryButton">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export function ErrorBoundary() {
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
