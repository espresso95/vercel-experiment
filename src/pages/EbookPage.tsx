import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  Close as CloseIcon,
  MenuBook as BookIcon,
  Fullscreen,
  FullscreenExit,
} from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import Navbar from '../components/Navbar';
import 'highlight.js/styles/github.css';

interface Ebook {
  id: string;
  title: string;
  author: string;
  description: string;
  content: string;
  category: string;
  publishDate: string;
  readingTime: number;
}

interface EbookPageProps {
  onNavigate?: (page: string) => void;
}

const EbookPage: React.FC<EbookPageProps> = ({ onNavigate }) => {
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [filteredEbooks, setFilteredEbooks] = useState<Ebook[]>([]);
  const [currentEbook, setCurrentEbook] = useState<Ebook | null>(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Sample ebooks data - in a real app, this would come from an API or file system
  useEffect(() => {
    const loadEbooks = async () => {
      try {
        setLoading(true);

        // Simulate API call with sample data
        const sampleEbooks: Ebook[] = [
          {
            id: '1',
            title: 'Getting Started with React',
            author: 'Tech Writer',
            description: 'A comprehensive guide to learning React from scratch',
            content: `# Getting Started with React

## Introduction

React is a popular JavaScript library for building user interfaces, particularly web applications. Created by Facebook, React allows developers to create reusable UI components.

## What is React?

React is:
- **Component-based**: Build encapsulated components that manage their own state
- **Declarative**: React makes it painless to create interactive UIs
- **Learn Once, Write Anywhere**: We don't make assumptions about the rest of your technology stack

## Setting Up React

To create a new React app, you can use Create React App:

\`\`\`bash
npx create-react-app my-app
cd my-app
npm start
\`\`\`

## Your First Component

Here's a simple React component:

\`\`\`jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}

export default Welcome;
\`\`\`

## JSX

JSX is a syntax extension for JavaScript. It allows you to write HTML-like code in your JavaScript files:

\`\`\`jsx
const element = <h1>Hello, world!</h1>;
\`\`\`

## State and Props

React components can have state and receive props:

\`\`\`jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
\`\`\`

## Conclusion

React is a powerful tool for building modern web applications. This guide covers the basics to get you started on your React journey.

Happy coding!`,
            category: 'Programming',
            publishDate: '2024-01-15',
            readingTime: 15,
          },
          {
            id: '2',
            title: 'TypeScript Fundamentals',
            author: 'Code Master',
            description:
              'Learn the basics of TypeScript and how it enhances JavaScript',
            content: `# TypeScript Fundamentals

## What is TypeScript?

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale.

## Why TypeScript?

- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Self-documenting Code**: Types serve as documentation
- **Easier Refactoring**: Confident code changes

## Basic Types

TypeScript provides several basic types:

\`\`\`typescript
// Primitives
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";

// Arrays
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];

// Tuple
let x: [string, number];
x = ["hello", 10];
\`\`\`

## Interfaces

Interfaces define the shape of an object:

\`\`\`typescript
interface User {
  name: string;
  age: number;
  email?: string; // Optional property
}

function greetUser(user: User) {
  console.log(\`Hello, \${user.name}!\`);
}
\`\`\`

## Classes

TypeScript supports classes with access modifiers:

\`\`\`typescript
class Animal {
  private name: string;
  
  constructor(name: string) {
    this.name = name;
  }
  
  public move(distance: number): void {
    console.log(\`\${this.name} moved \${distance} meters.\`);
  }
}
\`\`\`

## Generics

Generics provide a way to create reusable components:

\`\`\`typescript
function identity<T>(arg: T): T {
  return arg;
}

let output = identity<string>("myString");
\`\`\`

## Conclusion

TypeScript brings type safety and enhanced development experience to JavaScript. Start small and gradually adopt more TypeScript features in your projects.`,
            category: 'Programming',
            publishDate: '2024-02-01',
            readingTime: 20,
          },
          {
            id: '3',
            title: 'Web Development Best Practices',
            author: 'Dev Expert',
            description: 'Essential practices for modern web development',
            content: `# Web Development Best Practices

## Introduction

Modern web development requires following best practices to create maintainable, performant, and accessible applications.

## Performance Optimization

### 1. Minimize HTTP Requests
- Combine files when possible
- Use CSS sprites for images
- Minimize the number of external resources

### 2. Optimize Images
- Use appropriate image formats (WebP, AVIF)
- Implement lazy loading
- Provide responsive images with srcset

\`\`\`html
<img 
  src="image-800w.jpg"
  srcset="image-400w.jpg 400w, image-800w.jpg 800w"
  sizes="(max-width: 600px) 400px, 800px"
  alt="Description"
  loading="lazy"
/>
\`\`\`

### 3. Code Splitting
Split your JavaScript bundles to load only what's needed:

\`\`\`javascript
// Dynamic imports
const LazyComponent = React.lazy(() => import('./LazyComponent'));
\`\`\`

## Security Best Practices

### 1. Validate Input
Always validate and sanitize user input:

\`\`\`javascript
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
\`\`\`

### 2. Use HTTPS
Always use HTTPS in production to encrypt data in transit.

### 3. Content Security Policy
Implement CSP headers to prevent XSS attacks:

\`\`\`
Content-Security-Policy: default-src 'self'; script-src 'self'
\`\`\`

## Accessibility

### 1. Semantic HTML
Use proper HTML elements:

\`\`\`html
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>
\`\`\`

### 2. ARIA Labels
Provide ARIA labels for screen readers:

\`\`\`html
<button aria-label="Close dialog">×</button>
\`\`\`

### 3. Keyboard Navigation
Ensure all interactive elements are keyboard accessible.

## Code Quality

### 1. Use Linting Tools
- ESLint for JavaScript/TypeScript
- Prettier for code formatting
- Stylelint for CSS

### 2. Write Tests
\`\`\`javascript
// Jest example
test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});
\`\`\`

### 3. Version Control
Use Git with meaningful commit messages:
\`\`\`
feat: add user authentication
fix: resolve memory leak in component
docs: update API documentation
\`\`\`

## Conclusion

Following these best practices will help you build better web applications that are fast, secure, accessible, and maintainable.

Remember: the best practice is the one that works for your team and project constraints.`,
            category: 'Web Development',
            publishDate: '2024-03-01',
            readingTime: 25,
          },
        ];

        setEbooks(sampleEbooks);
        setFilteredEbooks(sampleEbooks);
        setError(null);
      } catch (err) {
        setError('Failed to load ebooks. Please try again later.');
        console.error('Error loading ebooks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadEbooks();
  }, []);

  // Filter ebooks based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEbooks(ebooks);
    } else {
      const filtered = ebooks.filter(
        ebook =>
          ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ebook.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ebook.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          ebook.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEbooks(filtered);
    }
  }, [searchQuery, ebooks]);

  const handleOpenReader = (ebook: Ebook) => {
    setCurrentEbook(ebook);
    setIsReaderOpen(true);
  };

  const handleCloseReader = () => {
    setIsReaderOpen(false);
    setCurrentEbook(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const formatReadingTime = (minutes: number): string => {
    return `${minutes} min read`;
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <>
        <Navbar onNavigate={onNavigate} />
        <Container maxWidth="lg" sx={{ mt: 4, textAlign: 'center' }}>
          <CircularProgress size={60} />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading ebooks...
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Navbar onNavigate={onNavigate} />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Ebook Library
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Discover and read our collection of technical ebooks
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search ebooks..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Ebook Grid */}
        <Grid container spacing={3}>
          {filteredEbooks.map(ebook => (
            <Grid item xs={12} md={6} lg={4} key={ebook.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
                onClick={() => handleOpenReader(ebook)}
              >
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <BookIcon color="primary" sx={{ mr: 1, fontSize: 32 }} />
                    <Typography variant="h5" component="h2">
                      {ebook.title}
                    </Typography>
                  </Box>

                  <Typography variant="subtitle1" color="primary" gutterBottom>
                    by {ebook.author}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.6 }}
                  >
                    {ebook.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Chip
                      label={ebook.category}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {formatReadingTime(ebook.readingTime)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(ebook.publishDate)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredEbooks.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" color="text.secondary">
              No ebooks found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Check back later for new content'}
            </Typography>
          </Box>
        )}

        {/* Ebook Reader Dialog */}
        <Dialog
          open={isReaderOpen}
          onClose={handleCloseReader}
          maxWidth={isFullscreen ? false : 'md'}
          fullWidth
          fullScreen={isFullscreen}
          PaperProps={{
            sx: {
              ...(isFullscreen && {
                margin: 0,
                maxHeight: '100vh',
                height: '100vh',
              }),
            },
          }}
        >
          <DialogTitle
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Box>
              <Typography variant="h6" component="div">
                {currentEbook?.title}
              </Typography>
              <Typography variant="subtitle2" color="text.secondary">
                by {currentEbook?.author}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={toggleFullscreen} size="large">
                {isFullscreen ? <FullscreenExit /> : <Fullscreen />}
              </IconButton>
              <IconButton onClick={handleCloseReader} size="large">
                <CloseIcon />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent
            sx={{
              p: 0,
              height: isFullscreen ? 'calc(100vh - 64px)' : '70vh',
              overflow: 'auto',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                '& h1, & h2, & h3, & h4, & h5, & h6': {
                  mt: 3,
                  mb: 2,
                },
                '& h1': {
                  fontSize: '2rem',
                  fontWeight: 600,
                },
                '& h2': {
                  fontSize: '1.5rem',
                  fontWeight: 600,
                },
                '& h3': {
                  fontSize: '1.25rem',
                  fontWeight: 600,
                },
                '& p': {
                  mb: 2,
                  lineHeight: 1.7,
                },
                '& pre': {
                  backgroundColor: '#f5f5f5',
                  padding: '16px',
                  borderRadius: '8px',
                  overflow: 'auto',
                  mb: 2,
                },
                '& code': {
                  backgroundColor: '#f5f5f5',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  fontSize: '0.875rem',
                },
                '& pre code': {
                  backgroundColor: 'transparent',
                  padding: 0,
                },
                '& ul, & ol': {
                  mb: 2,
                  pl: 3,
                },
                '& li': {
                  mb: 0.5,
                },
                '& blockquote': {
                  borderLeft: '4px solid #e0e0e0',
                  pl: 2,
                  py: 1,
                  my: 2,
                  fontStyle: 'italic',
                  color: 'text.secondary',
                },
              }}
            >
              {currentEbook && (
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeHighlight]}
                >
                  {currentEbook.content}
                </ReactMarkdown>
              )}
            </Paper>
          </DialogContent>
        </Dialog>
      </Container>
    </>
  );
};

export default EbookPage;
