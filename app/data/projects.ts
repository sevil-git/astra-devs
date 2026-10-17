export const projects = [
  {
    name: "Zeltic",
    type: "E-commerce experience",
    headline: "A fresh perspective on everyday hydration.",
    description:
      "A vivid digital storefront for an electrolyte drink brand. Product storytelling, flavour discovery, and shopping come together in one expressive experience.",
    secret: "A fresh take on hydration. Built to make a splash.",
    tags: "E-commerce · Product storytelling · Interactive website",
    image: "/images/projects/zeltic.png",
    detailImage: "/images/projects/zeltic-detail.png",
    detailCaption:
      "Flavour, colour, and product storytelling in one visual language.",
    theme: "zeltic",
    url: "https://zeltic-turbo-zeltic-frontend-nine.vercel.app/",
    domain: "zeltic-turbo-zeltic-frontend-nine.vercel.app",
    features: [
      {
        title: "Brand in motion",
        text: "An expressive opening introduces the brand through moving imagery and oversized typography.",
      },
      {
        title: "Flavour-led discovery",
        text: "Distinctive colours and product stories give each drink its own place in the experience.",
      },
      {
        title: "A connected journey",
        text: "The brand story, ingredients, and product range connect through a consistent visual system.",
      },
    ],
  },
  {
    name: "Maestera",
    type: "Music education platform",
    headline: "A better way to find your rhythm.",
    description:
      "A home for finding the right music teacher. Explore instruments, discover teachers, and find online or in-person lessons around your goals and location.",
    secret: "Helping the next great musician find their first teacher.",
    tags: "Web platform · Teacher discovery · Music education",
    image: "/images/projects/maestera.png",
    detailImage: "/images/projects/maestera-detail.png",
    detailCaption:
      "Teacher discovery puts the people behind the music front and centre.",
    theme: "maestera",
    url: "https://maestera.com/",
    domain: "maestera.com",
    features: [
      {
        title: "Start with an instrument",
        text: "Search by instrument and location, or explore online lessons, to find a relevant starting point.",
      },
      {
        title: "Discover the people",
        text: "Teacher profiles connect musical interests with the people who can help develop them.",
      },
      {
        title: "Make learning possible",
        text: "Online and in-person lessons, group classes, and teacher onboarding support different ways to learn.",
      },
    ],
  },
  {
    name: "Nimbus",
    type: "Interactive 3D website",
    headline: "A product you can almost feel.",
    description:
      "An immersive product experience for Nimbus keyboards. Explore the Vapor75 in 3D, try switch options, and change keycap styles in an interactive playground.",
    secret: "A keyboard you can almost feel through the screen.",
    tags: "3D product experience · Interactive customisation · Creative development",
    image: "/images/projects/nimbus.png",
    detailImage: "/images/projects/nimbus-detail.png",
    detailCaption:
      "The Vapor75 becomes the centre of an immersive product experience.",
    theme: "nimbus",
    url: "https://nimbus-keyboard.vercel.app/",
    domain: "nimbus-keyboard.vercel.app",
    features: [
      {
        title: "Explore in 3D",
        text: "A dimensional product presentation brings the keyboard’s form, materials, and details into focus.",
      },
      {
        title: "Craft your click",
        text: "A switch playground makes different switch options part of the product story.",
      },
      {
        title: "Make it your own",
        text: "Interactive keycap styles let visitors explore different looks for the same keyboard.",
      },
    ],
  },
] as const;

export type Project = (typeof projects)[number];
