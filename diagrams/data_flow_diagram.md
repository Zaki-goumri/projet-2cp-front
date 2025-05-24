```mermaid
flowchart LR
    %% External Systems
    Backend["Backend API"]
    OAuth["OAuth Providers"]
    
    %% Client-Side Data Stores
    ZustandStore["Global State\n(Zustand)"]
    ReactQuery["API Cache\n(React Query)"]
    LocalStorage["Local Storage"]
    
    %% Data Flow Areas
    AuthData["Authentication Data"]
    UserData["User Profile Data"]
    OpportunityData["Opportunities Data"]
    TeamData["Teams Data"]
    ChatData["Chat Data"]
    NotificationData["Notifications Data"]
    ApplicationData["Applications Data"]
    CompanyData["Company Data"]
    PostData["Post Data"]
    QAData["QA Data"]
    ContactData["Contact Data"]
    DashboardData["Dashboard Data"]
    
    %% UI Components (simplified)
    UI["User Interface Components"]
    
    %% Data Flow Connections
    %% Authentication Flows
    UI -->|"Login/Signup\nCredentials"| Backend
    UI -->|"OAuth Request"| OAuth
    OAuth -->|"Auth Token"| UI
    Backend -->|"JWT Token"| UI
    UI -->|"Store Auth\nToken"| LocalStorage
    UI -->|"Update Auth\nState"| ZustandStore
    LocalStorage -->|"Load Saved\nAuth Token"| ZustandStore
    
    %% User Data Flows
    UI -->|"Profile\nUpdates"| Backend
    Backend -->|"User Data"| ReactQuery
    ReactQuery -->|"Cached\nUser Data"| UI
    ReactQuery -->|"User State"| ZustandStore
    
    %% Opportunity Data Flows
    UI -->|"Search/Filter\nRequests"| Backend
    Backend -->|"Opportunity\nListing"| ReactQuery
    ReactQuery -->|"Cached\nOpportunities"| UI
    
    %% Application Flows
    UI -->|"Submit\nApplication"| Backend
    Backend -->|"Application\nStatus"| ReactQuery
    ReactQuery -->|"Cached\nApplications"| UI
    
    %% Team Flows
    UI -->|"Team\nActions"| Backend
    Backend -->|"Team\nData"| ReactQuery
    ReactQuery -->|"Cached\nTeam Data"| UI
    
    %% Chat Flows
    UI -->|"Send\nMessage"| Backend
    Backend -->|"Message\nHistory"| ReactQuery
    ReactQuery -->|"Cached\nMessages"| UI
    Backend -->|"Real-time\nMessages"| UI
    
    %% Notification Flows
    Backend -->|"Push\nNotifications"| UI
    Backend -->|"Notification\nData"| ReactQuery
    ReactQuery -->|"Cached\nNotifications"| UI
    
    %% Company Flows
    UI -->|"Company\nActions"| Backend
    Backend -->|"Company\nData"| ReactQuery
    ReactQuery -->|"Cached\nCompany Data"| UI
    
    %% Post Flows
    UI -->|"Post\nActions"| Backend
    Backend -->|"Post\nData"| ReactQuery
    ReactQuery -->|"Cached\nPost Data"| UI
    
    %% QA Flows
    UI -->|"QA\nActions"| Backend
    Backend -->|"QA\nData"| ReactQuery
    ReactQuery -->|"Cached\nQA Data"| UI
    
    %% Contact Flows
    UI -->|"Contact\nForm"| Backend
    Backend -->|"Contact\nStatus"| ReactQuery
    ReactQuery -->|"Cached\nContact Data"| UI
    
    %% Dashboard Flows
    UI -->|"Dashboard\nData Request"| Backend
    Backend -->|"Dashboard\nMetrics"| ReactQuery
    ReactQuery -->|"Cached\nDashboard Data"| UI
    
    %% Global State Management
    ZustandStore -->|"Auth State"| UI
    ZustandStore -->|"User State"| UI
    ZustandStore -->|"App Settings"| UI
    
    %% Styling
    classDef external fill:#f87171,stroke:#ef4444,color:white;
    classDef store fill:#10b981,stroke:#059669,color:white;
    classDef data fill:#60a5fa,stroke:#3b82f6,color:white;
    classDef ui fill:#8b5cf6,stroke:#7c3aed,color:white;
    
    class Backend,OAuth external;
    class ZustandStore,ReactQuery,LocalStorage store;
    class AuthData,UserData,OpportunityData,TeamData,ChatData,NotificationData,ApplicationData,CompanyData,PostData,QAData,ContactData,DashboardData data;
    class UI ui;
```

## Data Flow Diagram - Explanation

This diagram illustrates how data flows through your application, showing the interactions between UI components, state management, and backend services.

### Key Components

#### External Systems
- **Backend API**: Your server-side application handling data persistence and business logic
- **OAuth Providers**: External authentication services (Google, LinkedIn)

#### Client-Side Data Stores
- **Zustand Store**: Global state management for app-wide state
- **React Query Cache**: Client-side cache for API responses
- **Local Storage**: Browser storage for persisting data between sessions

#### Data Categories
- **Authentication Data**: User credentials, JWT tokens
- **User Profile Data**: Personal information, settings
- **Opportunities Data**: Available opportunities, details
- **Teams Data**: Team information, memberships
- **Chat Data**: Conversation history, messages
- **Notifications Data**: System notifications
- **Application Data**: Submitted applications, status
- **Company Data**: Company profiles and information
- **Post Data**: Post content and metadata
- **QA Data**: Questions and answers
- **Contact Data**: Contact form submissions
- **Dashboard Data**: Analytics and metrics

### Main Data Flows

#### Authentication Flow
1. User submits credentials via UI
2. Credentials sent to Backend or OAuth providers
3. Authentication token returned
4. Token stored in Local Storage and Zustand store
5. Authenticated state maintained across app

#### Data Retrieval Flow
1. UI components request data
2. React Query checks cache for data
3. If not available/stale, request sent to Backend
4. Backend returns data
5. Data cached in React Query
6. Data displayed in UI components

#### Data Modification Flow
1. User makes changes via UI
2. Changes sent to Backend
3. Backend processes and stores changes
4. Updated data returned
5. Cache and state updated
6. UI reflects changes

### Implementation Notes

This diagram helps developers understand:
- How data moves through the application
- Where data is stored
- How different parts of the application interact
- The role of state management and caching

The architecture follows modern React best practices, using Zustand for global state and React Query for server state management. 