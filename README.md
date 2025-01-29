**Idea Description:**
The goal is to create an innovative platform that helps students, particularly those in ESI who struggle to secure internships during their fourth year, gain hands-on real-life experience. The platform will connect companies looking to recruit with students seeking internships or solutions to specific challenges faced by the companies. The objective is to simplify and accelerate the recruitment process while providing candidates an intuitive way to apply for opportunities that match their skills.

**Main Features:**
- Account creation for both students and companies.
- Companies can post internship opportunities or specific challenges they need help with.
- Users have the option to form teams, invite others to join, and apply collectively.
- All team members must agree to proceed with the application when applying as a team.
- Easy navigation allows students to quickly view and apply for available opportunities.
- An interactive dashboard for companies to effectively manage and review applications.
- Automatic notifications sent to accepted students via the company dashboard.
- Personalized application tracking for users to monitor the status of their applications.
- Focus on a broader range of fields and categories to accommodate various student interests.

**Future Features:**
- Integration of an instant messaging system to facilitate direct communication between candidates and recruiters.
- Mandatory verification of company accounts to ensure the authenticity of job offers.
- Students can verify their accounts using their school ID cards.
- Prioritization of postings from verified companies to enhance the reliability of job offers.

**User Roles and Permissions:**
- **Companies:** Can post problems or internships, as well as approve or reject applications.
- **App Administrator:** Can view the details of companies and users, and approve or verify accounts as necessary.
- **Students:** Can browse internship opportunities, part-time jobs, or challenges posted by companies and apply quickly.

**Tech Stack:**
- **Frontend:** React.js for a responsive and user-friendly interface.
- **TypeScript:**for a scalable and maintainable codebase.
- **Styling:** Tailwind CSS for efficient and modern styling.
- **State Management:** Zustand for efficient and modern state management.
- **Authentication:** JWT (JSON Web Tokens) for secure user authentication.
- **Version Control:** Git and GitHub for source code management and collaboration.
- **Testing:** Jest and React Testing Library for unit and integration testing.
- **API Documentation:** Postman for comprehensive API documentation.
- **Linting and Formatting:** ESLint and Prettier for code quality and consistency.

**Structure of Project:**

    root/
    ├── node_modules/
    ├── public/
    ├── src/
    │   ├── modules/
    │   ├── features/
    │   │   ├── applications/
    │   │   │   ├── components/
    │   │   │   ├── hooks/
    │   │   │   ├── services/
    │   │   │   └── tests/
    │   │   ├── auth/
    │   │   │   ├── components/
    │   │   │   ├── hooks/
    │   │   │   ├── services/
    │   │   │   └── tests/
    │   │   └── dashboards/
    │   │       ├── home/
    │   │       │   ├── components/
    │   │       │   ├── hooks/
    │   │       │   ├── services/
    │   │       │   └── tests/
    │   │       ├── internships/
    │   │       │   ├── components/
    │   │       │   ├── hooks/
    │   │       │   ├── services/
    │   │       │   └── tests/
    │   │       └── profileManagement/
    │   │           ├── components/
    │   │           ├── hooks/
    │   │           ├── services/
    │   │           └── tests/
    │   └── shared/
    │       ├── components/
    │       ├── hooks/
    │       ├── layout/
    │       ├── store/
    │       └── utils/
    ├── App.tsx
    ├── index.css
    ├── main.tsx
    ├── .gitignore
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── package-lock.json
    ├── README.md
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
