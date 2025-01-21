# Glance Care Test

## Overview
This is a React application built using Typescript, Tailwind and Vite, designed for the purpose of testing my skills for the sr. software developer.


## Approach

In developing the Glance Care Test application, several key design decisions and trade-offs were considered to ensure scalability, maintainability, and efficiency.

### Key Design Decisions
- **Technology Stack**: I chose TypeScript for type safety and Vite for fast builds. Tailwind CSS was selected for its utility-first approach, facilitating rapid UI development.
- **Component Architecture**: Adopted a modular component structure to promote reusability and ease of testing.
- **State Management**: This project was relatively simple, I chose React's built-in state management for simplicity, otherwise I'd use Zustand, but for ease of use and avoiding additional complexity from external libraries, I didn't go that way.
- **API data**: I've noticed that the data coming from the API is duplicated (while if its intential or not) I decided to remove the duplication, even though its a backend (or api thing) its just not right to view duplicated data to the user!
- **Single Source of truth**: I tried to maintain a single source of truth (data) and derived filtered views (movies) for search and filter functionality.

### Trade-offs:
- **State Management**: While using React's build in state hook (useState) is easy, it can lead to a problematic prop drilling and double logic and I would've used something else
- **Dark mode**: the decision I took to limit colors and make it a dark themed dashboard c
- **Error Handling**: I limited error feedback to developers only. but I could add user-friendly messages for better UX when the API fails.



## Prerequisites
- Node.js 
- npm

## Getting Started

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```

### Build
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Project Structure
```
src/
├── assets/
├── components/
├── pages/
├── App.jsx
└── main.jsx
```

## Tech Stack
- React
- Vite
- JavaScript/TypeScript
- tailwind CSS

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License
This project is licensed under the MIT License.