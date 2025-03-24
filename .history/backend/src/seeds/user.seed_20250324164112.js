// seed/users.js
import { config } from "dotenv";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
config();

export const seedUsers = [
  // Female Users (25)
  {
    email: "emma.watson@example.com",
    fullName: "Emma Watson",
    password: "password123", // Hash this in your seeding script
    profilePicture: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    email: "sophia.martinez@example.com",
    fullName: "Sophia Martinez",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    email: "olivia.brown@example.com",
    fullName: "Olivia Brown",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    email: "isabella.davis@example.com",
    fullName: "Isabella Davis",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    email: "mia.johnson@example.com",
    fullName: "Mia Johnson",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    email: "amelia.wilson@example.com",
    fullName: "Amelia Wilson",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/6.jpg",
  },
  {
    email: "harper.moore@example.com",
    fullName: "Harper Moore",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    email: "evelyn.taylor@example.com",
    fullName: "Evelyn Taylor",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    email: "abigail.jackson@example.com",
    fullName: "Abigail Jackson",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    email: "emily.white@example.com",
    fullName: "Emily White",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/10.jpg",
  },
  {
    email: "elizabeth.harris@example.com",
    fullName: "Elizabeth Harris",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/11.jpg",
  },
  {
    email: "sofia.clark@example.com",
    fullName: "Sofia Clark",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/12.jpg",
  },
  {
    email: "avery.lewis@example.com",
    fullName: "Avery Lewis",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/13.jpg",
  },
  {
    email: "scarlett.walker@example.com",
    fullName: "Scarlett Walker",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/14.jpg",
  },
  {
    email: "victoria.allen@example.com",
    fullName: "Victoria Allen",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/15.jpg",
  },
  {
    email: "madison.young@example.com",
    fullName: "Madison Young",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/16.jpg",
  },
  {
    email: "luna.hernandez@example.com",
    fullName: "Luna Hernandez",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    email: "grace.king@example.com",
    fullName: "Grace King",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/18.jpg",
  },
  {
    email: "chloe.wright@example.com",
    fullName: "Chloe Wright",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    email: "penelope.lopez@example.com",
    fullName: "Penelope Lopez",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    email: "layla.hill@example.com",
    fullName: "Layla Hill",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/21.jpg",
  },
  {
    email: "riley.scott@example.com",
    fullName: "Riley Scott",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/22.jpg",
  },
  {
    email: "zoe.green@example.com",
    fullName: "Zoe Green",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/23.jpg",
  },
  {
    email: "nora.adams@example.com",
    fullName: "Nora Adams",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/24.jpg",
  },
  {
    email: "lily.baker@example.com",
    fullName: "Lily Baker",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/women/25.jpg",
  },

  // Male Users (25)
  {
    email: "liam.smith@example.com",
    fullName: "Liam Smith",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    email: "noah.johnson@example.com",
    fullName: "Noah Johnson",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    email: "william.brown@example.com",
    fullName: "William Brown",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/3.jpg",
  },
  {
    email: "james.davis@example.com",
    fullName: "James Davis",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    email: "oliver.miller@example.com",
    fullName: "Oliver Miller",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    email: "benjamin.wilson@example.com",
    fullName: "Benjamin Wilson",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/6.jpg",
  },
  {
    email: "elijah.moore@example.com",
    fullName: "Elijah Moore",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/7.jpg",
  },
  {
    email: "lucas.taylor@example.com",
    fullName: "Lucas Taylor",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    email: "mason.jackson@example.com",
    fullName: "Mason Jackson",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/9.jpg",
  },
  {
    email: "logan.white@example.com",
    fullName: "Logan White",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/10.jpg",
  },
  {
    email: "ethan.harris@example.com",
    fullName: "Ethan Harris",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/11.jpg",
  },
  {
    email: "jacob.clark@example.com",
    fullName: "Jacob Clark",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/12.jpg",
  },
  {
    email: "michael.lewis@example.com",
    fullName: "Michael Lewis",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/13.jpg",
  },
  {
    email: "alexander.walker@example.com",
    fullName: "Alexander Walker",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/14.jpg",
  },
  {
    email: "daniel.allen@example.com",
    fullName: "Daniel Allen",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/15.jpg",
  },
  {
    email: "henry.young@example.com",
    fullName: "Henry Young",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/16.jpg",
  },
  {
    email: "jackson.hernandez@example.com",
    fullName: "Jackson Hernandez",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    email: "sebastian.king@example.com",
    fullName: "Sebastian King",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/18.jpg",
  },
  {
    email: "aiden.wright@example.com",
    fullName: "Aiden Wright",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/19.jpg",
  },
  {
    email: "matthew.lopez@example.com",
    fullName: "Matthew Lopez",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/20.jpg",
  },
  {
    email: "samuel.hill@example.com",
    fullName: "Samuel Hill",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/21.jpg",
  },
  {
    email: "david.scott@example.com",
    fullName: "David Scott",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    email: "joseph.green@example.com",
    fullName: "Joseph Green",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/23.jpg",
  },
  {
    email: "carter.adams@example.com",
    fullName: "Carter Adams",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/24.jpg",
  },
  {
    email: "owen.baker@example.com",
    fullName: "Owen Baker",
    password: "password123",
    profilePicture: "https://randomuser.me/api/portraits/men/25.jpg",
  },
];
const seedDatabase = async () => {
  try {
    await connectDB();
    await User.deleteMany({});
    const hashedUsers = await Promise.all(
      seedUsers.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 10),
      }))
    );
    await User.insertMany(hashedUsers);
    console.log("Database seeded successfully");
  } catch (error) {
    console.error("Error seeding database", error);
  }
};
