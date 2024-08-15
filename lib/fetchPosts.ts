export async function fetchPosts() {
    const response = await fetch('http://localhost:3000/api/users', {next: {revalidate: 5}});
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  }