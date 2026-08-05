export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  date: string;
  author: string;
}

export const posts: BlogPost[] = [
  {
    id: 1,
    title: "10 Reasons To Visit Our Luxury Resort This Summer",
    excerpt:
      "Discover the hidden gems and exclusive summer activities that make our resort the ultimate destination...",
    image:
      "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764963/DSC_0221_ocnztf.jpg",
    category: "Travel",
    date: "June 15, 2026",
    author: "Admin",
    content: `Summer is the perfect season to escape the everyday and immerse yourself in a world of luxury, comfort, and adventure. Our resort offers an experience unlike any other, where every detail is curated to make your stay unforgettable.

From the moment you arrive, you are greeted with warm hospitality, breathtaking views, and a sense of calm that instantly washes over you. Whether you are seeking a romantic getaway, a family vacation, or a solo retreat, our property has something for everyone.

One of the highlights is our infinity pool, where you can relax with a refreshing drink while watching the sun set over the horizon. The spa offers holistic treatments that rejuvenate the mind and body, and our fine dining restaurant serves dishes crafted from locally sourced ingredients.

Beyond the resort, explore nearby cultural landmarks, take a boat ride at sunrise, or enjoy guided heritage walks through the historic streets of Varanasi. Each experience is designed to connect you with the beauty and spirit of the region.

This summer, treat yourself to more than just a vacation. Treat yourself to a journey of discovery, relaxation, and indulgence. We look forward to welcoming you.`,
  },
  {
    id: 2,
    title: "The Art of Fine Dining: A Look Inside Our Kitchen",
    excerpt:
      "Meet our world-class chefs and learn the secrets behind our most popular signature dishes...",
    image:
      "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764978/DSC_0361_uqgmnq.jpg",
    category: "Dining",
    date: "June 12, 2026",
    author: "Chef Mike",
    content: `Fine dining is more than just a meal; it is a carefully choreographed experience that engages all the senses. At our restaurant, every dish tells a story of tradition, innovation, and passion.

Our executive chef, Mike, brings years of culinary expertise from some of the finest kitchens around the world. Under his leadership, the team creates a menu that celebrates the rich flavors of India while incorporating contemporary techniques and global influences.

We believe that great food begins with great ingredients. That is why we partner with local farmers and artisans to source the freshest produce, dairy, and spices. Each morning, the kitchen comes alive with the aroma of freshly baked bread, simmering curries, and delicate desserts.

Among the most beloved dishes are our slow-cooked lamb shank, tandoori prawns, and the signature saffron-infused biryani. Every plate is a work of art, presented with elegance and attention to detail.

Join us for an evening of exceptional flavors, impeccable service, and a warm ambiance that makes every dinner feel like a celebration.`,
  },
  {
    id: 3,
    title: "Wellness & Spa: Finding Your Inner Peace",
    excerpt:
      "Experience a journey of relaxation with our new holistic spa treatments designed for mind and body...",
    image:
      "https://res.cloudinary.com/drmpv5vne/image/upload/v1783764959/20250502_154228_rw2f0y.jpg",
    category: "Wellness",
    date: "June 10, 2026",
    author: "Sarah J.",
    content: `In the heart of our resort lies a sanctuary of calm and rejuvenation. Our wellness and spa center is designed to help you disconnect from the noise of daily life and reconnect with your inner self.

We offer a wide range of treatments inspired by ancient healing traditions and modern therapies. From Ayurvedic massages to aromatherapy facials, each session is personalized to meet your individual needs and preferences.

Our trained therapists use only the finest natural oils and organic products, ensuring that every treatment is as gentle on the skin as it is effective. The soothing music, soft lighting, and fragrant atmosphere create the perfect setting for deep relaxation.

Yoga and meditation sessions are also available for guests who wish to enhance their physical and mental well-being. Whether you are a beginner or an experienced practitioner, our instructors guide you through practices that restore balance and clarity.

Take a step back, breathe deeply, and allow yourself to be pampered. Your journey to wellness begins here.`,
  },
];

export const categories = Array.from(new Set(posts.map((p) => p.category)));
