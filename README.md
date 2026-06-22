## Architecture

``
public/                     # Static assets (images, videos)
├── about_assets
├── gallery_assets
├── home_assets
├── projects_assets
src/
├── components/             # Reusable React components
│   ├── HomeBackground/
│   ├── LenticularPlane/
│   ├── ProjectCard/
│   ├── RadarChart/
├── pages/
│   ├── About/
│   ├── Gallery/
│   ├── Home/
│   ├── NotFound/
│   ├── ProjectPage/
│   ├── Projects/
├── data/                   # JavaScript files containing project data
├── hooks/                  # Custom React hooks
│   └── useLocalStorage.js
├── layouts/                # Сommon page structure
    ├── MainLayout/
├── App.css                 # Main stylesheet
├── App.jsx                 # Root application component
└── main.jsx                # Application entry point
```

Page routing is implemented using React Router.

## Component Structure

Main components:

- **About** — displays information about the developer.
- **Projects** — displays a list of completed projects.
- **ProjectCard** — represents an individual project card.
- **ProjectPage** — displays detailed information about a selected project.
- **Gallery** — displays a gallery of images and videos.
- **HomeBackground** — provides the parallax background effect for the home page.

## Technologies Used

- React
- React Router
- JavaScript
- HTML5
- CSS Modules
- Vite
- View Transitions API
- GraphJS
- Three.js
- Color Thief API
- Git
- GitHub

## Environment Requirements

Before running the project, make sure the following are installed:

- Node.js 18 or later
- npm or Yarn
- Git

## Installation

Clone the repository:

```bash
git clone https://github.com/katedavydenko/Portfolio.git
```

Navigate to the project directory:

```bash
cd Portfolio
```

Install dependencies:

```bash
npm install
```

## Running the Project

Start the development server:

```bash
npm run dev
```

After starting the server, the application will be available at:

```text
http://localhost:5173
```

## Building the Project

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```