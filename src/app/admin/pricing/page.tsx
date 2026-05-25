"use client";

import { type DragEvent, useEffect, useMemo, useState } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import { db, handleFirestoreError } from "@/lib/firebaseClient";

type Service = {
  id: string;
  title: string;
  price: string;
  description?: string;
  features?: string[] | string;
  category?: string;
  active?: boolean;
  featured?: boolean;
  recommended?: boolean;
  order?: number;
};

const categories = [
  { key: "seo", label: "SEO" },
  { key: "social", label: "Social" },
  { key: "ads", label: "Ads" },
  { key: "website", label: "Website" },
];

const getCategoryLabel = (value?: string) =>
  categories.find((category) => category.key === value)?.label ||
  value ||
  "Uncategorized";

const getFeatures = (features?: string[] | string) =>
  (Array.isArray(features) ? features : features?.split(",") || [])
    .map((feature) => feature.trim())
    .filter(Boolean);

const sortByOrder = (a: Service, b: Service) =>
  (a.order ?? Number.MAX_SAFE_INTEGER) - (b.order ?? Number.MAX_SAFE_INTEGER) ||
  a.title.localeCompare(b.title);

export default function PricingAdmin() {
  const [services, setServices] = useState<Service[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [features, setFeatures] = useState("");
  const [category, setCategory] = useState("");
  const [recommended, setRecommended] = useState(false);
  const [editing, setEditing] = useState<Service | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTargetId, setDropTargetId] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      const snap = await getDocs(collection(db, "services"));
      const data = snap.docs
        .map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Service, "id">),
        }))
        .sort(sortByOrder);

      setServices(data);
    } catch (error) {
      handleFirestoreError(error);
      console.error("Failed to load services:", error);
    }
  };

  const saveOrder = async (items: Service[]) => {
    try {
      const batch = writeBatch(db);
      items.forEach((item, index) => {
        batch.update(doc(db, "services", item.id), {
          order: index,
        });
      });
      await batch.commit();
    } catch (error) {
      handleFirestoreError(error);
      console.error("Failed to save order:", error);
    }
  };

  const resetForm = () => {
    setEditing(null);
    setTitle("");
    setPrice("");
    setDesc("");
    setFeatures("");
    setCategory("");
    setRecommended(false);
  };

  const groupedServices = useMemo(() => {
    const groups = categories
      .map((serviceCategory) => ({
        ...serviceCategory,
        services: services
          .filter((service) => service.category === serviceCategory.key)
          .sort(sortByOrder),
      }))
      .filter((serviceCategory) => serviceCategory.services.length > 0);

    const uncategorizedServices = services
      .filter(
        (service) =>
          !categories.some((serviceCategory) => serviceCategory.key === service.category)
      )
      .sort(sortByOrder);

    return [
      ...groups,
      ...(uncategorizedServices.length > 0
        ? [
            {
              key: "uncategorized",
              label: "Uncategorized",
              services: uncategorizedServices,
            },
          ]
        : []),
    ];
  }, [services]);

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchServices();
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleAdd = async () => {
    if (!title || !price || !category) {
      alert("Please fill title, price, and category");
      return;
    }

    try {
      const categoryServices = services.filter((service) => service.category === category);
      const nextOrder =
        categoryServices.length > 0
          ? Math.max(...categoryServices.map((service) => service.order ?? 0)) + 1
          : 0;

      await addDoc(collection(db, "services"), {
        title,
        price,
        description: desc,
        features: getFeatures(features),
        category,
        recommended,
        active: true,
        order: nextOrder,
        createdAt: new Date(),
      });

      resetForm();
      void fetchServices();
    } catch (error) {
      handleFirestoreError(error);
      alert("Failed to add service. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this service?")) return;

    const previousServices = services;
    setServices((current) => current.filter((service) => service.id !== id));

    try {
      await deleteDoc(doc(db, "services", id));
      void fetchServices();
    } catch (error) {
      setServices(previousServices);
      handleFirestoreError(error);
      alert("Failed to delete service. Please try again.");
    }
  };

  const toggleActive = async (service: Service) => {
    const nextActive = !(service.active !== false);

    setServices((current) =>
      current.map((item) =>
        item.id === service.id ? { ...item, active: nextActive } : item
      )
    );

    try {
      await updateDoc(doc(db, "services", service.id), {
        active: nextActive,
      });
      void fetchServices();
    } catch (error) {
      setServices((current) =>
        current.map((item) =>
          item.id === service.id ? { ...item, active: service.active } : item
        )
      );
      handleFirestoreError(error);
      alert("Failed to update service status. Please try again.");
    }
  };

  const handleEdit = (service: Service) => {
    setEditing(service);
    setTitle(service.title || "");
    setPrice(service.price || "");
    setDesc(service.description || "");
    setFeatures(getFeatures(service.features).join(", "));
    setCategory(service.category || "");
    setRecommended(Boolean(service.recommended));
  };

  const handleUpdate = async () => {
    if (!editing) return;

    if (!title || !price || !category) {
      alert("Please fill title, price, and category");
      return;
    }

    const movedToDifferentCategory = editing.category !== category;
    const nextOrder = movedToDifferentCategory
      ? services.filter((service) => service.category === category).length
      : editing.order;
    const updatedService = {
      title,
      price,
      description: desc,
      features: getFeatures(features),
      category,
      recommended,
      order: nextOrder,
    };

    setServices((current) =>
      current.map((service) =>
        service.id === editing.id ? { ...service, ...updatedService } : service
      )
    );

    try {
      await updateDoc(doc(db, "services", editing.id), updatedService);
      resetForm();
      void fetchServices();
    } catch (error) {
      handleFirestoreError(error);
      alert("Failed to update service. Please try again.");
      void fetchServices();
    }
  };

  const handleDragStart = (event: DragEvent<HTMLElement>, id: string) => {
    const target = event.target as HTMLElement;

    if (target.closest("button, input, textarea, select, .actions")) {
      event.preventDefault();
      return;
    }

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", id);
    setDraggingId(id);
  };

  const handleDragEnd = () => {
    setDraggingId(null);
    setDropTargetId(null);
  };

  const handleDragEnter = (id: string) => {
    if (id !== draggingId) {
      setDropTargetId(id);
    }
  };

  const handleDrop = async (targetId: string) => {
    if (!draggingId || draggingId === targetId) {
      setDropTargetId(null);
      return;
    }

    const dragged = services.find((service) => service.id === draggingId);
    const target = services.find((service) => service.id === targetId);

    if (!dragged || !target || dragged.category !== target.category) {
      setDropTargetId(null);
      setDraggingId(null);
      return;
    }

    const categoryServices = services.filter(
      (service) => service.category === target.category
    );
    const fromIndex = categoryServices.findIndex((service) => service.id === draggingId);
    const toIndex = categoryServices.findIndex((service) => service.id === targetId);

    if (fromIndex === -1 || toIndex === -1) {
      setDropTargetId(null);
      return;
    }

    const reorderedCategory = [...categoryServices];
    const [moved] = reorderedCategory.splice(fromIndex, 1);
    reorderedCategory.splice(toIndex, 0, moved);
    const reorderedIds = new Set(reorderedCategory.map((service) => service.id));
    const updated = services.map((service) => {
      const categoryIndex = reorderedCategory.findIndex((item) => item.id === service.id);

      return categoryIndex >= 0
        ? { ...service, order: categoryIndex }
        : service;
    });

    setServices(updated);
    setDropTargetId(null);
    setDraggingId(null);

    await saveOrder(updated.filter((service) => reorderedIds.has(service.id)));
  };

  const moveService = async (service: Service, direction: -1 | 1) => {
    const categoryServices = services
      .filter((item) => item.category === service.category)
      .sort(sortByOrder);
    const currentIndex = categoryServices.findIndex((item) => item.id === service.id);
    const nextIndex = currentIndex + direction;

    if (
      currentIndex === -1 ||
      nextIndex < 0 ||
      nextIndex >= categoryServices.length
    ) {
      return;
    }

    const reorderedCategory = [...categoryServices];
    const [moved] = reorderedCategory.splice(currentIndex, 1);
    reorderedCategory.splice(nextIndex, 0, moved);
    const reorderedIds = new Set(reorderedCategory.map((item) => item.id));
    const updated = services
      .map((item) => {
        const categoryIndex = reorderedCategory.findIndex(
          (reorderedItem) => reorderedItem.id === item.id
        );

        return categoryIndex >= 0 ? { ...item, order: categoryIndex } : item;
      })
      .sort(sortByOrder);

    setServices(updated);
    await saveOrder(updated.filter((item) => reorderedIds.has(item.id)));
  };

  return (
    <div className="pricing-admin">
      <div className="pricing-header">
        <h2>Manage Pricing</h2>
        <p>Create and manage your service plans</p>
      </div>

      <div className="pricing-form-card">
        <div className="form-grid">
          <input
            placeholder="Service Title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />

          <input
            placeholder="Price (Rs.)"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />

          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((serviceCategory) => (
              <option key={serviceCategory.key} value={serviceCategory.key}>
                {serviceCategory.label}
              </option>
            ))}
          </select>

          <input
            placeholder="Description"
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
          />

          <textarea
            placeholder="Features (comma separated)"
            value={features}
            onChange={(event) => setFeatures(event.target.value)}
          />

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={recommended}
              onChange={(event) => setRecommended(event.target.checked)}
            />
            Recommended plan
          </label>
        </div>

        <button
          type="button"
          onClick={editing ? handleUpdate : handleAdd}
          className="btn btn-grad full-btn"
        >
          {editing ? "Update Service" : "+ Add Service"}
        </button>

        {editing && (
          <button type="button" onClick={resetForm} className="btn btn-dark full-btn">
            Cancel
          </button>
        )}
      </div>

      <div className="pricing-category-list">
        {groupedServices.map((serviceCategory) => (
          <section className="pricing-category-group" key={serviceCategory.key}>
            <div className="pricing-category-head">
              <h3>{serviceCategory.label}</h3>
              <span>
                {serviceCategory.services.length} plan
                {serviceCategory.services.length === 1 ? "" : "s"}
              </span>
            </div>

            <div className="service-list">
              {serviceCategory.services.map((service, index) => {
                const isActive = service.active !== false;

                return (
                  <div
                    key={service.id}
                    className={`service-card ${!isActive ? "is-hidden" : ""} ${service.id === draggingId ? "dragging" : ""} ${service.id === dropTargetId ? "drop-target" : ""}`}
                    draggable
                    onDragStart={(event) => handleDragStart(event, service.id)}
                    onDragEnd={handleDragEnd}
                    onDragOver={(event) => {
                      event.preventDefault();
                      event.dataTransfer.dropEffect = "move";
                    }}
                    onDragEnter={() => handleDragEnter(service.id)}
                    onDrop={() => handleDrop(service.id)}
                  >
                    <div className="service-card-top">
                      <div
                        className="drag-handle"
                        title="Drag to reorder inside this category"
                        draggable
                        onDragStart={(event) => {
                          event.stopPropagation();
                          handleDragStart(event, service.id);
                        }}
                        onDragEnd={handleDragEnd}
                      >
                        ::
                      </div>

                      <div className="service-card-badges">
                        {!isActive && <div className="status-badge">HIDDEN</div>}
                        {service.recommended && (
                          <div className="recommended-badge">RECOMMENDED</div>
                        )}
                      </div>
                    </div>

                    <h3>{service.title}</h3>
                    <p className="price">{service.price}</p>
                    <p className="cat">{getCategoryLabel(service.category)}</p>

                    <ul>
                      {getFeatures(service.features).map((feature, index) => (
                        <li key={index}>- {feature}</li>
                      ))}
                    </ul>

                    <div className="order-actions" aria-label="Plan order controls">
                      <button
                        type="button"
                        className="btn btn-order"
                        disabled={index === 0}
                        onClick={(event) => {
                          event.stopPropagation();
                          void moveService(service, -1);
                        }}
                      >
                        Move Up
                      </button>

                      <button
                        type="button"
                        className="btn btn-order"
                        disabled={index === serviceCategory.services.length - 1}
                        onClick={(event) => {
                          event.stopPropagation();
                          void moveService(service, 1);
                        }}
                      >
                        Move Down
                      </button>
                    </div>

                    <div className="actions">
                      <button
                        type="button"
                        className="btn btn-edit"
                        draggable={false}
                        onClick={(event) => {
                          event.stopPropagation();
                          handleEdit(service);
                        }}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="btn btn-toggle"
                        draggable={false}
                        onClick={(event) => {
                          event.stopPropagation();
                          void toggleActive(service);
                        }}
                      >
                        {isActive ? "Hide" : "Show"}
                      </button>

                      <button
                        type="button"
                        className="btn btn-delete"
                        draggable={false}
                        onClick={(event) => {
                          event.stopPropagation();
                          void handleDelete(service.id);
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
