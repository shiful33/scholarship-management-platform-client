🎓 Scholarship Management PlatformA comprehensive MERN Stack web application designed to streamline the scholarship application process. This platform provides a seamless interface for students to apply for scholarships, moderators to review them, and admins to manage the entire ecosystem.
🔗 Live LinksLive Site: [Your Vercel Live Link Here]Server 
API: [Your Vercel Server Link Here]🚀 
FeaturesGeneral FeaturesRole-Based Access Control (RBAC): 
Distinct dashboards and permissions for Admins, Moderators, and Students.Secure Authentication: Powered by Firebase and reinforced with JWT (JSON Web Tokens) for protected API routes.Continuous Review Slider: A dynamic, auto-scrolling student review section on the homepage using Swiper.js.Dynamic Scholarship Discovery: Search and filter scholarships based on university, category, or degree.User-Specific DashboardsAdmin: Manage all users, assign roles (Moderator/Admin), and oversee all scholarship applications and reviews.Moderator: Add/Edit scholarships, review pending applications, and manage student feedback.Student: Track application status, manage personal profiles, and submit/edit scholarship reviews.🛠️ Technology StackLayerTechnology UsedFrontendReact.js (Vite), Tailwind CSS, Daisy UIBackendNode.js, Express.jsDatabaseMongoDBAuthFirebase Auth, JWTState ManagementTanStack Query (React Query v5)DeploymentVercel📦 Key NPM PackagesFrontendaxios: For secure API communication with interceptors.@tanstack/react-query: Efficient data fetching and caching.react-hook-form: Optimized form handling and validation.swiper: Responsive and smooth sliders.framer-motion: Professional UI animations.sweetalert2 & react-toastify: Interactive alerts and notifications.Backendjsonwebtoken: Secure token generation for authorization.mongodb: Database driver for Node.js.cors & dotenv: Security and environment configuration.🔑 Test CredentialsAccount Type Email Password 
Admin: shiful33@gmail.com Shiful33@123 
Moderator: moderator@gmail.com Moderator@123 
Student: student@gmail.com Student@123 
🛠️ Installation & SetupClone the repositories:Bashgit clone: 
https://github.com/shiful33/scholarship-management-platform-client.git
git clone:
https://github.com/shiful33/scholarship-management-platform-server.git
Install dependencies:Bashnpm install
Environment Variables:Create a .env file in the server directory and add:Code snippetDB_USER=your_db_user
DB_PASS=your_db_password
ACCESS_TOKEN_SECRET=your_jwt_secret
Run the project:Bashnpm run dev
📡 API Endpoints (Quick Glance)GET /latest-reviews: Fetches all reviews for the homepage slider.POST /jwt: Generates a token for the logged-in user.GET /user/role/:email: Returns the specific role of the user to secure the UI.PATCH /reviews/:id: Securely updates a student's review.Developed with ❤️ by Shiful Islam.For any queries, feel free to reach out via GitHub.Would you like me to help you create a specific "How it Works" section for each user role to include in this README?


🛠️ How It Works (User Workflows)
1. Student Journey
Discovery: Students can browse or search for scholarships on the homepage.

Application: Once a scholarship is selected, the student fills out a detailed application form (handled by react-hook-form).

Tracking: From their personal dashboard, students can see the status of their application (Pending, Processing, Completed, or Rejected).

Feedback: After applying, students can leave reviews, which they can later edit or delete.

2. Moderator Workflow
Scholarship Management: Moderators can add new scholarship opportunities or update existing ones.

Review Process: They have access to a list of all student applications. They can change the status of an application or provide feedback to the student.

Review Moderation: They can monitor student reviews to ensure the community remains helpful and professional.

3. Admin Control Panel
User Management: Admins have the highest level of authority. They can see all users and change their roles (e.g., promoting a Student to a Moderator).

System Oversight: Admins can delete any scholarship or review if it violates platform policies.

Security: All sensitive actions are protected by verifyAdmin and verifyToken middleware on the backend to prevent unauthorized access.

🛡️ Security Implementation
JWT Authentication: Every time a user logs in, a JSON Web Token is stored in localStorage. This token is sent in the headers of every request via axiosSecure interceptors.

Private Routes: React Router is used to protect dashboard routes. If a user is not logged in or doesn't have the required role, they are redirected to the login page.

Backend Verification: Even if someone bypasses the frontend, the backend verifies the JWT and the user's role before performing any database operations.

📈 Future Improvements
Payment Integration: Implementing Stripe or SSLCommerz for scholarship application fees.

Export to PDF: Allowing students to download their application details as a PDF.

Email Notifications: Automatic emails to students when their application status changes.


