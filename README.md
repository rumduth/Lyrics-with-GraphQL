# GraphQL Lyrics App

A full-stack web application for managing songs and lyrics built with GraphQL, React, and MongoDB. Users can create songs, add lyrics to songs, like lyrics, and manage their music collection.

## Features

- 📝 **Create Songs**: Add new songs to your collection
- 🎵 **Add Lyrics**: Add multiple lyrics to any song
- 👍 **Like System**: Like your favorite lyrics with real-time updates
- 🗑️ **Delete Songs**: Remove songs from your collection
- 🔍 **Browse Songs**: View all songs and their details
- ⚡ **Real-time Updates**: Automatic UI updates with Apollo Client caching

## Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **GraphQL** - Query language and API
- **MongoDB** - Database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

### Frontend

- **React 19** - UI library
- **Apollo Client** - GraphQL client with caching
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Material Icons** - Icon library

## Project Structure

```
lyrics/
├── client/client/          # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── queries/        # GraphQL queries and mutations
│   │   └── main.jsx        # App entry point
│   └── package.json
├── server/                 # GraphQL backend
│   ├── models/            # Mongoose models
│   ├── schema/            # GraphQL schema definitions
│   └── server.js          # Express server setup
├── index.js               # Server entry point
└── package.json
```

## Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v16 or higher)
- **MongoDB** (running locally on port 27017)
- **npm** or **yarn**

## Installation & Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd lyrics
```

### 2. Install server dependencies

```bash
npm install
```

### 3. Install client dependencies

```bash
cd client/client
npm install
cd ../..
```

### 4. Start MongoDB

Make sure MongoDB is running on your local machine:

```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# Or run directly
mongod
```

## Running the Application

### 1. Start the GraphQL server

```bash
node index.js
```

The server will start on `http://localhost:4000`

### 2. Start the React client (in a new terminal)

```bash
cd client/client
npm run dev
```

The client will start on `http://localhost:5173` (or another available port)

### 3. Access the application

- **Frontend**: Open `http://localhost:5173` in your browser
- **GraphQL Playground**: Visit `http://localhost:4000/graphql-interface` to explore the API

## GraphQL API

### Queries

- `songs` - Get all songs
- `song(id: ID!)` - Get a specific song with its lyrics

### Mutations

- `addSong(title: String!)` - Create a new song
- `deleteSong(id: ID!)` - Delete a song
- `addLyricToSong(songId: ID!, content: String!)` - Add a lyric to a song
- `likeLyric(id: ID!)` - Like a lyric (increments like count)

### Example GraphQL Queries

**Get all songs:**

```graphql
query {
  songs {
    id
    title
  }
}
```

**Get a song with lyrics:**

```graphql
query GetSong($id: ID!) {
  song(id: $id) {
    id
    title
    lyrics {
      id
      content
      likes
    }
  }
}
```

**Create a new song:**

```graphql
mutation {
  addSong(title: "My New Song") {
    id
    title
  }
}
```

## Application Architecture

### GraphQL Schema

The application uses a GraphQL schema with two main types:

- **Song**: Contains id, title, and associated lyrics
- **Lyric**: Contains id, content, likes count, and belongs to a song

### Apollo Client Caching

The frontend uses Apollo Client's intelligent caching system:

- **Automatic Updates**: Liking lyrics updates the UI automatically due to normalized caching
- **Manual Cache Updates**: Creating songs/lyrics requires explicit cache updates or query refetching
- **Optimistic UI**: Smooth user experience with immediate feedback

### Database Models

- **Song Model**: MongoDB collection for storing songs
- **Lyric Model**: MongoDB collection for storing lyrics with song references

## Development Notes

### Cache Management

- **Like operations** update automatically due to Apollo's normalized cache
- **Create operations** require `refetchQueries` to update the UI
- **Delete operations** need manual cache updates for optimal UX

### Component Structure

- `SongList` - Displays all songs with create/delete actions
- `SongDetail` - Shows individual song with lyrics
- `SongCreate` - Form for creating new songs
- `LyricCreate` - Form for adding lyrics to songs
- `LyricList` - Displays lyrics with like functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Troubleshooting

### Common Issues

**MongoDB Connection Error:**

- Ensure MongoDB is running on `mongodb://localhost:27017`
- Check if the database service is started

**GraphQL Errors:**

- Verify all GraphQL queries match the schema exactly (case-sensitive)
- Check the GraphQL playground at `/graphql-interface` for schema exploration

**Cache Issues:**

- If data doesn't update after mutations, check if `refetchQueries` is properly configured
- Clear browser cache if experiencing persistent issues

**Port Conflicts:**

- Server runs on port 4000, client on 5173 (or next available)
- Change ports in configuration files if needed
