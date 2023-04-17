import { LoaderFunction, defer } from "@remix-run/node";
import { Product } from "~/types/productPage";
import axios from "axios";
import {
  Await,
  Outlet,
  isRouteErrorResponse,
  useLoaderData,
  useLocation,
  useRouteError,
} from "@remix-run/react";
import { ProductCard } from "~/components/products/ProductCard";
import { Suspense } from "react";
import { ProductCardSkaleton } from "~/components/products/ProductCardSkaleton";

export const loader: LoaderFunction = async () => {
  const products: Promise<Product[]> = axios(
    "http://fakestoreapi.com/products"
  ).then((res) => res.data);

  return defer({
    products,
  });
};

export default function ProductsPage() {
  const {
    products,
  }: {
    products: Promise<Product[]>;
  } = useLoaderData() as { products: Promise<Product[]> };

  const location = useLocation();

  return (
    <div className="container grid grid-cols-12 gap-4">
      <div className="col-span-8 overflow-y-scroll h-screen">
        <Suspense fallback={<ProductCardSkaleton />}>
          <Await resolve={products}>
            {(products) => {
              return (
                <>
                  <div className="py-5">
                    <h1 className="text-2xl">
                      Top Remix {products.length} products.
                    </h1>
                  </div>

                  <div className="bg-white shadow mx-auto rounded-md overflow-hidden grid grid-cols-2 gap-1">
                    {products.map((product: Product, index: number) => (
                      <ProductCard key={index} product={product} />
                    ))}
                  </div>
                </>
              );
            }}
          </Await>
        </Suspense>
      </div>
      <div className="col-span-4 h-screen overflow-clip">
        {!location.pathname.includes("quickview") && (
          <div className="relative h-96">
            <h1 className="text-center text-2xl text-green-500 absolute transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              Please select quickview item
            </h1>
          </div>
        )}
        <Outlet />
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
