import { Monitor, Headphones, Watch, Lightbulb } from "lucide-react";
import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const categories = [
  {
    id: "desk",
    title: "Desk Setup",
    icon: Monitor,
    description: "Premium desk accessories"
  },
  {
    id: "audio",
    title: "Audio",
    icon: Headphones,
    description: "Headphones & speakers"
  },
  {
    id: "wearables",
    title: "Wearables",
    icon: Watch,
    description: "Smart watches"
  },
  {
    id: "lighting",
    title: "Lighting",
    icon: Lightbulb,
    description: "Ambient lighting"
  }
];

export function FeaturedCategories() {
  const { setActiveCategory } = useContext(ShopContext);

  return (
    <section className="featured-categories">
      <div className="container">
        <h2>Shop by Category</h2>
        <p>Explore our premium collections</p>

        <div className="category-grid">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.id}
                className="category-card"
                onClick={() => {
       setActiveCategory(category.id);

         document
          .getElementById("catalog-section")
         ?.scrollIntoView({
         behavior: "smooth"
          });
     }}
              >
                <Icon size={40} />
                <h3>{category.title}</h3>
                <p>{category.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}