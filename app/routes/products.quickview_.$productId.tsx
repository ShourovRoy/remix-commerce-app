import { defer, V2_MetaFunction, V2_MetaArgs } from "@remix-run/node";
import {
  Await,
  Link,
  isRouteErrorResponse,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";
import axios from "axios";
import { Suspense } from "react";
import QuickViewProdNav from "~/components/headers/QuickViewProdNav";
import { ProductCardSkaleton } from "~/components/products/ProductCardSkaleton";
import Template from "~/components/templates/Template";
import { Product } from "~/types/productPage";

export const meta: V2_MetaFunction = ({ data }: V2_MetaArgs) => {
  return [
    {
      title: data.productTitle,
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
  const product: Promise<Product> = axios
    .get(`http://fakestoreapi.com/products/${productId}`)
    .then((res) => res.data);

  const productTitle = await axios
    .get(`http://fakestoreapi.com/products/${productId}`)
    .then((res) => res.data.title);

  // For example if I throw error form here. I have comment this line
  // Or some other errors
  // throw new Response("Product Not found", { status: 404 });

  return defer({
    product,
    productTitle,
  });
};

export default function ProductQuickView() {
  const {
    product,
  }: {
    product: Promise<Product>;
  } = useLoaderData<typeof loader>();

  return (
    <Template
      eros={{
        header: {
          element: <QuickViewProdNav />,
        },
      }}
      className="bg-red-200 h-screen"
    >
      <Suspense fallback={<ProductCardSkaleton />}>
        <Await resolve={product}>
          {(product: Product) => (
            <div className="flex flex-col justify-center items-center">
              <img src={product.image} width={200} height={200} />

              <div className="py-5 px-3">
                <h1 className="text-2xl">{product.title}</h1>
                <p className="text-base ">{product.description}</p>

                <p className="text-base ">{product.price}</p>

                <div className="py-2">
                  <Link
                    prefetch="render"
                    to={`/products/${product.id}`}
                    className="primaryButton"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          )}
        </Await>
      </Suspense>
    </Template>
  );
}

export function ErrorBoundary() {
  let error = useRouteError();

  console.log(error);

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
        <p>Message {error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
