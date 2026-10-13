import Image from "next/image";
import { CatalogIcon } from "./catalog-icons";
import type { CatalogProduct } from "./catalog-data";
import styles from "./product-image.module.css";

export function ProductImage({
  product,
  sizes,
  thumbnail = false,
  eager = false,
  contain = false,
}: {
  product: CatalogProduct;
  sizes: string;
  thumbnail?: boolean;
  eager?: boolean;
  contain?: boolean;
}) {
  if (product.image) {
    return (
      <Image
        src={product.imagePreview ?? product.image}
        alt={product.alt}
        fill
        sizes={sizes}
        quality={90}
        loading={eager ? "eager" : "lazy"}
        className={styles.photo}
        style={{
          objectFit: thumbnail || contain ? "contain" : "cover",
          objectPosition:
            thumbnail || contain
              ? "center"
              : (product.imagePosition ?? "center"),
        }}
      />
    );
  }

  return (
    <span
      className={`${styles.placeholder} ${thumbnail ? styles.thumbnail : ""}`}
      role="img"
      aria-label={`Foto de ${product.name} próximamente`}
    >
      <CatalogIcon name="image" />
      {!thumbnail && <span>Foto próximamente</span>}
    </span>
  );
}
