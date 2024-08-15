export async function fetchUsers() {
    const response = await fetch('http://localhost:3000/api/users');
  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  
    const data = await response.json();
    return data;
  }