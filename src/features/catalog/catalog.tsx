"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import {
  catalogCategories,
  catalogSections,
  catalogCombo,
  catalogIsProvisional,
  catalogProducts,
  formatPrice,
  isComboBeverage,
  type CatalogProduct,
  type ComboBeverage,
} from "./catalog-data";
import {
  addToCart,
  MAX_ITEM_QUANTITY,
  buildWhatsAppUrl,
  getCartSummary,
  getCartLineKey,
  removeFromCart,
  setCartQuantity,
  validateOrderDetails,
  type OrderDetails,
} from "./order";
import { useCart } from "./use-cart";
import { CatalogIcon } from "./catalog-icons";
import { ProductImage } from "./product-image";
import styles from "./catalog.module.css";

type CatalogProps = {
  whatsAppPhones: Record<OrderDetails["branch"], string | null>;
  initialProductId?: string;
};

function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replaceAll("×", "x")
    .replaceAll("½", "1/2")
    .replace(/[-–—]/g, " ")
    .toLowerCase()
    .trim();
}

function Modal({
  title,
  onClose,
  children,
  drawer = false,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  drawer?: boolean;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    element?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected)
        previousFocus.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      className={`${styles.modal} ${drawer ? styles.drawer : ""}`}
      aria-labelledby="catalog-dialog-title"
      onCancel={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className={styles.modalInner}>
        <div className={styles.modalHeader}>
          <h2 id="catalog-dialog-title">{title}</h2>
          <button
            type="button"
            className={styles.iconButton}
            aria-label="Cerrar ventana"
            onClick={onClose}
          >
            <CatalogIcon name="close" />
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}

function Quantity({
  value,
  name,
  min = 1,
  max = MAX_ITEM_QUANTITY,
  onChange,
}: {
  value: number;
  name: string;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <div
      className={styles.quantity}
      role="group"
      aria-label={`Cantidad de ${name}`}
    >
      <button
        type="button"
        aria-label={`Restar ${name}`}
        disabled={value <= min}
        onClick={() => onChange(value - 1)}
      >
        <CatalogIcon name="minus" />
      </button>
      <output aria-label={`Unidades de ${name}`}>{value}</output>
      <button
        type="button"
        aria-label={`Sumar ${name}`}
        disabled={value >= max}
        onClick={() => onChange(value + 1)}
      >
        <CatalogIcon name="plus" />
      </button>
    </div>
  );
}

const initialDetails: OrderDetails = {
  customerName: "",
  fulfillment: "pickup",
  branch: "yopal",
  address: "",
  notes: "",
};

export function Catalog({ whatsAppPhones, initialProductId }: CatalogProps) {
  const { cart, updateCart } = useCart();
  const summary = getCartSummary(cart);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [product, setProduct] = useState<CatalogProduct | null>(
    () => catalogProducts.find((item) => item.id === initialProductId) ?? null,
  );
  const [productQuantity, setProductQuantity] = useState(1);
  const [comboBeverage, setComboBeverage] = useState<
    ComboBeverage | undefined
  >();
  const [cartOpen, setCartOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [details, setDetails] = useState<OrderDetails>(initialDetails);
  const [formError, setFormError] = useState("");
  const searchInput = useRef<HTMLInputElement>(null);
  const phone = whatsAppPhones[details.branch];
  const remainingQuantity =
    MAX_ITEM_QUANTITY -
    (cart.find(
      (line) =>
        line.productId === product?.id && line.comboBeverage === comboBeverage,
    )?.quantity ?? 0);
  const quantityToAdd = Math.min(productQuantity, remainingQuantity);
  const productUnitPrice =
    (product?.price ?? 0) + (comboBeverage ? catalogCombo.price : 0);
  const filtered = catalogProducts.filter(
    (item) =>
      (category === "all" || item.category === category) &&
      normalizeSearch(
        `${item.name} ${item.description} ${item.label} ${item.notes}`,
      ).includes(normalizeSearch(search)),
  );
  const sections = catalogSections
    .map((section) => ({
      ...section,
      products: filtered.filter((item) => item.category === section.id),
    }))
    .filter((section) => section.products.length > 0);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(""), 3200);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function addProduct(
    item: CatalogProduct,
    quantity = 1,
    beverage?: ComboBeverage,
  ) {
    const current =
      cart.find(
        (line) => line.productId === item.id && line.comboBeverage === beverage,
      )?.quantity ?? 0;
    updateCart((previous) => addToCart(previous, item.id, quantity, beverage));
    setNotice(
      current >= 99
        ? "Llegaste al máximo de 99 unidades de este producto."
        : `${item.name}${beverage ? " con combo" : ""} en tu carrito${current + quantity > 99 ? " · Máximo 99 unidades" : ""}.`,
    );
  }

  function openProduct(item: CatalogProduct) {
    setProductQuantity(1);
    setComboBeverage(undefined);
    setProduct(item);
  }

  function updateDetails<K extends keyof OrderDetails>(
    key: K,
    value: OrderDetails[K],
  ) {
    setDetails((previous) => ({ ...previous, [key]: value }));
    setFormError("");
  }

  function checkout(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errors = validateOrderDetails(details);
    if (Object.keys(errors).length) {
      setFormError(Object.values(errors).filter(Boolean).join(" "));
      return;
    }
    const url = buildWhatsAppUrl(phone ?? "", cart, details, {
      demo: catalogIsProvisional,
    });
    if (!url) {
      setFormError(
        "No se pudo preparar el pedido. Revisa tus datos y los productos del carrito.",
      );
      return;
    }
    window.location.assign(url);
  }

  return (
    <div className={styles.catalog}>
      <section className={styles.intro} aria-labelledby="catalog-title">
        <Image
          src="/images/catalog-cover.webp"
          alt=""
          loading="eager"
          quality={90}
          fill
          sizes="(max-width: 959px) 960px, 100vw"
          className={styles.introPhoto}
        />
        <div className={`reference-container ${styles.introContent}`}>
          <h1 id="catalog-title">
            Tu antojo.
            <br />
            <span>Tu pedido.</span>
          </h1>
          <p>
            Burgers, perros, picadas y más. Arma tu carrito y pide por WhatsApp.
          </p>
          <span className={styles.locations}>Maní & Yopal · Casanare</span>
        </div>
      </section>

      <div className={`reference-container ${styles.content}`}>
        <div className={styles.menuHeading}>
          <h2>El menú D’omo</h2>
          <button
            className={styles.cartButton}
            type="button"
            onClick={() => setCartOpen(true)}
            aria-label={`Ver carrito, ${summary.quantity} productos`}
          >
            <CatalogIcon name="bag" /> Mi carrito{" "}
            <span>{summary.quantity}</span>
          </button>
        </div>
        {catalogIsProvisional && (
          <p className={styles.provisional}>
            Carta de demostración · Productos, precios e imágenes provisionales.
          </p>
        )}
        <p className={styles.comboNote}>
          Agrega papas y bebida a cualquier producto por{" "}
          <strong>+{formatPrice(catalogCombo.price)}</strong>. Elige tu combo en
          «Ver detalles».
        </p>
        <div className={styles.toolbar}>
          <div
            className={styles.categories}
            role="group"
            aria-label="Filtrar por categoría"
          >
            {catalogCategories.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className={styles.search}>
            <CatalogIcon name="search" />
            <input
              ref={searchInput}
              type="search"
              aria-label="Buscar productos"
              placeholder="¿Cuál se te antoja?"
              value={search}
              maxLength={100}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button
                type="button"
                aria-label="Limpiar búsqueda"
                onClick={() => {
                  setSearch("");
                  searchInput.current?.focus();
                }}
              >
                <CatalogIcon name="close" />
              </button>
            )}
          </div>
        </div>
        <p className={styles.resultCount} role="status">
          {filtered.length} {filtered.length === 1 ? "producto" : "productos"}
          {search ? ` para “${search}”` : " para elegir"}
        </p>
        {sections.map((section) => (
          <section
            key={section.id}
            className={styles.menuSection}
            aria-labelledby={`category-${section.id}`}
          >
            <div className={styles.sectionHeading}>
              <h3 id={`category-${section.id}`}>{section.label}</h3>
              <span>
                {section.products.length}{" "}
                {section.products.length === 1 ? "opción" : "opciones"}
              </span>
            </div>
            <ul
              className={`${styles.productGrid} ${section.compact ? styles.compactGrid : ""}`}
            >
              {section.products.map((item) => {
                const quantity = cart
                  .filter((line) => line.productId === item.id)
                  .reduce((total, line) => total + line.quantity, 0);
                const plainQuantity =
                  cart.find(
                    (line) => line.productId === item.id && !line.comboBeverage,
                  )?.quantity ?? 0;
                return (
                  <li key={item.id}>
                    <article className={styles.productCard}>
                      <button
                        type="button"
                        className={styles.productPhoto}
                        aria-label={`Ver detalle de ${item.name}`}
                        onClick={() => openProduct(item)}
                      >
                        {/* Landscape sources need extra pixels to cover a 4:3 frame. */}
                        <ProductImage
                          product={item}
                          thumbnail={section.compact}
                          sizes={
                            section.compact
                              ? "72px"
                              : "(max-width: 639px) calc(133.34vw - 53.34px), (max-width: 959px) calc((133.34vw - 117.34px) / 2), (max-width: 1439px) calc((133.34vw - 192px) / 3), 576px"
                          }
                        />
                        <span className={styles.productLabel}>
                          {item.label}
                        </span>
                        {quantity > 0 && (
                          <span className={styles.inCart}>
                            {quantity}
                            {section.compact ? "" : " en tu carrito"}
                          </span>
                        )}
                      </button>
                      <div className={styles.productCopy}>
                        <div className={styles.productHeading}>
                          <h4>
                            <button
                              type="button"
                              onClick={() => openProduct(item)}
                            >
                              {item.name}
                            </button>
                          </h4>
                          <span>{formatPrice(item.price)}</span>
                        </div>
                        {item.description && <p>{item.description}</p>}
                        <div className={styles.productActions}>
                          <button
                            type="button"
                            className={styles.detailLink}
                            onClick={() => openProduct(item)}
                            aria-label={`Ver detalles y combo de ${item.name}`}
                          >
                            Ver detalles
                          </button>
                          <button
                            type="button"
                            className={styles.addButton}
                            disabled={plainQuantity >= 99}
                            aria-label={`Agregar ${item.name} al carrito`}
                            onClick={() => addProduct(item)}
                          >
                            <CatalogIcon name="plus" /> Agregar
                          </button>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
        {!filtered.length && (
          <div className={styles.emptySearch}>
            <h3>No encontramos ese antojo</h3>
            <p>Prueba con otro nombre o ingrediente.</p>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => {
                setSearch("");
                setCategory("all");
                searchInput.current?.focus();
              }}
            >
              Ver todo el menú
            </button>
          </div>
        )}
        <p className={styles.menuNote}>
          Precios en pesos colombianos. Disponibilidad y valor del domicilio por
          confirmar con la sede.
        </p>
      </div>

      <div className={styles.toast} role="status" aria-live="polite">
        {notice && (
          <span>
            <CatalogIcon name="bag" />
            {notice}
          </span>
        )}
      </div>
      {summary.quantity > 0 && (
        <button
          className={styles.floatingCart}
          type="button"
          onClick={() => setCartOpen(true)}
          aria-label={`Ver mi pedido, ${summary.quantity} productos, ${formatPrice(summary.subtotal)}`}
        >
          <span className={styles.floatingCount}>{summary.quantity}</span>
          <span>Ver mi pedido</span>
          <strong>{formatPrice(summary.subtotal)}</strong>
          <CatalogIcon name="bag" />
        </button>
      )}

      {product && (
        <Modal title="Detalle del producto" onClose={() => setProduct(null)}>
          <div className={styles.detailPhoto}>
            <ProductImage
              product={product}
              eager
              contain
              sizes="(max-width: 639px) 100vw, 560px"
            />
          </div>
          <div className={styles.detailBody}>
            <div className={styles.detailHeading}>
              <h3>{product.name}</h3>
              <strong>{formatPrice(product.price)}</strong>
            </div>
            {product.ingredients.length > 0 && (
              <div className={styles.ingredients}>
                <h4>Ingredientes</h4>
                <ul>
                  {product.ingredients.map((ingredient) => (
                    <li key={ingredient}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
            {product.notes && <p>{product.notes}</p>}
            {catalogIsProvisional && (
              <p className={styles.smallNote}>
                Producto de demostración. Ingredientes y precio por confirmar.
              </p>
            )}
            <div className={styles.comboOption}>
              <label className={styles.comboToggle}>
                <input
                  type="checkbox"
                  checked={Boolean(comboBeverage)}
                  onChange={(event) =>
                    setComboBeverage(
                      event.target.checked ? "coca-cola" : undefined,
                    )
                  }
                />
                <span>
                  <strong>
                    Agregar combo · +{formatPrice(catalogCombo.price)}
                  </strong>
                  <small>Papas y una bebida a elección</small>
                </span>
              </label>
              {comboBeverage && (
                <div className={styles.comboBeverage}>
                  <label htmlFor="combo-beverage">Bebida del combo</label>
                  <select
                    id="combo-beverage"
                    value={comboBeverage}
                    onChange={(event) => {
                      if (isComboBeverage(event.target.value))
                        setComboBeverage(event.target.value);
                    }}
                  >
                    {catalogCombo.beverages.map((beverage) => (
                      <option key={beverage.id} value={beverage.id}>
                        {beverage.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            <div className={styles.detailQuantity}>
              <span>Cantidad</span>
              <Quantity
                value={quantityToAdd}
                max={remainingQuantity}
                name={product.name}
                onChange={setProductQuantity}
              />
            </div>
            <button
              type="button"
              className={styles.primaryButton}
              disabled={remainingQuantity === 0}
              onClick={() => {
                addProduct(product, quantityToAdd, comboBeverage);
                setProduct(null);
              }}
            >
              <CatalogIcon name="plus" />{" "}
              {remainingQuantity === 0
                ? "Máximo de 99 unidades en tu carrito"
                : `Agregar al carrito · ${formatPrice(productUnitPrice * quantityToAdd)}`}
            </button>
          </div>
        </Modal>
      )}

      {cartOpen && (
        <Modal
          title={`Mi carrito (${summary.quantity})`}
          drawer
          onClose={() => setCartOpen(false)}
        >
          {!summary.quantity ? (
            <div className={styles.emptyCart}>
              <CatalogIcon name="bag" />
              <h3>Tu próximo antojo empieza aquí</h3>
              <p>Elige tus productos favoritos para armar tu pedido.</p>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={() => setCartOpen(false)}
              >
                Explorar el menú
              </button>
            </div>
          ) : (
            <div className={styles.cartBody}>
              <ul className={styles.cartItems}>
                {summary.items.map(
                  ({
                    product: item,
                    quantity,
                    lineTotal,
                    unitPrice,
                    comboBeverage: beverage,
                    comboLabel,
                  }) => (
                    <li
                      key={getCartLineKey({
                        productId: item.id,
                        comboBeverage: beverage,
                      })}
                      className={styles.cartItem}
                    >
                      <div className={styles.cartPhoto}>
                        <ProductImage product={item} sizes="72px" thumbnail />
                      </div>
                      <div className={styles.cartItemInfo}>
                        <h3>{item.name}</h3>
                        {comboLabel && (
                          <p className={styles.cartCombo}>{comboLabel}</p>
                        )}
                        <p>{formatPrice(unitPrice)} / unidad</p>
                        <Quantity
                          value={quantity}
                          name={`${item.name}${comboLabel ? ` · ${comboLabel}` : ""}`}
                          onChange={(value) =>
                            updateCart((previous) =>
                              setCartQuantity(
                                previous,
                                item.id,
                                value,
                                beverage,
                              ),
                            )
                          }
                        />
                      </div>
                      <div className={styles.cartItemEnd}>
                        <button
                          type="button"
                          className={styles.iconButton}
                          aria-label={`Eliminar ${item.name}${comboLabel ? ` · ${comboLabel}` : ""}`}
                          onClick={() =>
                            updateCart((previous) =>
                              removeFromCart(previous, item.id, beverage),
                            )
                          }
                        >
                          <CatalogIcon name="trash" />
                        </button>
                        <strong>{formatPrice(lineTotal)}</strong>
                      </div>
                    </li>
                  ),
                )}
              </ul>
              <button
                type="button"
                className={styles.continueButton}
                onClick={() => setCartOpen(false)}
              >
                <CatalogIcon name="plus" /> Seguir eligiendo
              </button>
              <form className={styles.orderForm} onSubmit={checkout}>
                <h3>Completa tu pedido</h3>
                <label>
                  Tu nombre
                  <input
                    name="customerName"
                    autoComplete="name"
                    required
                    maxLength={80}
                    placeholder="¿A nombre de quién?"
                    value={details.customerName}
                    onChange={(event) =>
                      updateDetails("customerName", event.target.value)
                    }
                  />
                </label>
                <label>
                  Sede
                  <select
                    name="branch"
                    value={details.branch}
                    onChange={(event) =>
                      updateDetails(
                        "branch",
                        event.target.value as OrderDetails["branch"],
                      )
                    }
                  >
                    <option value="yopal">Yopal</option>
                    <option value="mani">Maní</option>
                  </select>
                </label>
                <fieldset className={styles.deliveryOptions}>
                  <legend>¿Cómo lo quieres recibir?</legend>
                  <label>
                    <input
                      type="radio"
                      name="fulfillment"
                      value="pickup"
                      checked={details.fulfillment === "pickup"}
                      onChange={() => updateDetails("fulfillment", "pickup")}
                    />{" "}
                    Recoger en sede
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="fulfillment"
                      value="delivery"
                      checked={details.fulfillment === "delivery"}
                      onChange={() => updateDetails("fulfillment", "delivery")}
                    />{" "}
                    A domicilio
                  </label>
                </fieldset>
                {details.fulfillment === "delivery" && (
                  <label>
                    Dirección de entrega
                    <input
                      name="address"
                      autoComplete="street-address"
                      required
                      maxLength={240}
                      placeholder="Dirección, barrio y referencia"
                      value={details.address}
                      onChange={(event) =>
                        updateDetails("address", event.target.value)
                      }
                    />
                  </label>
                )}
                <label>
                  Notas para tu pedido <span>(opcional)</span>
                  <textarea
                    name="notes"
                    rows={3}
                    maxLength={500}
                    placeholder="Por ejemplo: sin cebolla"
                    value={details.notes}
                    onChange={(event) =>
                      updateDetails("notes", event.target.value)
                    }
                  />
                </label>
                <div className={styles.totals}>
                  <div>
                    <span>Subtotal de productos</span>
                    <span>{formatPrice(summary.subtotal)}</span>
                  </div>
                  <div>
                    <span>
                      {details.fulfillment === "delivery"
                        ? "Domicilio"
                        : "Entrega"}
                    </span>
                    <span>
                      {details.fulfillment === "delivery"
                        ? "Por confirmar"
                        : "Recoger en sede"}
                    </span>
                  </div>
                  <div className={styles.total}>
                    <span>Total productos</span>
                    <strong>{formatPrice(summary.subtotal)}</strong>
                  </div>
                </div>
                {catalogIsProvisional && (
                  <p className={styles.smallNote}>
                    Este pedido se enviará como prueba con la carta provisional.
                  </p>
                )}
                {!phone && (
                  <p className={styles.unavailable} role="status">
                    Los pedidos por WhatsApp para{" "}
                    {details.branch === "mani" ? "Maní" : "Yopal"} estarán
                    disponibles pronto. Puedes seguir armando tu carrito.
                  </p>
                )}
                {formError && (
                  <p role="alert" className={styles.formError}>
                    {formError}
                  </p>
                )}
                <button
                  className={styles.primaryButton}
                  type="submit"
                  disabled={!phone}
                >
                  <CatalogIcon name="whatsapp" /> Enviar pedido por WhatsApp
                </button>
                <p className={styles.smallNote}>
                  Se abrirá WhatsApp con el resumen. Envía el mensaje para que
                  la sede confirme disponibilidad, entrega y pago.
                </p>
              </form>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}
